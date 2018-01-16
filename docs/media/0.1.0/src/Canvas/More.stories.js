/* */
import React, { Component } from 'react';
import '../global.scss';
import Canvas, { Clear, FilledRect, BorderedRect, Rect, Circle } from './Canvas';
import { storiesOf } from  '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';
import Centered from '../../storybook/Centered';

const stories = storiesOf('Canvas/more', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

const shadeColor2 = (color, percent) => {
  var f = parseInt(color.slice(1),16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16, G = f >> 8&0x00FF, B = f&0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};
// const blendColors = (c0, c1, p) => {
//   var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
//   return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
// };
const shiftCoords = (a, b) => ({
  x: (a.x + b.x),
  y: (a.y + b.y)
});
const center = {x: 150, y: 150};
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

stories
  .add('layered cubes',
    () => (
      <Canvas scene={[
        Clear(),
        // tiled,
        box(sideX * (1.8), sideY * (1.8)),
        insetBox(sideX * (1.6), sideY * (1.6)),
        box(sideX * (1.4), sideY * (1.4)),
        insetBox(sideX * (1.2), sideY * (1.2)),
        box(sideX * (1.0), sideY * (1.0)),
        insetBox(sideX * (.8), sideY * (.8)),
        box(sideX * (.6), sideY * (.6)),
        insetBox(sideX * (.4), sideY * (.4)),
        box(sideX * (.2), sideY * (.2)),
      ]}/>
    )
  )
