import React, { Component } from 'react';
import { Stage, shadeColor } from '../';
import Canvas, { Clear } from 'components/Canvas/Canvas';
import StateDecorator from 'components/StateDecorator/StateDecorator';

const shiftCoords = (a, b) => ({
  x: (a.x + b.x),
  y: (a.y + b.y),
  z: ((a.z || 0) + (b.z || 0)),
});

const center = {x: 100, y: 100, z: 0};

const draw3DBox = ([A, B, C, D, E, F, G, H]) => ({ context }) => {
  const clr = '#ff3333', l2r = shadeColor(clr, -.3), r2l = shadeColor(clr, .3);
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
};

const rad = n => n / 180 * Math.PI;

function squareT ({Rx = 0, Ry = 0, Rz = 0}) {
  const rotate = T({Rx: rad(Rx), Ry: rad(Ry), Rz: rad(Rz)})
  const points = [
    // bottom
    {x: -50 , y: 0, z: -50 * .612},
    {x: 0, y: -50, z: -50 * .612},
    {x: 50, y: 0, z: -50 * .612},
    {x: 0, y: 50, z: -50 * .612},
    // top
    {x: -50 , y: 0, z: 50 * .612},
    {x: 0, y: -50, z: 50 * .612},
    {x: 50, y: 0, z: 50 * .612},
    {x: 0, y: 50, z: 50 * .612},
  ]
    .map(point => rotate(point))
    .map(point => shiftCoords(center, point));
  return ({ context }) => { context.clear(); draw3DBox(points)({context}) };
}

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} style={{ backgroundColor: '#fff' }} scene={[
          Clear(),
          squareT({ Rx: -60, Ry: 0, Rz: 0 })
        ]} />
      </Stage>
    );
  }
}
