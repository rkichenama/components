export default {
  inOut: {
    cubic (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 3) : Math.pow(t - 2, 3) + 2;
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}));
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}));
    },
    quad (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 2) : -1 * ((t - 1) * (t - 3) - 1);
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}));
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}));
    },
    quart (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 4) : -1 * (Math.pow(t - 2, 4) - 2);
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}));
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}));
    },
    quint (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 5) : (Math.pow(t - 2, 4) + 2);
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}));
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}));
    },
    sine (x, t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    expo (x, t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circ (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    elastic (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4 } else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    back (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
  },
};
