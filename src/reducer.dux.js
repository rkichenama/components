import Union from './Union';

const ACTION_A = `ACTION_A`;
const ACTION_B = `ACTION_B`;
const ACTION_C = `ACTION_C`;

// action constants
const Types = [
  ACTION_A,
  ACTION_B,
  ACTION_C,
];

const Reducer = Union(Types);

/**
 * @param {Object} [state={}]
 * @param {Object} { type, payload, error }
 * @returns state reflecting changes from action
 */
export default (state = {}, { type, payload, error }) => {
  if (Types.some(known => known === type)) {
    return Reducer[type]({ state, error, payload }).match({
      [ACTION_A]: ({ state }) => state,
      [ACTION_B]: ({ state, payload }) => ({ ...state, ...payload }),
      [ACTION_B]: ({ error }) => ({ ...error }),
    });
  } else {
    return state;
  }
};

// action creators
export const actionA = () => ({ type: ACTION_A });
export const actionB = payload => ({ type: ACTION_B, payload });
export const actionC = error => ({ type: ACTION_C, error });
