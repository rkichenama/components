export default canvas => {
  const { width, height } = canvas.getBoundingClientRect();
  const context = canvas.getContext('2d');
  const firstPixel = { x: 0, y: 0 };
  const lastPixel = { x: width, y: height };
  const ctx = {
    clear: () => { ctx.rect.clear(0, 0, width, height); return ctx },
    rect: {
      clear: (x = 0, y = 0, w = width, h = height) => { context.clearRect(x, y, w, h); return ctx },
      fill: ({x, y, w, h}) => { context.fillRect(x, y, w, h); return ctx },
      stroke: ({x, y, w, h}) => { context.strokeRect(x, y, w, h); return ctx },
    },
    style: {
      fill: style => { context.fillStyle = style; return ctx },
      stroke: style => { context.strokeStyle = style; return ctx },
    },
    paint: () => { context.fill(); return ctx },
    fill: () => ctx.paint(),
    outline: () => { context.stroke(); return ctx },
    stroke: () => ctx.outline(),
    begin: () => { context.beginPath(); return ctx },
    arc: ({x, y}, r, {from, to}) => { context.arc(x, y, r, from, to); return ctx },
    moveTo: ({x, y}) => { context.moveTo(x, y); return ctx },
    lineTo: ({x, y}) => { context.lineTo(x, y); return ctx },
    end: () => { context.closePath(); return ctx },
    // not chainable
    gradient: {
      // add your own color stops
      linear: ({x: x1, y: y1} = firstPixel, {x: x2, y: y2} = lastPixel) => context.createLinearGradient(x1, y1, x2, y2),
      radial: ({x: x1, y: y1} = firstPixel, r1 = Math.min(width, height) / 2, {x: x2, y: y2} = lastPixel, r2 = Math.min(width, height) / 2) => context.createRadialGradient(x1, y1, r1, x2, y2, r2),
    },
  };
  return ctx;
};
