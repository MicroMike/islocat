// Initial State
const initialState = {
  form: {},
  errors: [],
  step: 1
};

const PropertyReducer = (state = initialState, action) => {
  const { type, ...values } = action

  switch (type) {
    case 'OWNER_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...values
        }
      }
    case 'FORM_ERRORS':
      return {
        ...state,
        errors: action.errors
      }
    case 'OWNER_FORM_STEP':
      return {
        ...state,
        step: action.step
      }
    default:
      return state;
  }
};

// Export Reducer
export default PropertyReducer;
