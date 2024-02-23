export type Color = {
  r: number;
  g: number;
  b: number;
};

export type VisibleArea = {
  x: number;
  y: number;
};

export enum ShapeType {
  Rectangle,
  Ellipse,
  Path,
  Text
}

export type RectangleShape = {
  id: string;
  type: ShapeType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
  zIndex: number;
};

export type EllipseShape = {
  id: string;
  type: ShapeType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
  zIndex: number;
};

export type PathShape = {
  id: string;
  type: ShapeType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
  zIndex: number;
};

export type TextShape = {
  id: string;
  type: ShapeType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
  zIndex: number;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum CanvasMode {
  None,
  Pressing,
  Moving,
  Adding,
  Resizing,
  Writing,
  MultiSelecting
}

export type Shape = RectangleShape | EllipseShape | PathShape | TextShape;
