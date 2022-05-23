import {FC} from 'react';
import { SVGDraw } from './SVGDraw';
import './styles/dual.scss';

export const DualTest:FC = () => {
  return (
    <main className="dual-main">
      <div className="dual-window"><SVGDraw /></div>
      <div className="dual-window"><SVGDraw /></div>
    </main>
  );
}