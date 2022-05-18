import {useEffect, useRef} from 'react';

export const useInteraction = (handlers = {}, dependency= []) => {
  const ref = useRef(null);

  useEffect(  _ => {
    if (!ref.current) return ()=>{};
    const activeEl = ref.current;
    Object.entries(handlers).map(([event, fn]) => activeEl.addEventListener(event, fn));
    return () => Object.entries(handlers).map(([event, fn]) => activeEl.removeEventListener(event, fn));
  }
  , [ref.current, ...dependency]);

  return ref;
};
