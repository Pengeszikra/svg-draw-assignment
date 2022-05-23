import {FC} from 'react';
import {Button} from 'react-bootstrap';
import { IDrawComponent } from '../state/draw-declaration';
import { TOOL, SHAPE } from '../state/paintState';

export const ToolBar:FC<IDrawComponent> = ({state, army}) => {
  const {tool, shape} = state;
  const {undoLastDraw, clearAll, selectTool, selectShape} = army;

  const handleClear = preventEvent(clearAll);

  const handleUndo = preventEvent(undoLastDraw);

  return (
    <section className="absolute" style={{top: 0, zIndex:10, position:'absolute', display:'block'}}>
      <Button onClick={handleClear} variant="secondary" size="sm">clear</Button>
      <Button onClick={handleUndo} variant="secondary" size="sm">undo</Button>

      {/* <Button onClick={() => selectTool(TOOL.Move)} variant={tool === TOOL.Move ? "primary" : "secondary"} size="sm">move</Button> */}
      <Button onClick={() => selectTool(TOOL.Edit)} disabled variant={tool === TOOL.Edit ? "primary" : "secondary"} size="sm">edit</Button>
      <Button onClick={() => selectTool(TOOL.Delete)} disabled variant={tool === TOOL.Delete ? "primary" : "secondary"} size="sm">delete</Button>
      {/* <Button onClick={() => selectTool(TOOL.Select)} variant={tool === TOOL.Select ? "primary" : "secondary"} size="sm">select</Button> */}
      <Button onClick={() => selectTool(TOOL.Draw)} variant={tool === TOOL.Draw ? "primary" : "secondary"} size="sm">draw</Button>
      <Button onClick={() => {selectShape(SHAPE.Line); selectTool(TOOL.Draw)}} variant={shape === SHAPE.Line && tool === TOOL.Draw ? "primary" : "secondary"} size="sm">line</Button>
      <Button onClick={() => {selectShape(SHAPE.Trinagle); selectTool(TOOL.Draw)}} variant={shape === SHAPE.Trinagle && tool === TOOL.Draw ? "primary" : "secondary"} size="sm">trinagle</Button>
      <Button onClick={() => {selectShape(SHAPE.Box); selectTool(TOOL.Draw)}} variant={shape === SHAPE.Box && tool === TOOL.Draw ? "primary" : "secondary"} size="sm">box</Button>
    </section>
  );
}

export const preventEvent = action => event => {
  event.preventDefault();
  action();
}