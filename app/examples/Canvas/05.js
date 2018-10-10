import React, { Component } from 'react';
import { Stage, shadeColor, easings } from '../';
import Canvas, { Clear } from 'components/Canvas/Canvas';
import StateDecorator from 'components/StateDecorator/StateDecorator';

const shiftCoords = (a, b) => ({
  x: (a.x + b.x),
  y: (a.y + b.y),
  z: ((a.z || 0) + (b.z || 0)),
});

const center = {x: 100, y: 100, z: 0};

const sideX = 36 * 2, sideY = 18 * 2;
const clr = '#ff3333';

const draw3DBox = ([A, B, C, D, E, F, G, H]) => ({ context }) => {
  const l2r = shadeColor(clr, -.3), r2l = shadeColor(clr, .3);
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
};

/*
  startingPoints : array of {x, y} points, used with drawFn in order as points
  endingPoints : destination for above
  frames : the total number of frames between startingPoints to endingPoints, inclusive
  drawFn : points => ({ context }) => {}
*/
function FrameFactory (startingPoints, endingPoints, drawFn, frames = 60) {
  const changes = endingPoints.map((end, p) => ({
    x: end.x - startingPoints[p].x, y: end.y - startingPoints[p].y
  }));
  // to be inclusive of the start and end, its +1 the frames
  return Array(frames + 1).fill(false).map((_, f) => (
    drawFn(easings.inOut.quad(f, startingPoints, changes, frames))
  ));
}

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

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} style={{ backgroundColor: '#fff' }}
          scene={[ Clear() ]} sequence={FrameFactory(starts, ends, draw3DBox, 90)} />
      </Stage>
    );
  }
}
