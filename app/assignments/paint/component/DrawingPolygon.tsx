import { FC, memo, useMemo, MouseEvent, useEffect } from 'react';
import Flatten from '@flatten-js/core';
import { polygonEditLatest } from '../library/polygonEditLatest';
import { IDrawComponent, IPolygonItem } from '../state/draw-declaration';
import { SHAPE, TOOL } from '../state/paintState';
import { getRelativeEvent, convertRelativeEventToClient } from '../library/getRelativeEvent';
import { createPolygonItem } from '../library/createPolygonItem';
import { chunk } from '../library/chunk';
import { useCallback } from 'react';

const {point, Polygon} = Flatten;

interface IFocusItem {
  id: string;
  distance: [number, Flatten.Segment];
}

const DRAW_COLOR:string = '#AAF';
const chunk2 = chunk(2);

export const DrawingPolygon:FC<IDrawComponent> = ({state, army}) => {
  const { items, draw, width, height, shape, tool, underEdit, editBox, _focus_} = state;
  const { setDraw, addPolygon, deleteItem, editItem, setEditBox, setFocus } = army;

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

  const selectInteraction = {
    onMouseMove: (event:MouseEvent) => {
      const {eventX, eventY} = getRelativeEvent(event);
      if (tool === TOOL.Edit) {
        const hoverPoint = point(eventX, eventY);

        const flattenShapeList = items.map(item => {
          const {id, points} = item;
          const flattenPointList = chunk2(points).map(p => point(...p));
          return {
            shape: new Polygon(flattenPointList),
            id
          }
        });

        const distanceList:IFocusItem[] = flattenShapeList.map(({id, shape}) => {
          return {
            id, 
            distance: shape.distanceTo(hoverPoint)
          }
        });

        distanceList.sort((a,b) => a.distance[0] - b.distance[0]);

        setFocus(distanceList);

        setEditBox([eventX, eventY]);
      }
    }
  }

  return (
    <svg 
      viewBox={viewBox} 
      style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}}
      { ...(tool === TOOL.Draw 
        ? interactionByShape(shape) 
        : tool === TOOL.Edit 
          ? selectInteraction
          : {}
       )} 
    >
      <DrawedLayerCahce items={items} />
      {Array.isArray(editBox) && editBox.length && (
        <polygon points={editBox.toString()} strokeDasharray={[2,8]} />
      )}
      <g stroke={DRAW_COLOR} fill="none">
        {draw.length >= 4 && <polygon points={draw.toString()} strokeDasharray={[1,8]}/>}
      </g>
      { Array.isArray(editBox) && editBox.length >= 2 && (
        <g fill="none">
          <circle cx={editBox[0]} cy={editBox[1]} r={5} stroke="red" />
          {Array.isArray(_focus_) && _focus_.map(({id, distance:[_, {ps, pe}]}, index) => (
            <polygon key={'distance-'+id} points={[ps.x, ps.y, pe.x, pe.y]} stroke={index === 0 ? "red" : "#444" }/>
          ))}
        </g>
      )}
    </svg>
  )
}

const DrawedLayer:FC<{items:IPolygonItem[]}> = ({items}) => (
  <g stroke={DRAW_COLOR} fill="none">
    {items.map( ({id, points, fill}) => <polygon points={points.toString()} key={id} id={id} fill={fill} />)}
  </g>
);

export const DrawedLayerCahce = memo(DrawedLayer);