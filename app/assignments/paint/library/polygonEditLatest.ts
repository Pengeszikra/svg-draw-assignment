export const polygonEditLatest = (setList) => ({clientX, clientY}) => (
  setList(
   ([x, y, ...rest]:number[]) => rest.length <= 2
     ? Number.isFinite(x) 
      ? [x, y, clientX, clientY]
      : []
     : [x, y, ...rest.slice(0, rest.length - 4), clientX, clientY, x, y]
  )
);
