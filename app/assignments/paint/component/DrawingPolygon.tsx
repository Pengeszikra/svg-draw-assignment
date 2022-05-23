import { FC, memo, useMemo, MouseEvent } from 'react';
import { polygonEditLatest } from '../library/polygonEditLatest';
import { IDrawComponent } from '../state/draw-declaration';
import { SHAPE, TOOL } from '../state/paintState';
import { getRelativeEvent, convertRelativeEventToClient } from '../library/getRelativeEvent';

const DRAW_COLOR:string = '#AAF';

export const DrawingPolygon:FC<IDrawComponent> = ({state, army}) => {
  const { points, draw, width, height, shape, tool} = state;
  const { setPoints, setDraw } = army;

  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [width, height]);
  const lineInteraction = {
    onMouseDown : (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event); 
        setDraw([eventX, eventY])
      },
    onMouseUp   : () => {
        if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
        setDraw([]);
      },
    onMouseMove : (event:MouseEvent) => {
      const {eventX, eventY} = getRelativeEvent(event);
        draw.length >= 2 && setDraw(([x,y]) => [x, y, eventX, eventY])
      },
  }

  // click 

  const trinagleInteraction = {
    onMouseDown : (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event);
        const [sx, sy] = draw;
        setDraw(Number.isFinite(sx)
          ? [...draw, eventX, eventY]
          : [eventX, eventY]
        )
      },
    onMouseUp   : () => {
        if (draw.length === 4) {
          setDraw(([x,y,...r])=> [x,y, ...r, x, y])
        }
        if (draw.length >= 8) {
          setPoints(p => [...p, [...draw]]);
          setDraw([]);
        }
      },
    onMouseMove : (event:MouseEvent) => polygonEditLatest(setDraw)(convertRelativeEventToClient(event))
  }

  const boxInteraction = {
    onMouseDown : (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event);
        const [sx, sy] = draw;
        setDraw(Number.isFinite(sx)
          ? [...draw, eventX, eventY]
          : [eventX, eventY]
        )
      },
    onMouseUp   : () => {
        if (draw.length === 4) {
          setDraw(([x,y,...r])=> [x,y, ...r, x, y])
        }
        if (draw.length >= 10) {
          setPoints(p => [...p, [...draw]]);
          setDraw([]);
        }
      },
    onMouseMove : (event:MouseEvent) => polygonEditLatest(setDraw)(convertRelativeEventToClient(event))
  }

  const interactionByShape = (currentShape: SHAPE) => {
    switch(currentShape) {
      case SHAPE.Line: return lineInteraction;
      case SHAPE.Trinagle: return trinagleInteraction;
      case SHAPE.Box: return boxInteraction;
      default: return {};
    }
  };

  const handleToolOnClick = (event:MouseEvent) => { 
    // if (![TOOL.Edit, TOOL.Delete].includes(tool)) return;
    const {target} = event;
    console.warn('edit :: ',target);
  };

  return (
    <svg 
      viewBox={viewBox} 
      style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}}
      { ...(tool === TOOL.Draw ? interactionByShape(shape) : {}) } 
    >
      <DrawedLayerCahce points={points} handleToolOnClick={handleToolOnClick} />
      <g stroke={DRAW_COLOR} fill="none">
        {draw.length >= 4 && <polygon points={draw.toString()} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
  )
}

const DrawedLayer:FC<{points:number[], handleToolOnClick:(e:MouseEvent)=>any}> = ({points, handleToolOnClick}) => (
  <g stroke={DRAW_COLOR} fill="none">
    {points.map( (line, key) => <polygon onClick={handleToolOnClick} points={line.toString()} key={key} />)}
  </g>
);

export const DrawedLayerCahce = memo(DrawedLayer);