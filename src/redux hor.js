const UNDO = 'app:state:undo';
const REDO = 'app:state:redo';

export default reducer => {
  const _state = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };
  const isMyActionType = new RegExp(`^(${UNDO}|${REDO})$`);

  return (state = _state.present, action) => {
    if (isMyActionType.test(action.type)) {
      const [target, destination] =
        (UNDO === action.type) ? ['past', 'future'] : ['future', 'past'];
      const [newPresent, ...others] = _state[target];
      // adjust the history state
      _state[target] = others;
      _state[destination] = [(_state.present), ...(_state[destination])];
      _state.present = newPresent;
      // return the new current state
      return newPresent;
    }

    const present = reducer(state, action);

    if (present === state) { return state }
    // alter history to track changes
    _state.past = [state, ...(_state.past)];
    _state.future = []; // remove future states since this action breaks history
    _state.present = present;
    return present;
  }
}