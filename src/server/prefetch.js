export const PrefetchReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PREFETCH':
      return [
        ...state,
        action.prefetch
      ]
    default:
      return state;
  }
};
