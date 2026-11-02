import {
  type BufferGeometry,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  type IUniform,
  Mesh,
  OctahedronGeometry,
  PlaneGeometry,
  Quaternion,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

import type { NodeShape } from "./model";

/**
 * The node shapes (decision 135), each built once and normalised so that a
 * shape drawn at a node's radius covers the same area on screen as the sphere
 * it replaces: no family looks bigger than another.
 *
 * A shape turns with the camera, held at a fixed tilt against it, so a cube
 * always shows three faces and a coin its face, however the reader has
 * orbited. Its silhouette is therefore fixed, and measured here once: the
 * area it covers sets its scale, and how far it reaches from its centre on
 * screen sets how far out its status ring and label sit.
 */
export interface ShapeSpec {
  geometry: BufferGeometry;
  /** Held against the camera's orientation. */
  tilt: Quaternion;
  /** The silhouette's farthest point from the centre, in sphere radii. */
  reach: number;
  /** The farthest point from the centre in 3D, in sphere radii. */
  bound: number;
}

export const NODE_SHAPES: readonly NodeShape[] = [
  "sphere",
  "cube",
  "octahedron",
  "cylinder",
  "coin",
  "capsule",
];

export function buildShapes(): Record<NodeShape, ShapeSpec> {
  return {
    sphere: spec(new SphereGeometry(1, 32, 20), new Euler(0, 0, 0)),
    cube: spec(
      new RoundedBoxGeometry(1, 1, 1, 3, 0.16),
      new Euler(0.42, 0.62, 0),
    ),
    octahedron: spec(new OctahedronGeometry(1, 0), new Euler(0.24, 0.52, 0)),
    // The work stands upright, tipped toward the reader so its top shows.
    cylinder: spec(
      new CylinderGeometry(0.62, 0.62, 1.2, 40, 1),
      new Euler(0.36, 0, 0),
    ),
    // The money lies face to the reader, tipped back so its rim reads as a coin.
    coin: spec(
      new CylinderGeometry(1, 1, 0.36, 48, 1),
      new Euler(0.92, 0, 0.2),
    ),
    capsule: spec(
      new CapsuleGeometry(0.56, 0.52, 8, 24),
      new Euler(0.14, 0, 0),
    ),
  };
}

/**
 * A lane's plate (decision 155): a translucent slab with rounded corners and
 * a faint border, drawn behind one group of the front plane.
 *
 * One unit quad, scaled to the lane's box, with the rounded rectangle solved
 * in the fragment shader against the box's size. Solved there rather than
 * built as geometry because a lane grows and shrinks as the reader walks: a
 * stretched rounded-rectangle mesh would stretch its corners with it, and
 * rebuilding the geometry every frame of a tween would cost more than the
 * slab is worth. Colour is the caller's, which is the foreground token at two
 * low alphas, so one slab reads on the light ground and on the dark one.
 */
export interface PlateUniforms {
  [uniform: string]: IUniform;
  uSize: IUniform<Vector2>;
  uRadius: IUniform<number>;
  uBorder: IUniform<number>;
  uFill: IUniform<Color>;
  uLine: IUniform<Color>;
  uFillOpacity: IUniform<number>;
  uLineOpacity: IUniform<number>;
}

export interface PlateMesh extends Mesh {
  material: ShaderMaterial & { uniforms: PlateUniforms };
}

/** The corner radius and border width of a plate, in world units. */
const PLATE_RADIUS = 1.6;
const PLATE_BORDER = 0.18;

const PLATE_VERTEX = /* glsl */ `
varying vec2 vPlateUv;
void main() {
  vPlateUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const PLATE_FRAGMENT = /* glsl */ `
varying vec2 vPlateUv;
uniform vec2 uSize;
uniform float uRadius;
uniform float uBorder;
uniform vec3 uFill;
uniform vec3 uLine;
uniform float uFillOpacity;
uniform float uLineOpacity;
void main() {
  vec2 halfSize = uSize * 0.5;
  vec2 p = (vPlateUv - 0.5) * uSize;
  float r = min(uRadius, min(halfSize.x, halfSize.y));
  vec2 q = abs(p) - (halfSize - vec2(r));
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  float aa = max(fwidth(d), 1e-4);
  float inside = 1.0 - smoothstep(-aa, aa, d);
  float band = smoothstep(-uBorder - aa, -uBorder + aa, d) * inside;
  float alpha = inside * mix(uFillOpacity, uLineOpacity, band);
  if (alpha < 0.002) discard;
  gl_FragColor = vec4(mix(uFill, uLine, band), alpha);
}
`;

export function buildPlate(): PlateMesh {
  const uniforms: PlateUniforms = {
    uSize: { value: new Vector2(1, 1) },
    uRadius: { value: PLATE_RADIUS },
    uBorder: { value: PLATE_BORDER },
    uFill: { value: new Color() },
    uLine: { value: new Color() },
    uFillOpacity: { value: 0 },
    uLineOpacity: { value: 0 },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: PLATE_VERTEX,
    fragmentShader: PLATE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
  }) as ShaderMaterial & { uniforms: PlateUniforms };
  const mesh: PlateMesh = Object.assign(
    new Mesh(new PlaneGeometry(1, 1), material),
    { material },
  );
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  mesh.visible = false;
  return mesh;
}

function spec(geometry: BufferGeometry, euler: Euler): ShapeSpec {
  const tilt = new Quaternion().setFromEuler(euler);
  const { area, reach, bound } = silhouette(geometry, tilt);
  const scale = Math.sqrt(Math.PI / area);
  geometry.scale(scale, scale, scale);
  geometry.computeBoundingSphere();
  return { geometry, tilt, reach: reach * scale, bound: bound * scale };
}

/**
 * The shape's outline seen along the view axis at its tilt: its area, how far
 * it reaches from the centre, and its farthest vertex. Every shape is convex,
 * so the outline is the convex hull of its projected vertices.
 */
function silhouette(
  geometry: BufferGeometry,
  tilt: Quaternion,
): { area: number; reach: number; bound: number } {
  const position = geometry.getAttribute("position");
  const vertex = new Vector3();
  const points: [number, number][] = [];
  let bound = 0;
  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    bound = Math.max(bound, vertex.length());
    vertex.applyQuaternion(tilt);
    points.push([vertex.x, vertex.y]);
  }
  const hull = convexHull(points);
  let area = 0;
  let reach = 0;
  for (let i = 0; i < hull.length; i++) {
    const [x0, y0] = hull[i];
    const [x1, y1] = hull[(i + 1) % hull.length];
    area += x0 * y1 - x1 * y0;
    reach = Math.max(reach, Math.hypot(x0, y0));
  }
  return { area: Math.abs(area) / 2, reach, bound };
}

/** Andrew's monotone chain. */
function convexHull(points: [number, number][]): [number, number][] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper];
}
