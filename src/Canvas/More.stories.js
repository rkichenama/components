/* */
import React, { Component } from 'react';
import '../global.scss';
import Canvas, { Clear, FilledRect, BorderedRect, Rect, Circle } from './Canvas';
import { storiesOf } from  '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';

const stories = storiesOf('Atomic/Canvas/more', module);
stories.addDecorator(withKnobs);

const shadeColor2 = (color, percent) => {
  const f = parseInt(color.slice(1),16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent;
  const [R, G, B] = [f >> 16, f >> 8 & 0x00FF, f & 0x0000FF]
    .map(d => Math.round((t - d) * p) + d);

  const RGB = (0x1000000 + (R * 0x10000) + (G * 0x100) + B).toString(16)
  return `#${RGB.substring(1)}`
};
// const blendColors = (c0, c1, p) => {
//   var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
//   return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
// };
const shiftCoords = (a, b) => ({
  x: (a.x + b.x),
  y: (a.y + b.y),
  z: ((a.z || 0) + (b.z || 0)),
});
const center = {x: 150, y: 150, z: 0};
const sideX = 64 * 2, sideY = 32 * 2;
const sideZ = .612 * sideY;
const box = (X = sideX, Y = sideY, Z = 2 * .612 * Y) => ({ context }) => {
  const bottom = shiftCoords(center, {x: 0, y: Z});
  const top = shiftCoords(center, {x: 0, y: 0});
  const [A, B, C, D, E, F, G, H] = [
    shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
    shiftCoords(bottom, {x: 0, y: -Y}),
    shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
    shiftCoords(bottom, {x: 0, y: 0}),
    shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),
    shiftCoords(top,    {x: 0, y: -Y}),
    shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
    shiftCoords(top,    {x: 0, y: 0}),
  ];
  const clr = '#5E99DB';
  // top
  context.begin()
    .moveTo(E)
    .lineTo(F)
    .lineTo(G)
    .lineTo(H)
    .lineTo(E)
    .style.fill(clr).paint()
    // .stroke()
    .end();
  // left
  context.begin()
    .moveTo(A)
    .lineTo(E)
    .lineTo(H)
    .lineTo(D)
    .lineTo(A)
    .style.fill(shadeColor2(clr, -.3)).paint()
    // .stroke()
    .end();
  // right
  context.begin()
    .moveTo(D)
    .lineTo(H)
    .lineTo(G)
    .lineTo(C)
    .lineTo(D)
    .style.fill(shadeColor2(clr, .3)).paint()
    // .stroke()
    .end();
};
const insetBox = (X = sideX, Y = sideY, Z = 2 * .612 * Y) => ({ context }) => {
  const bottom = shiftCoords(center, {x: 0, y: Z});
  const top = shiftCoords(center, {x: 0, y: 0});
  const [A, B, C, D, E, F, G, H] = [
    shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
    shiftCoords(bottom, {x: 0, y: -Y}),
    shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
    shiftCoords(bottom, {x: 0, y: 0}),
    shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),
    shiftCoords(top,    {x: 0, y: -Y}),
    shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
    shiftCoords(top,    {x: 0, y: 0}),
  ];
  const clr = '#5E99DB';
  // bottom
  context.begin()
    .moveTo(A)
    .lineTo(B)
    .lineTo(C)
    .lineTo(D)
    .lineTo(A)
    .style.fill(clr).paint()
    // .stroke()
    .end();
  // back left
  context.begin()
    .moveTo(A)
    .lineTo(E)
    .lineTo(F)
    .lineTo(B)
    .lineTo(A)
    .style.fill(shadeColor2(clr, .3)).paint()
    // .stroke()
    .end();
  // back right
  context.begin()
    .moveTo(B)
    .lineTo(F)
    .lineTo(G)
    .lineTo(C)
    .lineTo(B)
    .style.fill(shadeColor2(clr, -.3)).paint()
    // .stroke()
    .end();
};

const tiled = ({ context }) => {

  for ( let y = 0; y < 380; y += (sideY / 2)) {
    for ( let x = 0; x < 300; x += sideX) {
      const c = {x, y};
      const [A, B, C, D] = [
        shiftCoords(c, {x: -(sideX / 2), y: 0}),
        shiftCoords(c, {x: 0, y: -(sideY / 2)}),
        shiftCoords(c, {x: (sideX / 2), y: 0}),
        shiftCoords(c, {x: 0, y: (sideY / 2)}),
      ];
      context.begin()
        .moveTo(A)
        .lineTo(B)
        .lineTo(C)
        .lineTo(D)
        .lineTo(A)
        .style.fill('#5E99DB').fill()
        .style.stroke('black').outline()
        .end();
    }
    y += (sideY / 2);
    for ( let x = (sideX / 2); x < (300 + (sideX / 2)); x += sideX) {
      const c = {x, y};
      const [A, B, C, D] = [
        shiftCoords(c, {x: -(sideX / 2), y: 0}),
        shiftCoords(c, {x: 0, y: -(sideY / 2)}),
        shiftCoords(c, {x: (sideX / 2), y: 0}),
        shiftCoords(c, {x: 0, y: (sideY / 2)}),
      ];
      context.begin()
        .moveTo(A)
        .lineTo(B)
        .lineTo(C)
        .lineTo(D)
        .lineTo(A)
        .style.fill('#5E99DB').fill()
        .style.stroke('black').outline()
        .end();
    }
  }
};

// startingPoints : array of {x, y} points, used with drawFn in order as points
// endingPoints : destination for above
// frames : the total number of frames between startingPoints to endingPoints, inclusive
// drawFn : points => ({ context }) => {}
function FrameFactory (startingPoints, endingPoints, drawFn, frames = 60) {
  const changes = endingPoints.map((end, p) => ({
    x: end.x - startingPoints[p].x, y: end.y - startingPoints[p].y
  }));
  // to be inclusive of the start and end, its +1 the frames
  return Array(frames + 1).fill(false).map((_, f) => (
    drawFn(easings.inOut.quad(f, startingPoints, changes, frames))
  ));
}
const easings = {
  inOut: {
    cubic: function (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 3) : Math.pow(t - 2, 3) + 2;
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}))
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}))
    },
    quad (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 2) : -1 * ((t - 1) * (t - 3) - 1);
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}))
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}))
    },
    quart: function (f, B, C, d) {
      const t = f / (d / 2);
      const time = (t < 1) ? Math.pow(t, 4) : -1 * (Math.pow(t - 2, 4) - 2);
      const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}))
      return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}))
    },
  },
  easeInOutQuint: function (f, B, C, d) {
    const t = f / (d / 2);
    const time = (t < 1) ? Math.pow(t, 5) : (Math.pow(t - 2, 4) + 2);
    const change = C.map(({x, y}) => ({x: (x / 2) * time, y: (y / 2) * time}))
    return B.map(({x, y}, p) => ({x: x + change[p].x, y: y + change[p].y}))
	},
  easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
  easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	},
};

let X = sideX, Y = sideY, Z = 2 * .612 * Y;
const bottom = shiftCoords(center, {x: 0, y: Z});
const top = shiftCoords(center, {x: 0, y: 0});
const starts = [
  /* A */shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
  /* B */shiftCoords(bottom, {x: 0, y: -Y}),
  /* C */shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
  /* D */shiftCoords(bottom, {x: 0, y: 0}),

  /* E */shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),
  /* F */shiftCoords(top,    {x: 0, y: -Y}),
  /* G */shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
  /* H */shiftCoords(top,    {x: 0, y: 0}),
];
const ends = [
  /* F */shiftCoords(top,    {x: 0, y: -Y}),
  /* B */shiftCoords(bottom, {x: 0, y: -Y}),
  /* A */shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
  /* E */shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),

  /* G */shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
  /* C */shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
  /* D */shiftCoords(bottom, {x: 0, y: 0}),
  /* H */shiftCoords(top,    {x: 0, y: 0}),
];
const draw3DBox = ([A, B, C, D, E, F, G, H]) => ({ context }) => {
  const clr = '#5E99DB', l2r = shadeColor2(clr, -.3), r2l = shadeColor2(clr, .3);
  // left rear
  context.begin().moveTo(A).lineTo(B).lineTo(F).lineTo(E).lineTo(A)
    .style.fill(r2l).paint()
    .end();
  // right rear
  context.begin().moveTo(B).lineTo(C).lineTo(G).lineTo(F).lineTo(B)
    .style.fill(l2r).paint()
    .end();
  // bottom
  context.begin().moveTo(A).lineTo(B).lineTo(C).lineTo(D).lineTo(A)
    .style.fill(clr).paint()
    .end();
  // left front
  context.begin().moveTo(A).lineTo(E).lineTo(H).lineTo(D).lineTo(A)
    .style.fill(l2r).paint()
    .end();
  // right front
  context.begin().moveTo(D).lineTo(H).lineTo(G).lineTo(C).lineTo(D)
    .style.fill(r2l).paint()
    .end();
  // top
  context.begin().moveTo(E).lineTo(F).lineTo(G).lineTo(H).lineTo(E)
    .style.fill(clr).paint()
    .end();
}

const outline3DBox = (multiplier = 1.0, X = sideX, Y = sideY, Z = 2 * .612 * Y) => ({ context }) => {
  for (let m = multiplier; m > 0; m -= .4) {
    const bottom = shiftCoords(center, {x: 0, y: Z});
    const top = shiftCoords(center, {x: 0, y: 0});
    const starts = [
      /* A */shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
      /* B */shiftCoords(bottom, {x: 0, y: -Y}),
      /* C */shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
      /* D */shiftCoords(bottom, {x: 0, y: 0}),

      /* E */shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),
      /* F */shiftCoords(top,    {x: 0, y: -Y}),
      /* G */shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
      /* H */shiftCoords(top,    {x: 0, y: 0}),
    ];
    const ends = [
      /* F */shiftCoords(top,    {x: 0, y: -Y}),
      /* B */shiftCoords(bottom, {x: 0, y: -Y}),
      /* A */shiftCoords(bottom, {x: -(X / 2), y: -(Y / 2)}),
      /* E */shiftCoords(top,    {x: -(X / 2), y: -(Y / 2)}),

      /* G */shiftCoords(top,    {x: (X / 2), y: -(Y / 2)}),
      /* C */shiftCoords(bottom, {x: (X / 2), y: -(Y / 2)}),
      /* D */shiftCoords(bottom, {x: 0, y: 0}),
      /* H */shiftCoords(top,    {x: 0, y: 0}),
    ];

  }
};

const T = ({Rx, Ry, Rz}) => ({x, y, z = 0}) => {
  const [sx, cx, sy, cy, sz, cz] = [Rx, Ry, Rz]
    .map(angle => ([Math.sin(angle), Math.cos(angle)]))
    .reduce((t, c) => ([...t, ...c]), []);
  const a = x * cy - (z * cx - y * sx) * sy;
  const b = y * cx + z * sx;
  return {
    x: (a * cz) + (b * sz),
    y: (b * cz) - (a * sz),
  }
}

const rad = n => n / 180 * Math.PI;
const id = (_, __, x) => { console.log('ID: ', x); return _; }
function squareT ({Rx = 0, Ry = 0, Rz = 0}) {
  const rotate = T({Rx: rad(Rx), Ry: rad(Ry), Rz: rad(Rz)})
  const points = [
    // bottom
    {x: -75 , y: 0, z: -75 * .612},
    {x: 0, y: -75, z: -75 * .612},
    {x: 75, y: 0, z: -75 * .612},
    {x: 0, y: 75, z: -75 * .612},
    // top
    {x: -75 , y: 0, z: 75 * .612},
    {x: 0, y: -75, z: 75 * .612},
    {x: 75, y: 0, z: 75 * .612},
    {x: 0, y: 75, z: 75 * .612},
  ]
    .map(point => rotate(point))
    .map(point => shiftCoords(center, point));
  return ({ context }) => { context.clear(); draw3DBox(points)({context}); }
  // return ({ context }) => {
  //
  //   context.clear().begin().moveTo(A).lineTo(B).lineTo(C).lineTo(D).lineTo(A)
  //     .style.fill('gray').paint()
  //     .end();
  // };
}

stories
  .add('rotate on angles', () => (
    <Canvas scene={[
      squareT({
        Rx: number('Rx', -60, { range: true, min: -360, max: 360, step: 15 }),
        Ry: number('Ry', 0, { range: true, min: -360, max: 360, step: 15 }),
        Rz: number('Rz', 0, { range: true, min: -360, max: 360, step: 15 }),
      })
    ]} />
  ))
  .add('layered cubes',
    () => (
      <Canvas scene={[
        Clear(),
        // tiled,
        // box(sideX * (1.8), sideY * (1.8)),
        // insetBox(sideX * (1.6), sideY * (1.6)),
        //
        // box(sideX * (1.4), sideY * (1.4)),
        // insetBox(sideX * (1.2), sideY * (1.2)),
        //
        // box(sideX * (1.0), sideY * (1.0)),
        // insetBox(sideX * (.8), sideY * (.8)),
        //
        // box(sideX * (.6), sideY * (.6)),
        // insetBox(sideX * (.4), sideY * (.4)),
        //
        // box(sideX * (.2), sideY * (.2)),
        // insetBox(sideX * (.0), sideY * (.0)),
      ]} sequence={FrameFactory(starts, ends, draw3DBox, 90)} />
    )
  );
