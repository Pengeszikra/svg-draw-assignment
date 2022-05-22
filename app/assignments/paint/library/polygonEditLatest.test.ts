/*

[1,2] -> [1, 2, x, y]
[1, 2, _, _] -> [1, 2, x, y]
[1, 2, 3, 4] -> [1, 2, 3, 4, x, y, 1, 2]
[1, 2, 3, 4, 1, 2] -> [1, 2, 3, 4, x, y, 1, 2]
[1, 2, 3, 4, 5, 6, 1, 2] -> [1, 2, 3, 4, x, y, 1, 2]
[1, 2, 3, 4, 5, 6, 7, 8, 1, 2] -> [1, 2, 3, 4, 5, 6, x, y, 1, 2]

*/

import { polygonEditLatest } from "./polygonEditLatest";

const mockSetDraw = list => list;
const mockDrawingLine = polygonEditLatest(mockSetDraw);
const nexEventPosition = {clientX:33, clientY: 55};
const {clientX:cx, clientY:cy} = nexEventPosition;

test ('polygonEditLatest - first dot done', () => {  
  expect (
    mockDrawingLine(nexEventPosition)(
      [1, 2]
    )
  ).toStrictEqual(
    [1, 2, cx, cy]
  );
});

test ('polygonEditLatest - moving 2nd dot', () => {  
  expect (
    mockDrawingLine(nexEventPosition)(
      [1, 2, 4, 5]
    )
  ).toStrictEqual(
    [1, 2, cx, cy]
  );
});

test ('slice - 4', () => {
  const list = [3, 4, 5, 6, 7, 8];
  expect (
    list.slice(0, list.length - 4)
  ).toStrictEqual(
    [3, 4]
  );
});

test ('polygonEditLatest - moving 3rd dot', () => {  
  expect (
    mockDrawingLine(nexEventPosition)(
      [1, 2, 3, 4, 5, 6, 7, 8]
    )
  ).toStrictEqual(
    [1, 2, 3, 4, cx, cy, 1, 2]
  );
});

test ('polygonEditLatest - moving 4th dot', () => {  
  expect (
    mockDrawingLine(nexEventPosition)(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    )
  ).toStrictEqual(
    [1, 2, 3, 4, 5, 6, cx, cy, 1, 2]
  );
});

