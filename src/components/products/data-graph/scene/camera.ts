import type { CameraControlsImpl } from "@react-three/drei";
import { Box3, MathUtils, type Spherical, Vector3 } from "three";

/**
 * Where to put the camera so a box fills the view, from a given angle.
 *
 * `camera-controls` has `fitToBox`, but it snaps the camera to the nearest
 * axis first, which turns a gentle "frame the roofer" into a quarter turn of
 * the whole scene. This keeps the reader's angle and moves only the distance
 * and the target: every corner of the box is taken into the camera's frame
 * and the distance is the smallest one at which all eight are inside the
 * frustum, with `padding` to spare.
 */

/** The opening angle: a little from the right and a little above. */
export const DEFAULT_AZIMUTH = 0.36;
export const DEFAULT_POLAR = 1.3;

/**
 * The turntable's vertical stops, from a clamp given as degrees away from
 * each pole. Up stays up, so the camera must never reach a pole: at one the
 * view axis and the world's up axis are the same line, the azimuth stops
 * meaning anything, and the next horizontal drag flips the scene over. A few
 * degrees short of both is as high and as low as a model on a table goes.
 */
export function polarLimits(clampDegrees: number): [number, number] {
  const margin = MathUtils.degToRad(MathUtils.clamp(clampDegrees, 1, 80));
  return [margin, Math.PI - margin];
}

/**
 * `azimuthRotateSpeed` for a sensitivity in degrees per 100 pixels of drag.
 *
 * `camera-controls` turns a drag by `2π · speed · Δpx / height`, so a bare
 * speed means a different angle on every canvas: the same gesture spins a
 * short canvas further than a tall one. Dividing the height back out makes
 * the setting what the reader's hand actually feels.
 */
export function rotateSpeed(degreesPer100px: number, height: number): number {
  return (degreesPer100px * Math.max(height, 1)) / 36000;
}

const corner = new Vector3();
const direction = new Vector3();
const right = new Vector3();
const up = new Vector3();
const worldUp = new Vector3(0, 1, 0);

export interface CameraView {
  position: Vector3;
  target: Vector3;
}

export function frameBox(
  box: Box3,
  azimuth: number,
  polar: number,
  fovDegrees: number,
  aspect: number,
  padding = 1.12,
): CameraView {
  const target = box.getCenter(new Vector3());
  // Unit vector from the target toward the camera (three's Spherical order).
  direction.set(
    Math.sin(polar) * Math.sin(azimuth),
    Math.cos(polar),
    Math.sin(polar) * Math.cos(azimuth),
  );
  right.crossVectors(worldUp, direction).normalize();
  up.crossVectors(direction, right).normalize();

  const tanV = Math.tan(MathUtils.degToRad(fovDegrees) / 2) / padding;
  const tanH = tanV * Math.max(aspect, 0.1);
  let distance = 0;
  for (let i = 0; i < 8; i++) {
    corner.set(
      i & 1 ? box.max.x : box.min.x,
      i & 2 ? box.max.y : box.min.y,
      i & 4 ? box.max.z : box.min.z,
    );
    corner.sub(target);
    const toward = corner.dot(direction);
    distance = Math.max(
      distance,
      Math.abs(corner.dot(right)) / tanH + toward,
      Math.abs(corner.dot(up)) / tanV + toward,
    );
  }
  distance = Math.max(distance, 6);
  return {
    target,
    position: target.clone().addScaledVector(direction, distance),
  };
}

/**
 * Move the orbit's pivot without moving the camera.
 *
 * `camera-controls` orbits about its target, and the arrangement frames the
 * camera on a look-at point beside the middle of the picture (the Node view
 * seats the selection in the left third), so an orbit about the bare target
 * swings the graph away. The pivot is moved onto the point we want with a
 * focal offset that keeps the camera exactly where it is: the offset is
 * applied in the camera's own frame after the orbit, so that point holds its
 * place on screen while everything else turns about it.
 *
 * Which point that is belongs to the gesture, not to the selection (this
 * supersedes decision 133's orbit): the middle of what is on screen by
 * default, the node under the pointer when a drag starts on one. `World`
 * decides; this only carries it out.
 *
 * This is `setOrbitPoint` done to both the current and the end state, which
 * the library's own call does not (it cancels a flight in progress), so it
 * can run every frame while the camera flies and the graph glides. It reaches
 * into the controls' protected state; `camera-controls` is pinned by drei,
 * and the fields named here are the ones `setOrbitPoint` itself writes.
 */
interface OrbitState {
  _target: Vector3;
  _targetEnd: Vector3;
  _focalOffset: Vector3;
  _focalOffsetEnd: Vector3;
  _spherical: Spherical;
  _sphericalEnd: Spherical;
  /** A dolly to the cursor still being applied; it assumes a centred target. */
  _changedDolly: number;
}

const axisX = new Vector3();
const axisY = new Vector3();
const axisZ = new Vector3();
const shift = new Vector3();
const axisPoint = new Vector3();
/** Below this, squared, the pivot is where it should be already. */
const PIVOT_EPSILON = 1e-10;
const MIN_PIVOT_DISTANCE = 0.5;

/** The camera's right, up and back axes for an orbit angle (world up is +y). */
function cameraAxes(spherical: Spherical): void {
  axisZ.setFromSpherical(spherical).normalize();
  axisX.crossVectors(worldUp, axisZ).normalize();
  axisY.crossVectors(axisZ, axisX);
}

/** The point on the view axis the camera looks at, for one state. */
function lookPointOf(
  target: Vector3,
  offset: Vector3,
  spherical: Spherical,
  out: Vector3,
): Vector3 {
  cameraAxes(spherical);
  return out
    .copy(target)
    .addScaledVector(axisX, offset.x)
    .addScaledVector(axisY, -offset.y);
}

/** Move one state's pivot to `to` without moving its camera. */
function movePivot(
  target: Vector3,
  offset: Vector3,
  spherical: Spherical,
  to: Vector3,
): void {
  shift.subVectors(to, target);
  if (shift.lengthSq() < PIVOT_EPSILON) return;
  cameraAxes(spherical);
  // A point at or behind the camera cannot be orbited about.
  if (spherical.radius - shift.dot(axisZ) <= MIN_PIVOT_DISTANCE) return;
  offset.x -= shift.dot(axisX);
  offset.y += shift.dot(axisY);
  spherical.radius -= shift.dot(axisZ);
  target.copy(to);
}

/**
 * Pivot the orbit on `point`, keeping the camera and wherever it is flying
 * to. With no point, or while a wheel zoom is still easing toward the cursor,
 * the pivot goes back onto the view axis, where the library's zoom-to-cursor
 * expects it.
 */
export function pivotOn(
  controls: CameraControlsImpl,
  point: Vector3 | null,
): void {
  const state = controls as unknown as OrbitState;
  const onAxis = point == null || state._changedDolly !== 0;
  for (const end of [false, true]) {
    const target = end ? state._targetEnd : state._target;
    const offset = end ? state._focalOffsetEnd : state._focalOffset;
    const spherical = end ? state._sphericalEnd : state._spherical;
    const to = onAxis
      ? lookPointOf(target, offset, spherical, axisPoint)
      : point;
    movePivot(target, offset, spherical, to);
  }
}

/**
 * Where the camera looks, on its view axis: the target it would have with no
 * focal offset. A pose kept as position and this point is put back with a
 * plain `setLookAt` and a zero offset.
 */
export function lookPoint(
  controls: CameraControlsImpl,
  out: Vector3,
  end = true,
): Vector3 {
  const state = controls as unknown as OrbitState;
  return end
    ? lookPointOf(
        state._targetEnd,
        state._focalOffsetEnd,
        state._sphericalEnd,
        out,
      )
    : lookPointOf(state._target, state._focalOffset, state._spherical, out);
}

/** Where the camera is going: its end position and the point it looks at. */
export function endPose(controls: CameraControlsImpl): CameraView {
  const target = lookPoint(controls, new Vector3());
  // The library's end position leaves out the focal offset, which moves the
  // camera by exactly the gap between the look point and the pivot.
  const position = controls
    .getPosition(new Vector3(), true)
    .add(target)
    .sub(controls.getTarget(shift, true));
  return { position, target };
}

/**
 * Fly (or cut) to a pose given as position and look-at point, clearing the
 * pivot's offset with it; the next frame pivots on the centre again.
 */
export function lookAt(
  controls: CameraControlsImpl,
  view: CameraView,
  animate: boolean,
): void {
  const { position: p, target: t } = view;
  void controls.setLookAt(p.x, p.y, p.z, t.x, t.y, t.z, animate);
  void controls.setFocalOffset(0, 0, 0, animate);
}
