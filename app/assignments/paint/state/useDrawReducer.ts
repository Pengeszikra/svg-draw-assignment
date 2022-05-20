import { useTroll } from 'react-troll';
import { TrollFactory } from '../../../utils/react-troll-declaration';
import { drawActionsSet, drawInitialState, drawReducer } from './draw-control';
import { IDrawState } from './paintState';

export const useDrawReducer:TrollFactory<IDrawState> = () => useTroll(drawReducer, drawInitialState, drawActionsSet);