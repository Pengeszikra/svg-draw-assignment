import {FC} from 'react';
import {Button} from 'react-bootstrap';
import { IDrawComponent } from '../state/draw-declaration';
import { TOOL, SHAPE } from '../state/paintState';

export const ToolBar:FC<IDrawComponent> = ({state, army}) => {
  const {tool, shape} = state;
  const {undoLastDraw, clearAll, setTool, setShape} = army;

  const handleClear = event => {
    event.preventDefault();
    clearAll();
  };

  const handleUndo = event => {
    event.preventDefault();
    undoLastDraw();
  };

  return (
    <section className="absolute" style={{top: 0, zIndex:10, position:'absolute', display:'block'}}>
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
    </section>
  );
}