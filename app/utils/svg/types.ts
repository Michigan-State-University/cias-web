export type SmoothEdgeOptions =
  | { smoothEdge: false }
  | {
      smoothEdge: true;
      smoothRadius: number;
    };

export type Options = SmoothEdgeOptions;
