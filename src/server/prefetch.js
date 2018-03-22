export const PrefetchReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PREFETCH':
      console.log('ADD_PREFETCH : ' + action)
      return [
        ...state,
        action.prefetch
      ]
    default:
      return state;
  }
};
