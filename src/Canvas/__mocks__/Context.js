export default canvas => {
  console.log('mock');
  const mock = {
    clear: () => { return mock; },
    rect: {
      clear: (x = 0, y = 0, w = width, h = height) => { return mock; },
      fill: ({x, y, w, h}) => { return mock; },
      stroke: ({x, y, w, h}) => { return mock; },
    },
    style: {
      fill: style => { return mock; },
      stroke: style => { return mock; },
    },
    paint: () => { return mock; },
    fill: () => mock.paint(),
    outline: () => { return mock; },
    stroke: () => mock.outline(),
    begin: () => { return mock; },
    arc: ({x, y}, r, {from, to}) => { return mock; },
    moveTo: ({x, y}) => { return mock; },
    lineTo: ({x, y}) => { return mock; },
    end: () => { return mock; },
    // not chainable
    gradient: {
      // add your own color stops
      linear: ({x: x1, y: y1} = firstPixel, {x: x2, y: y2} = lastPixel) => {},
      radial: ({x: x1, y: y1} = firstPixel, r1 = Math.min(width, height) / 2, {x: x2, y: y2} = lastPixel, r2 = Math.min(width, height) / 2) => {},
    },
  };
  return mock;
};
