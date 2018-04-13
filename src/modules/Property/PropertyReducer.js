// Initial State
const initialState = {
  form: {},
  errors: []
};

const PropertyReducer = (state = initialState, action) => {
  const { type, ...values } = action

  switch (type) {
    case 'OWNER_FORM':
      return {
        ...state,
        form: values
      }
    case 'FORM_ERRORS':
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state;
  }
};

// Export Reducer
export default PropertyReducer;
