import { IPolygonItem, TPolygon } from "../state/paintState";

export const createPolygonItem = (points:TPolygon, fill="transparent", id = uuid()):IPolygonItem => ({id, points, fill});

export const uuid = ():string => Math.random().toString(32).slice(-8);
