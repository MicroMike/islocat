// Initial State
const initialState = {
  propertyType: [],
  propertyInfo: [],
  propertyOptions: [],
  buildingOptions: [],
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROPERTY':
      return action.property
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
// export const getPropertyType = state => state.property.propertyType;

export const getPropertyType = state => state.property.propertyType.map(propertyType => propertyType.name)
export const getPropertyInfo = state => state.property.propertyInfo.map(propertyInfo => propertyInfo.name)
export const getPropertyOptions = state => state.property.propertyOptions.map(propertyOptions => propertyOptions.name)
export const getBuildingOptions = state => state.property.buildingOptions.map(buildingOptions => buildingOptions.name)

// Export Reducer
export default PropertyReducer;
