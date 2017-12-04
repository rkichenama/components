import initial from '../store/state.json';

export const keys = (state = initial.keys, action) => {
  // there should be nothing that changes
  return state;
};
