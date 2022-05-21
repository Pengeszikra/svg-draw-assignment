import {FC} from 'react';
import { SVGDraw } from './SVGDraw';

const ONE_HUNDRED = '100%';
const mainStyle = {
  display:'flex', 
  background: '#234', 
  width: ONE_HUNDRED,
  height: ONE_HUNDRED,
  margin: 0,
  padding: 0,
};

export const DualTest:FC = () => {
  return (
    <main style={mainStyle}>
      <SVGDraw />
      <SVGDraw />
    </main>
  );
}