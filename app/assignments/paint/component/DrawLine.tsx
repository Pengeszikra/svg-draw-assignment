import { FC, memo, useMemo } from 'react';
import { polygonEditLatest } from '../library/polygonEditLatest';
import { IDrawComponent } from '../state/draw-declaration';
import { SHAPE } from '../state/paintState';

const DRAW_COLOR:string = '#AAF';

export const DrawLine:FC<IDrawComponent> = ({state, army}) => {
  const { points, draw, width, height, shape} = state;
  const { setPoints, setDraw } = army;

  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [width, height]);
  const lineInteraction = {
    onMouseDown : ({clientX, clientY}) => {
        setDraw([clientX, clientY])
      },
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
    onMouseMove : polygonEditLatest(setDraw),
  }

  const boxInteraction = {
    onMouseDown : ({clientX, clientY}) => {
        const [sx, sy] = draw;
        setDraw(Number.isFinite(sx)
          ? [...draw, clientX, clientY]
          : [clientX, clientY]
        )
      },
    onMouseUp   : ({clientX, clientY}) => {
        if (draw.length >= 10) {
          setPoints(p => [...p, [...draw]]);
          setDraw([]);
        }
      },
    onMouseMove : polygonEditLatest(setDraw),
  }

  const interactionByShape = (currentShape: SHAPE) => {
    switch(currentShape) {
      case SHAPE.Line: return lineInteraction;
      case SHAPE.Trinagle: return trinagleInteraction;
      case SHAPE.Box: return boxInteraction;
      default: return {};
    }
  };

  return (
    <svg viewBox={viewBox} style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}} 
      { ...interactionByShape(shape)} 
    >
      <DrawedLayerCahce points={points} />
      <g stroke={DRAW_COLOR} fill="none">
        {draw.length >= 4 && <polygon onClick={console.log} points={draw.toString()} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
  )
}

const DrawedLayer:FC<{points:number[]}> = ({points}) => (
  <g stroke={DRAW_COLOR} fill="none">
    {points.map( (line, key) => <polygon points={line.toString()} key={key} />)}
  </g>
);

export const DrawedLayerCahce = memo(DrawedLayer);