import {useEffect, useState, FC} from 'react';
import {Button} from 'react-bootstrap';
import { SHAPE, TOOL } from './state/paintState';
import Flatten from '@flatten-js/core';

export type Tjlog = (any) => string;
export const jlog:Tjlog = p => JSON.stringify(p);

export const PainterExtra:FC = ({width = window.innerWidth, height = window.innerHeight}) => {
  const [points, setPoints] = useState([]);
  const [draw, setDraw] = useState([]);
  
  const [tool, setTool] = useState<TOOL>(TOOL.Draw)
  const [shape, setShape] = useState<SHAPE>(SHAPE.Line)
  const [flattenPoints, renderFlattenPoints] = useState<[]>([])

  const viewBox = `0 0 ${width} ${height}`;
  const interactions = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : ({clientX, clientY}) => {
      if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
      setDraw([])
    },
    onMouseMove : ({clientX, clientY}) => draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY]),
  }

  const handleClear = event => {
    event.preventDefault();
    console.log('handleClear')
    setPoints([]);
    setDraw([]);
  };

  const handleUndo = event => {
    event.preventDefault();
    console.log('handleUndo')
    setPoints(pts => pts.slice(0, pts.length - 1));
    setDraw([]);
  };

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
    renderFlattenPoints(toPointsList);
  }

  return (
    <main style={{height}}>
      <svg viewBox={viewBox} style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}} {...interactions} >
        <g stroke="#000" fill="none">
          {points.map( (line, key) => <polygon points={line} key={key} />)}
          {draw.length >= 4 && <polygon onClick={console.log} points={draw} strokeDasharray={[1,8]}/>}
        </g>
        <g stroke="#234" fill="none">
          <polygon points={flattenPoints} />
        </g>
      </svg>
      <pre className="absolute" style={{top: 0, zIndex:10, position:'absolute', display:'block'}}>
        <Button onClick={handleClear} variant="secondary" size="sm">clear</Button>
        <Button onClick={handleUndo} variant="secondary" size="sm">undo</Button>
        
        <Button onClick={() => setTool(TOOL.Move)} variant={tool === TOOL.Move ? "primary" : "secondary"} size="sm">move</Button>
        <Button onClick={() => setTool(TOOL.Edit)} variant={tool === TOOL.Edit ? "primary" : "secondary"} size="sm">edit</Button>
        <Button onClick={() => setTool(TOOL.Delete)} variant={tool === TOOL.Delete ? "primary" : "secondary"} size="sm">delete</Button>
        <Button onClick={() => setTool(TOOL.Select)} variant={tool === TOOL.Select ? "primary" : "secondary"} size="sm">select</Button>
        <Button onClick={() => setTool(TOOL.Draw)} variant={tool === TOOL.Draw ? "primary" : "secondary"} size="sm">draw</Button>
        <Button onClick={() => setShape(SHAPE.Line)} variant={shape === SHAPE.Line ? "primary" : "secondary"} size="sm">line</Button>
        <Button onClick={() => setShape(SHAPE.Trinagle)} variant={shape === SHAPE.Trinagle ? "primary" : "secondary"} size="sm">trinagle</Button>
        <Button onClick={() => setShape(SHAPE.Box)} variant={shape === SHAPE.Box ? "primary" : "secondary"} size="sm">box</Button>
        <Button onClick={() => setShape(SHAPE.Circle)} variant={shape === SHAPE.Circle ? "primary" : "secondary"} size="sm">circle</Button>

        {/* <Button onClick={handFlattenTest} variant="secondary" size="sm">Flatten test</Button> */}
      </pre>
    </main>
  )
}

export const Tool = ({type, icon}) => (
  <div data-type={type} data-icon={icon} />
)

export const ToolBar = ({state, army}) => (
  <section>
    <Tool type={TOOL.Delete} icon={TOOL.Delete} />
    <Tool type={TOOL.Draw} icon={TOOL.Delete} />
    <Tool type={TOOL.Edit} icon={TOOL.Edit} />
    <Tool type={TOOL.Move} icon={TOOL.Move} />
    <Tool type={TOOL.Select} icon={TOOL.Select} />
    <Tool type={TOOL.Undo} icon={TOOL.Undo} />
  </section>
);