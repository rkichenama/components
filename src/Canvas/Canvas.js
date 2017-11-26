/* */
import { compose } from '../shared/functions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withState, withHandlers,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

import './Canvas.scss';

const Canvas = ({className, setCanvas}) => (
  <canvas
    ref={setCanvas}
    className={`canvas ${className}`}
    width="300"
    height="300">
  </canvas>
);

const enhance = compose(
  setDisplayName('Stateless(Canvas)'),
  setPropTypes({
    className: PropTypes.string,
    sequence: PropTypes.arrayOf(PropTypes.func)
  }),
  defaultProps({
    className: '',
    sequence: [],
  }),
  withState('canvas', 'setCanvas', false),
  lifecycle({
    componentWillReceiveProps (props) {
      if (props.canvas) {
        props.sequence.forEach(step => step(props));
      }
    }
  }),
);

export default enhance(Canvas);

const Context = ({canvas}) => {
  const {width, height} = canvas.getBoundingClientRect();
  const context = canvas.getContext('2d');

  const ctx = {
    clear: () => { ctx.rect.clear(0, 0, width, height); return ctx; },
    rect: {
      clear: (x = 0, y = 0, w = width, h = height) => { context.clearRect(x, y, w, h); return ctx; },
      fill: ({x, y, w, h}) => { context.fillRect(x, y, w, h); return ctx; },
      stroke: ({x, y, w, h}) => { context.strokeRect(x, y, w, h); return ctx; },
    },
    style: {
      fill: style => { context.fillStyle = style; return ctx; },
      stroke: style => { context.strokeStyle = style; return ctx; },
    },
    paint: () => { context.fill(); return ctx; },
    outline: () => { context.stroke(); return ctx; },
    path: {
      begin: () => { context.beginPath(); return ctx; },
      arc: ({x, y}, r, start, end) => { context.arc(x, y, r, start, end); return ctx; },
    },
    end: () => { context.closePath(); return ctx; }
  };
  return ctx;
}

export const Clear = () => props => Context(props).clear();

/* no stroke but fill */
export const FilledRect = (coords, color = 'transparent') => props => {
  const context = Context(props);
  if (color) { context.style.fill(color).paint(); }
  context.rect.fill(coords);
}

/* with stroke no fill*/
export const BorderedRect = (coords, border = 'transparent') => props => {
  let context = Context(props);
  if (border) { context = context.style.stroke(border); }
  context.rect.stroke(coords);
}

export const Rect = (coord, border, color) => props => {
  FilledRect(coord, color)(props);
  BorderedRect(coord, border)(props);
}

export const Circle = (center, radius, color, border) => props => {
  let context = Context(props).path.begin();
  context.path.arc(center, radius, 0, 2 * Math.PI);
  if (color) { context.style.fill(color).paint(); }
  if (border) { context = context.style.stroke(border); }
  context.end();
}

/*
TEXT
  fillText()
  strokeText()
  measureText()

  font
  textAlign
  textBaseline
  direction

lineWidth
lineCap
lineJoin
miterLimit
getLineDash()
setLineDash()
lineDashOffset


GRADIENTS
  createLinearGradient()
  createRadialGradient()
  createPattern()

shadowBlur
shadowColor
shadowOffsetX
shadowOffsetY

beginPath()
closePath()
moveTo()
lineTo()
bezierCurveTo()
quadraticCurveTo()
arc()
arcTo()
ellipse()
rect()

fill()
stroke()
drawFocusIfNeeded()
scrollPathIntoView()
clip()
isPointInPath()
isPointInStroke()

currentTransform
rotate()
scale()
translate()
transform()
setTransform()
resetTransform()

globalAlpha
globalCompositeOperation

drawImage()

createImageData()
getImageData()
putImageData()

imageSmoothingEnabled

save()
restore()

addHitRegion()
removeHitRegion()
clearHitRegions()
 */
