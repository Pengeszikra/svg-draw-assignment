import { ActionArmy } from "../../../utils/react-troll-declaration";
import { IDrawState } from "./paintState";

export interface IDrawComponent {
  state: IDrawState;
  army: ActionArmy;
}

export type TPointList = number[];

export interface IPolygonItem {
  id: string;
  points: TPointList;
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

