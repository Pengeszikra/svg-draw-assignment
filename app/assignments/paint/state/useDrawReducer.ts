import { getDispatchedActions } from 'react-troll';
import useSagaReducer from 'use-saga-reducer';
import { TrollFactory } from '../../../utils/react-troll-declaration';
import { mainSaga } from '../saga/mainSaga';
import { drawActionsSet, drawInitialState, drawReducer } from './draw-control';
import { IDrawState } from './paintState';

export const useDrawReducer:TrollFactory<IDrawState> = () => {
  const [state, dispatch] = useSagaReducer(mainSaga, drawReducer, drawInitialState);
  const army = getDispatchedActions(drawActionsSet(), dispatch);
  return [state, army];
};