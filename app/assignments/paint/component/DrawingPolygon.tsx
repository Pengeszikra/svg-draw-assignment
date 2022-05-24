import { FC, memo, useMemo, MouseEvent, useEffect } from 'react';
import Flatten from '@flatten-js/core';
import { polygonEditLatest } from '../library/polygonEditLatest';
import { IDrawComponent, IPolygonItem } from '../state/draw-declaration';
import { SHAPE, TOOL } from '../state/paintState';
import { getRelativeEvent, convertRelativeEventToClient } from '../library/getRelativeEvent';
import { createPolygonItem } from '../library/createPolygonItem';
import { chunk } from '../library/chunk';

const DRAW_COLOR:string = '#AAF';

export const DrawingPolygon:FC<IDrawComponent> = ({state, army}) => {
  const { items, draw, width, height, shape, tool, underEdit, editBox} = state;
  const { setDraw, addPolygon, deleteItem, editItem, setEditBox } = army;

  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [width, height]);
  const lineInteraction = {
    onMouseDown : (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event); 
        setDraw([eventX, eventY])
      },
    onMouseUp   : () => {
        if (draw.length >= 4) {
          addPolygon(createPolygonItem(draw));
        };
        setDraw([]);
      },
    onMouseMove : (event:MouseEvent) => {
      const {eventX, eventY} = getRelativeEvent(event);
        draw.length >= 2 && setDraw(([x,y]) => [x, y, eventX, eventY])
      },
  }

  const trinagleInteraction = {
    onMouseDown: (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event);
        const [sx, sy] = draw;
        setDraw(Number.isFinite(sx) && Number.isFinite(sy)
          ? [...draw, eventX, eventY]
          : [eventX, eventY]
        )
      },
    onMouseUp: () => {
        if (draw.length === 4) {
          setDraw(([x,y,...r])=> [x,y, ...r, x, y])
        }
        if (draw.length >= 8) {
          addPolygon(createPolygonItem(draw));
          setDraw([]);
        }
      },
    onMouseMove: (event:MouseEvent) => polygonEditLatest(setDraw)(convertRelativeEventToClient(event))
  }

  const boxInteraction = {
    onMouseDown: (event:MouseEvent) => {
        const {eventX, eventY} = getRelativeEvent(event);
        const [sx, sy] = draw;
        setDraw(Number.isFinite(sx) && Number.isFinite(sy)
          ? [...draw, eventX, eventY]
          : [eventX, eventY]
        )
      },
    onMouseUp: () => {
        if (draw.length === 4) {
          setDraw(([x,y,...r])=> [x,y, ...r, x, y])
        }
        if (draw.length >= 10) {
          addPolygon(createPolygonItem(draw));
          setDraw([]);
        }
      },
    onMouseMove: (event:MouseEvent) => polygonEditLatest(setDraw)(convertRelativeEventToClient(event))
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
    if (tool === TOOL.Delete && event?.target?.id) {
      deleteItem({id:event.target.id});
    }
    if (tool === TOOL.Edit && event?.target?.id) {
      editItem({id:event.target.id});
    }
  };

  useEffect(() => {
    if (!underEdit) {
      setEditBox([]);
      return;
    };

    const {point, Polygon} = Flatten;
    const {points} = underEdit;

    const middlePoint = point(width/2, height/2);
    const pointList = chunk(2)(points).map(p => point(...p));

    const editPolygon = new Polygon(pointList);

    const [dist, {ps, pe}] = middlePoint.distanceTo(editPolygon);

    // console.warn(editPolygon);
    // console.warn(dist, ps, pe);

    (ps && pe) && setEditBox([ps.x, ps.y, pe.x, pe.y]);
  }, [underEdit])

  return (
    <svg 
      viewBox={viewBox} 
      style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}}
      { ...(tool === TOOL.Draw ? interactionByShape(shape) : {}) } 
    >
      <DrawedLayerCahce items={items} handleToolOnClick={handleToolOnClick} />
      {Array.isArray(editBox) && editBox.length && (
        <polygon points={editBox.toString()} strokeDasharray={[2,8]} />
      )}
      <g stroke={DRAW_COLOR} fill="none">
        {draw.length >= 4 && <polygon points={draw.toString()} strokeDasharray={[1,8]}/>}
      </g>
    </svg>
  )
}

// const DrawedLayer:FC<{items:IPolygonItem[], handleToolOnClick:(e:MouseEvent)=>any}> = ({items, handleToolOnClick}) => (
//   <g stroke={DRAW_COLOR} fill="none">
//     {items.map( ({id, points, fill}) => <polygon onClick={handleToolOnClick} points={points.toString()} key={id} id={id} fill={fill} />)}
//   </g>
// );

const DrawedLayer:FC<{items:IPolygonItem[]}> = ({items}) => (
  <g stroke={DRAW_COLOR} fill="none">
    {items.map( ({id, points, fill}) => <polygon points={points.toString()} key={id} id={id} fill={fill} />)}
  </g>
);

export const DrawedLayerCahce = memo(DrawedLayer);