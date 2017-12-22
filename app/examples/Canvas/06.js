import React, { Component } from 'react';
import { Stage, shadeColor } from '../';
import Canvas, {
  Clear, FilledRect, BorderedRect, Rect, Circle
} from 'components/Canvas/Canvas';
import StateDecorator from 'components/StateDecorator/StateDecorator';

const shiftCoords = (a, b) => ({
  x: (a.x + b.x),
  y: (a.y + b.y),
  z: ((a.z || 0) + (b.z || 0)),
});

const center = {x: 100, y: 100, z: 0};
const sideX = 36 * 2, sideY = 18 * 2;
const clr = '#ff3333';

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
    .style.fill(shadeColor(clr, -.3)).paint()
    // .stroke()
    .end();
  // right
  context.begin()
    .moveTo(D)
    .lineTo(H)
    .lineTo(G)
    .lineTo(C)
    .lineTo(D)
    .style.fill(shadeColor(clr, .3)).paint()
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
    .style.fill(shadeColor(clr, .3)).paint()
    // .stroke()
    .end();
  // back right
  context.begin()
    .moveTo(B)
    .lineTo(F)
    .lineTo(G)
    .lineTo(C)
    .lineTo(B)
    .style.fill(shadeColor(clr, -.3)).paint()
    // .stroke()
    .end();
};

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} style={{ backgroundColor: '#fff' }} scene={[
          Clear(),
          box(sideX * (1.8), sideY * (1.8)),
          insetBox(sideX * (1.6), sideY * (1.6)),
          box(sideX * (1.4), sideY * (1.4)),
          insetBox(sideX * (1.2), sideY * (1.2)),
          box(sideX * (1.0), sideY * (1.0)),
          insetBox(sideX * (.8), sideY * (.8)),
          box(sideX * (.6), sideY * (.6)),
          insetBox(sideX * (.4), sideY * (.4)),
          box(sideX * (.2), sideY * (.2)),
          insetBox(sideX * (.0), sideY * (.0)),
        ]} />
      </Stage>
    );
  }
}
