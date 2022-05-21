import {FC} from 'react';
import { SVGDraw } from './SVGDraw';

const mainStyle = {
  display:'flex', 
  background: '#234', 
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
};

const fillStyle = {
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
}

export const DualTest:FC = () => {
  return (
    <main style={mainStyle}>
      {/* <div style={fillStyle}><SVGDraw /></div> */}
      <div style={fillStyle}><SVGDraw /></div>
    </main>
  );
}