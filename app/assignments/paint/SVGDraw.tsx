import { FC} from 'react';
import './styles/draw.scss';
import { IDrawState } from './state/paintState';
import Flatten from '@flatten-js/core';
import { Troll } from '../../utils/react-troll-declaration';
import { useDrawReducer } from './state/useDrawReducer';
import { ToolBar } from './component/ToolBar';

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

  const { points, draw, tool, shape, flattenPoints } = state;
  const { setPoints, setDraw, setTool, setShape, undoLastDraw, clearAll } = army;

  const viewBox = `0 0 ${width} ${height}`;
  const interactions = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : ({clientX, clientY}) => {
      if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
      setDraw([])
    },
    onMouseMove : ({clientX, clientY}) => {
      draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY])
    },
  }

  const handFlattenTest = event => {
    event.preventDefault();

    const { point, circle, Polygon } = Flatten;
    const pw = width / 48;
    const ph = height / 48;
  
    // Create new instance of polygon
    const shape = new Polygon();
    // Add face from array of points - segment edges will be created
    shape.addFace([
      point(12 * pw, 12 * ph),
      point(12 * pw, 36 * ph),
      point(24 * pw, 24 * ph),
      point(36 * pw, 36 * ph),
      point(38 * pw, 12 * ph)
    ]);
    // Add another 3 faces - circular arcs
    shape.addFace([circle(point(18 * pw, 20 * ph), 2 * pw).toArc()]);
    shape.addFace([circle(point(4 * pw, 24 * ph), 3 * pw).toArc()]);
    shape.addFace([circle(point(40 * pw, 28 * ph), 3 * pw).toArc()]);

    console.log(shape.toJSON());
    const shapePoints = shape.toJSON();
    const toPointsList = shapePoints.flat().filter(({name}) => name === 'segment').map(({pe:{x:a,y:b}, ps:{x:c,y:d}}) => [a,b,c,d])
    // renderFlattenPoints(toPointsList);
  }

  return (
    <main style={{height, background:BACKGROUND_COLOR}}>
      <svg viewBox={viewBox} style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}} {...interactions} >
        <g stroke={DRAW_COLOR} fill="none">
          {points.map( (line, key) => <polygon points={line} key={key} />)}
          {draw.length >= 4 && <polygon onClick={console.log} points={draw} strokeDasharray={[1,8]}/>}
        </g>
        <g stroke={DRAW_COLOR} fill="none">
          <polygon points={flattenPoints} />
        </g>
      </svg>
      <ToolBar state={state} army={army} />
    </main>
  )
}