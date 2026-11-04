/**
 * The part of `d3-force-3d` the 3D graph uses. The package ships no types and
 * there is no `@types` package; this mirrors `d3-force`'s own signatures with
 * the third axis added.
 */
declare module "d3-force-3d" {
  export interface SimNode {
    index?: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
    fx?: number | null;
    fy?: number | null;
    fz?: number | null;
  }

  export interface SimLink<N extends SimNode> {
    source: string | N;
    target: string | N;
    index?: number;
  }

  type Accessor<T, R> = R | ((datum: T, index: number, data: T[]) => R);

  export interface Force<N extends SimNode> {
    (alpha: number): void;
    initialize?(nodes: N[], ...args: unknown[]): void;
  }

  export interface Simulation<N extends SimNode> {
    tick(iterations?: number): this;
    stop(): this;
    restart(): this;
    nodes(): N[];
    nodes(nodes: N[]): this;
    alpha(): number;
    alpha(alpha: number): this;
    alphaMin(): number;
    alphaMin(min: number): this;
    alphaDecay(): number;
    alphaDecay(decay: number): this;
    alphaTarget(): number;
    alphaTarget(target: number): this;
    velocityDecay(decay: number): this;
    randomSource(source: () => number): this;
    force(name: string): Force<N> | undefined;
    force(name: string, force: Force<N> | null): this;
  }

  export function forceSimulation<N extends SimNode>(
    nodes?: N[],
    numDimensions?: number,
  ): Simulation<N>;

  export interface ForceLink<
    N extends SimNode,
    L extends SimLink<N>,
  > extends Force<N> {
    links(links: L[]): this;
    id(id: (node: N) => string): this;
    distance(distance: Accessor<L, number>): this;
    strength(strength: Accessor<L, number>): this;
    iterations(iterations: number): this;
  }
  export function forceLink<N extends SimNode, L extends SimLink<N>>(
    links?: L[],
  ): ForceLink<N, L>;

  export interface ForceManyBody<N extends SimNode> extends Force<N> {
    strength(strength: Accessor<N, number>): this;
    distanceMax(distance: number): this;
    theta(theta: number): this;
  }
  export function forceManyBody<N extends SimNode>(): ForceManyBody<N>;

  export interface ForceCollide<N extends SimNode> extends Force<N> {
    radius(radius: Accessor<N, number>): this;
    strength(strength: number): this;
    iterations(iterations: number): this;
  }
  export function forceCollide<N extends SimNode>(): ForceCollide<N>;

  export interface ForceAxis<N extends SimNode> extends Force<N> {
    strength(strength: Accessor<N, number>): this;
  }
  export function forceX<N extends SimNode>(
    x: Accessor<N, number>,
  ): ForceAxis<N> & { x(x: Accessor<N, number>): ForceAxis<N> };
  export function forceY<N extends SimNode>(
    y: Accessor<N, number>,
  ): ForceAxis<N> & { y(y: Accessor<N, number>): ForceAxis<N> };
  export function forceZ<N extends SimNode>(
    z: Accessor<N, number>,
  ): ForceAxis<N> & { z(z: Accessor<N, number>): ForceAxis<N> };
}
