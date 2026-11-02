import {
  Color,
  InstancedInterleavedBuffer,
  InterleavedBufferAttribute,
  type Vector3,
} from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";

/**
 * One batch of screen-space lines: every edge of a kind in a single draw call,
 * written in place each frame.
 *
 * `LineSegments2` draws lines of a real CSS-pixel width (WebGL's own lines are
 * one device pixel, which at DPR 2 is half a hairline). Its geometry setters
 * allocate a new buffer on every call, so the buffers here are allocated once
 * at capacity and written through; `instanceCount` says how many to draw.
 */
export class LineBatch {
  readonly object: LineSegments2;
  private readonly positions: Float32Array;
  private readonly colors: Float32Array;
  private readonly distances: Float32Array | null;
  private readonly positionBuffer: InstancedInterleavedBuffer;
  private readonly colorBuffer: InstancedInterleavedBuffer;
  private readonly distanceBuffer: InstancedInterleavedBuffer | null;
  private count = 0;

  constructor(
    private readonly capacity: number,
    options: { width: number; dashed?: boolean },
  ) {
    const geometry = new LineSegmentsGeometry();
    this.positions = new Float32Array(capacity * 6);
    this.colors = new Float32Array(capacity * 6);
    this.positionBuffer = new InstancedInterleavedBuffer(this.positions, 6, 1);
    this.colorBuffer = new InstancedInterleavedBuffer(this.colors, 6, 1);
    geometry.setAttribute(
      "instanceStart",
      new InterleavedBufferAttribute(this.positionBuffer, 3, 0),
    );
    geometry.setAttribute(
      "instanceEnd",
      new InterleavedBufferAttribute(this.positionBuffer, 3, 3),
    );
    geometry.setAttribute(
      "instanceColorStart",
      new InterleavedBufferAttribute(this.colorBuffer, 3, 0),
    );
    geometry.setAttribute(
      "instanceColorEnd",
      new InterleavedBufferAttribute(this.colorBuffer, 3, 3),
    );
    if (options.dashed) {
      this.distances = new Float32Array(capacity * 2);
      this.distanceBuffer = new InstancedInterleavedBuffer(
        this.distances,
        2,
        1,
      );
      geometry.setAttribute(
        "instanceDistanceStart",
        new InterleavedBufferAttribute(this.distanceBuffer, 1, 0),
      );
      geometry.setAttribute(
        "instanceDistanceEnd",
        new InterleavedBufferAttribute(this.distanceBuffer, 1, 1),
      );
    } else {
      this.distances = null;
      this.distanceBuffer = null;
    }
    geometry.instanceCount = 0;

    const material = new LineMaterial({
      linewidth: options.width,
      vertexColors: true,
      worldUnits: false,
      dashed: options.dashed ?? false,
      dashSize: 0.45,
      gapSize: 0.35,
      fog: true,
    });
    this.object = new LineSegments2(geometry, material);
    this.object.frustumCulled = false;
  }

  begin(): void {
    this.count = 0;
  }

  push(a: Vector3, b: Vector3, colorA: Color, colorB: Color = colorA): void {
    if (this.count >= this.capacity) return;
    const i = this.count * 6;
    this.positions[i] = a.x;
    this.positions[i + 1] = a.y;
    this.positions[i + 2] = a.z;
    this.positions[i + 3] = b.x;
    this.positions[i + 4] = b.y;
    this.positions[i + 5] = b.z;
    this.colors[i] = colorA.r;
    this.colors[i + 1] = colorA.g;
    this.colors[i + 2] = colorA.b;
    this.colors[i + 3] = colorB.r;
    this.colors[i + 4] = colorB.g;
    this.colors[i + 5] = colorB.b;
    if (this.distances) {
      this.distances[this.count * 2] = 0;
      this.distances[this.count * 2 + 1] = a.distanceTo(b);
    }
    this.count++;
  }

  end(): void {
    this.object.geometry.instanceCount = this.count;
    this.positionBuffer.needsUpdate = true;
    this.colorBuffer.needsUpdate = true;
    if (this.distanceBuffer) this.distanceBuffer.needsUpdate = true;
  }

  dispose(): void {
    this.object.geometry.dispose();
    (this.object.material as LineMaterial).dispose();
  }
}
