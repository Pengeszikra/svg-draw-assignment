import { IPolygonItem, TPolygon } from "../state/paintState";

export const createPolygonItem = (points:TPolygon, id = uuid()):IPolygonItem => ({id, points});

export const uuid = ():string => Math.random().toString(32).slice(-8);
