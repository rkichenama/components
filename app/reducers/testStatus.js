import initial from '../store/state';

export const testStatus = (state = initial.testStatus, action) => {
  // there should be nothing that changes
  return state;
};
