// Initial State
const initialState = [];

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROPERTY_TYPE':
      return action.propertyType
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPropertyType = state => state.property;

// Export Reducer
export default PropertyReducer;
