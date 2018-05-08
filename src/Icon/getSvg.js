const getWrappingHTML = element => {
  if (element && element.nodeName) {
    const elm = element.cloneNode(true);
    elm.removeAttribute('id');
    const div = document.createElement('div');
    div.appendChild(elm);
    return div.innerHTML;
  }
  return '';
};
const parser = new window.DOMParser();
const domParse = content => {
  const svg = parser.parseFromString(content, 'image/svg+xml');
  return (svg && svg.documentElement) || '';
};
const compose = (parser, unwrap) => content => unwrap(parser(content));
const getSvg = compose(domParse, getWrappingHTML);
export default getSvg;
