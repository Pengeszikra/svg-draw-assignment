import Flatten from '@flatten-js/core'; 

test ('explore Flatten import', () => {
  expect (
    Flatten
  ).toMatchSnapshot();
});

test ('line intersection', () => {
  const {segment} = Flatten;
  let s1 = segment(10,10,200,200);
  let s2 = segment(10,160,200,30);
  
  let ip = s1.intersect(s2);
  

  expect (
    ip
  ).toMatchSnapshot();
});


