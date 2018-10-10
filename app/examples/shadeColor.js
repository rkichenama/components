export default (color, percent) => {
  const f = parseInt(color.slice(1),16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent;
  const [R, G, B] = [f >> 16, f >> 8 & 0x00FF, f & 0x0000FF]
    .map(d => Math.round((t - d) * p) + d);

  const RGB = (0x1000000 + (R * 0x10000) + (G * 0x100) + B).toString(16);
  return `#${RGB.substring(1)}`;
};
