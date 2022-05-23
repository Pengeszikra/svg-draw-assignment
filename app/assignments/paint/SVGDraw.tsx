import { FC, useEffect, useRef} from 'react';
import './styles/draw.scss';
import { IDrawState } from './state/paintState';
import { Troll } from '../../utils/react-troll-declaration';
import { useDrawReducer } from './state/useDrawReducer';
import { ToolBar } from './component/ToolBar';
import { DrawingPolygon } from './component/DrawingPolygon';

const BACKGROUND_COLOR:string = '#222';
const IS_DEBUG = false;

export const SVGDraw:FC = () => {

  const [state, army]:Troll<IDrawState> = useDrawReducer();

  const {width, height, draw} = state;
  const {changeDimension} = army;

  const areaRef = useRef(null);

  useEffect(() => {
    if (!areaRef.current) return null;
    changeDimension(areaRef.current.parentElement.getBoundingClientRect())
  }, [areaRef]);

  return (
    <section ref={areaRef} style={{width, height, background:BACKGROUND_COLOR, position:'relative'}}>
      <DrawingPolygon state={state} army={army} />
      <ToolBar state={state} army={army} />
      {IS_DEBUG && (
        <pre style={{position:'absolute', margin:0, padding:0, display:'block', bottom:0, left:0, color:'#ABC'}}>
          {JSON.stringify(draw, null, 2)}
        </pre>)
      }
    </section>
  )
}