import { FC} from 'react';
import { IDrawComponent } from '../state/draw-declaration';
import { SHAPE } from '../state/paintState';

const DRAW_COLOR:string = '#AAF';

export const DrawLine:FC<IDrawComponent> = ({state, army}) => {
  const { points, draw, width, height, shape} = state;
  const { setPoints, setDraw } = army;

  const viewBox = `0 0 ${width} ${height}`;
  const lineInteraction = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : () => {
      if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
      setDraw([]);
    },
    onMouseMove : ({clientX, clientY}) => {
      draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY])
    },
  }

  // click 

  const trinagleInteraction = {
    onMouseDown : ({clientX, clientY}) => {
      const [sx, sy] = draw;
      setDraw(Number.isFinite(sx)
        ? [...draw, clientX, clientY]
        : [clientX, clientY]
      )
    },
    onMouseUp   : ({clientX, clientY}) => {
      if (draw.length >= 8) {
        setPoints(p => [...p, [...draw]]);
        setDraw([]);
      }
    },
    onMouseMove : ({clientX, clientY}) => {
      // setDraw(([x,y, ...rest]) => [x, y, ...rest.slice(0, rest.length - 2)  ,clientX, clientY, x, y].filter(n => Number.isFinite(n)))
      draw.length >= 2 && draw.length < 6 && setDraw(([x,y]) => [x, y, clientX, clientY]);
      draw.length >= 6 && setDraw(([a, b, c, d]) => [a,b, c, d, clientX, clientY, a, b]);
    },
  }

  return (
    <svg viewBox={viewBox} style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}} 
      { ...(shape === SHAPE.Line ? lineInteraction : trinagleInteraction)} 
    >
      <g stroke={DRAW_COLOR} fill="none">
        {points.map( (line, key) => <polygon points={line.toString()} key={key} />)}
        {draw.length >= 4 && <polygon onClick={console.log} points={draw.toString()} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
  )
}