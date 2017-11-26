/* */
import { compose, pipe } from '../shared/functions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withState, withHandlers, withProps,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

import './Canvas.scss';


//TODO: rewrite without recompose since I need state in order to cancle AniFrame
const Canvas = ({className, setCanvas}) => (
  <canvas
    ref={setCanvas}
    className={`canvas ${className}`}
    width="300"
    height="300">
  </canvas>
);

const Context = canvas => {
  const {width, height} = canvas.getBoundingClientRect();
  const context = canvas.getContext('2d');
  const firstPixel = { x: 0, y: 0 };
  const lastPixel = { x: width, y: height };
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
    fill: () => ctx.paint(),
    outline: () => { context.stroke(); return ctx; },
    stroke: () => ctx.outline(),
    begin: () => { context.beginPath(); return ctx; },
    arc: ({x, y}, r, {from, to}) => { context.arc(x, y, r, from, to); return ctx; },
    moveTo: ({x, y}) => { context.moveTo(x, y); return ctx; },
    lineTo: ({x, y}) => { context.lineTo(x, y); return ctx; },
    end: () => { context.closePath(); return ctx; },
    // not chainable
    gradient: {
      // add your own color stops
      linear: ({x: x1, y: y1} = firstPixel, {x: x2, y: y2} = lastPixel) => context.createLinearGradient(x1, y1, x2, y2),
      radial: ({x: x1, y: y1} = firstPixel, r1 = Math.min(width, height) / 2, {x: x2, y: y2} = lastPixel, r2 = Math.min(width, height) / 2) => context.createRadialGradient(x1, y1, r1, x2, y2, r2),
    },
  };
  return ctx;
};

const enhance = compose(
  setDisplayName('Stateless(Canvas)'),
  setPropTypes({
    className: PropTypes.string,
    scene: PropTypes.arrayOf(PropTypes.func),
    sequence: PropTypes.arrayOf(PropTypes.func),
  }),
  defaultProps({
    className: '',
    scene: [],
    sequence: [],
  }),
  pipe(
    withState('canvas', 'setCanvas', false),
    withState('animating', 'setAnim', false),
  ),
  withHandlers({
    animate: props => () => {
      const { scene, sequence: seq } = props;
      const args = {...props, context: Context(props.canvas) };
      let sequence = [...seq];
      const doAnim = () => {
        // draw thee scene
        props.scene.forEach(layer => layer(args));
        debugger;
        // do the next animation step
        if (sequence.length) {
          let [step, ...rest] = sequence;
          step(args);
          // set up animation
          sequence = [...rest, step];
          requestAnimationFrame(doAnim);
        }
      };
      requestAnimationFrame(doAnim);
    }
  }),
  lifecycle({
    componentWillReceiveProps ({scene, sequence, animating}) {
      // if (
      //   (animating !== this.props.animating) &&
      //   (sequence !== this.props.sequence) &&
      //   (scene !== this.props.scene)
      // ) {
      //   this.props.setAnim(false);
      // } else {
      //   this.props.setAnim(true);
      // }
    },
    componentDidUpdate () {
      if (this.props.canvas && !this.props.animating) {
        this.props.animate();
      }
    }
  }),
);

export default enhance(Canvas);


export const Clear = () => ({context}) => context.clear();

/* no stroke but fill */
export const FilledRect = (coords, color = 'transparent') => props => {
  const { context } = props;
  if (color) { context.style.fill(color).paint(); }
  context.rect.fill(coords);
  return props;
};

/* with stroke no fill*/
export const BorderedRect = (coords, border = 'transparent') => props => {
  const { context } = props;
  if (border) { context.style.stroke(border); }
  context.rect.stroke(coords);
  return props;
};

export const Rect = (coord, border, color) => props => {
  return pipe(
    FilledRect(coord, color),
    BorderedRect(coord, border)
  )(props);
};

export const Arc = (center, radius, curve, color, border) => props => {
  const { context } = props;
  context.begin();
  context.arc(center, radius, curve);
  // const grad = context.gradient.linear();
  // grad.addColorStop(0, 'rgba(255,0,0,.1)');
  // grad.addColorStop(.5, 'rgba(0,0,255,.2)');
  // grad.addColorStop(1, 'rgba(255,0,0,.1)');
  // context.style.fill(grad).paint();
  if (color) { context.style.fill(color).paint(); }
  if (border) { context.style.stroke(border); }
  context.end();
  return props;
};

export const Circle = (center, radius, color, border) => props => {
  return Arc(center, radius, {from: 0, to: 2 * Math.PI}, color, border)(props);
};

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
