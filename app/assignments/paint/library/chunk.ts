export const chunk = block => arr => Array(Math.ceil( arr.length / block)).fill().map( (_,i) => arr.slice(i * block, i * block + block));