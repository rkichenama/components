import { pipe } from '../shared/functions';

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
