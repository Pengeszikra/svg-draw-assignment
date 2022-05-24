export enum TOOL {
  Draw,
  Edit,
  Undo,
  Move,
  Delete,
  Select,
  BoxSelect,
  Fill,
  NoActiveTool,
}

export enum SHAPE {
  Line,
  Trinagle,
  Box,
  Circle,
}

export type TPolygon = number[];

export interface IPolygonItem {
  id: string;
  points: TPolygon;
  fill?: string;
}

export enum VisualElementType{
  LINE,
  POLYGON,
  GROUP,
}

export interface IVisualItem {
  id: string;
  type: VisualElementType;
}

export type Nullable<T> = T | undefined | null;

export interface IDrawState {
  draw: number[];
  tool: TOOL;
  shape: SHAPE;
  width: number;
  height: number;
  items: IPolygonItem[];
  underEdit: Nullable<IPolygonItem>;
  editBox: number[];
  _focus_: any,
}