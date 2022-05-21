import { FC} from 'react';
import './styles/draw.scss';
import { IDrawState } from './state/paintState';
import Flatten from '@flatten-js/core';
import { Troll } from '../../utils/react-troll-declaration';
import { useDrawReducer } from './state/useDrawReducer';
import { ToolBar } from './component/ToolBar';
import { DrawLine } from './component/DrawLine';

export type Tjlog = (any) => string;
export const jlog:Tjlog = p => JSON.stringify(p);


const BACKGROUND_COLOR:string = '#222';
const DRAW_COLOR:string = '#AAF';

export interface ISVGDraw {
  width:number;
  height:number;
}

export const SVGDraw:FC<ISVGDraw> = ({width = global.innerWidth, height = global.innerHeight}) => {
  
  const [state, army]:Troll<IDrawState> = useDrawReducer();

  return (
    <section style={{height, background:BACKGROUND_COLOR, position:'relative'}}>
      <DrawLine state={state} army={army} />
      <ToolBar state={state} army={army} />
    </section>
  )
}