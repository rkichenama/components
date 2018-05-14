/* eslint-disable camelcase */
const padNums = (str, isNum = !/string/.test(typeof str)) => (
  isNum
    ? `${str}`.padStart(2, '0')
    : str
);
const PascalCase = str => padNums(str).split(/\W/).map(w => `${w[0].toUpperCase()}${w.slice(1)}`).join('');
const snake_case = str => padNums(str).toLowerCase().split(/\W/).join('_');

module.exports = {
  helpers: {
    PascalCase,
    snake_case,
    'style-case': str => padNums(str).toLowerCase().split(/\W/).join('-'),
    mixedCase: str => {
      const pascal = PascalCase(padNums(str));
      return `${pascal[0].toLowerCase()}${pascal.slice(1)}`;
    },
  }
};
/* eslint-disable camelcase */
