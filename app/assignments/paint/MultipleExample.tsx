import {FC} from 'react';
import { SVGDraw } from './SVGDraw';
import './styles/dual.scss';

export const MultipleExample:FC = ({amount = 1}) => {
  
  const containerKeys = Array(amount).fill(0).map((_, i:number) => i + 1);

  return (
    <main className="dual-main" data-amount={amount}>
      {containerKeys.map(key => <div key={key} data-key={key} className="dual-window"><SVGDraw /></div>)}
    </main>
  );
}