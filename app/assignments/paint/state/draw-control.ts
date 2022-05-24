import { actionFactory, kebabToCamelCase } from "react-troll";
import { likeUseState } from "../../../utils/likeUseState";
import { Action } from "../../../utils/react-troll-declaration";
import { IDrawState, IPolygonItem, SHAPE, TOOL } from "./paintState";

export const [drawActionsSet, action] = actionFactory(kebabToCamelCase);

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
  CLEAR_ALL = action('clear-all'),

  DELETE_SHAPE = action('delete-shape'),
  DELETE_ALL_SHAPE = action('delete-all_shape'),

  REPLAY_DRAWING = action('replay-drawing'),
  STOP_REPLAY = action('stop-replay'),
  
  CHANGE_DIMENSION = action('change-dimension'),
  SET_DRAW = action('set-draw'),
  ADD_POLYGON = action('add-polygon'),
  DELETE_ITEM = action('delete-item'),
  EDIT_ITEM = action('edit-item'),
  SET_POLYGON_POINTS = action('set-polygon-points')
;

export const drawInitialState:IDrawState = {  
  draw: [],
  tool: TOOL.Draw,
  shape: SHAPE.Line,
  width: 300,
  height: 300,
  items: [],
  underEdit: null,
}

export type TDrawReducer = (state:IDrawState, action:Action ) => IDrawState;

export const drawReducer:TDrawReducer = (state:IDrawState, {type, payload}:Action) => {
  // if (![SET_DRAW].includes(type))  console.log(type, payload)
  switch (type) {
    case SELECT_TOOL : return {...state, draw:[], underEdit:null, tool : payload }
    case SELECT_SHAPE : return {...state, shape : payload }

    case START_DRAW : return {...state, _ : payload }
    case FINIDH_DRAW : return {...state, _ : payload }
    case CANCEL_DRAW : return {...state, _ : payload }
    case START_SHAPE_MOVE : return {...state, _ : payload }
    case FINISH_SHAPE_MOVE : return {...state, _ : payload }
    case CANCEL_SHAPE_MOVE : return {...state, _ : payload }
    case DELETE_SHAPE : return {...state, _ : payload }
    case DELETE_ALL_SHAPE : return {...state, _ : payload }
    case REPLAY_DRAWING : return {...state, _ : payload }
    case STOP_REPLAY : return {...state, _ : payload }

    case UNDO_LAST_DRAW : return {...state, draw:[], items: state.items.slice(0, state.items.length - 1) }
    case CLEAR_ALL : return {...state, draw:[], items:[]}
    case CHANGE_DIMENSION : return {...state, width: payload?.width, height: payload?.height }
    case SET_DRAW : return {...state, draw : likeUseState(payload, state.draw) }
    case SET_POLYGON_POINTS : {
      const seek:IPolygonItem = payload;
      const polygonItem = state.items.find(item => item.id === seek?.id);
      if (!polygonItem) return state;
      return state.items.map(item => item === polygonItem ? {...item, points: seek.points} : item);
    }
    case DELETE_ITEM : {
      const seek:IPolygonItem = payload;
      const polygonItem = state.items.find(item => item.id === seek?.id);
      return polygonItem
        ? {...state, items: state.items.filter(({id}) => id !== seek.id)}
        : state
      ;
    }
    case EDIT_ITEM : {
      const seek:IPolygonItem = payload;
      const polygonItem = state.items.find(item => item.id === seek?.id);
      return {...state, underEdit: polygonItem  ?  polygonItem : null};
    }
    case ADD_POLYGON : {
      const polygonItem:IPolygonItem = payload;
      return polygonItem?.id && Array.isArray(polygonItem?.points) 
        ? {...state, items:  [...state.items, polygonItem] }
        : state
      ;
    }

    default: return state;
  }
}