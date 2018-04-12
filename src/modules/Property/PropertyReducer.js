// Initial State
// const initialState = {};

const PropertyReducer = (state = {}, action) => {
  const { type, ...values } = action
  switch (type) {
    case 'OWNER_FORM':
      return {
        ...state,
        ...values
      }
    default:
      return state;
  }
};

// Export Reducer
export default PropertyReducer;
