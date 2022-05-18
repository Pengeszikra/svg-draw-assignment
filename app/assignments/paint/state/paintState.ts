export enum TOOL {
  Draw,
  Edit,
  Undo,
  Move,
  Delete,
  Select,
  BoxSelect,
}

export enum SHAPE {
  Line,
  Trinagle,
  Box,
  Circle,
}

export type TCoord = [number, number]

export type TLine = [TCoord, TCoord]

export type TTrinagle = [TCoord, TCoord, TCoord]

export type TPolygon = Array<TCoord>

export interface IState {
  tool: TOOL;
  shape: SHAPE | null;
  image: Array<SHAPE>;

}

const action = (type:string) => ({type});

export const 
  SELECT_TOOL = action('select-tool'),
  SELECT_SHAPE = action('select-shape'),

  START_DRAW = action('start-draw'),
  FINIDH_DRAW = action('finish-draw'),
  CANCEL_DRAW = action('cancel-draw'),

  START_SHAPE_MOVE = action('start-shape-move'),
  FINISH_SHAPE_MOVE = action('finish-shape-move'),
  CANCEL_SHAPE_MOVE = action('cancel-shape-move'),

  UNDO_LAST_DRAW = action('undo-last-draw'),
  
  DELETE_SHAPE = action('delete-shape'),
  DELETE_ALL_SHAPE = action('delete-all_shape'),
  
  REPLAY_DRAWING = action('replay-drawing'),
  STOP_REPLAY = action('stop-replay')
