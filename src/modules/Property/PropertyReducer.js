// Initial State
const initialState = {
  propertyType: []
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROPERTY_TYPE':
      return {
        ...state,
        propertyType: action.propertyType
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
// export const getPropertyType = state => state.property.propertyType;

export const getPropertyType = state => state.property.propertyType.map(propertyType => propertyType.name)

// Export Reducer
export default PropertyReducer;
