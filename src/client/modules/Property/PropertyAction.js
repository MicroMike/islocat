import callApi from '../../util/apiCaller';

export function storePropertyType(propertyType) {
  return {
    type: 'PROPERTY_TYPE',
    propertyType,
  };
}

export function fetchPropertyType() {
  return (dispatch) => {
    return callApi('property/getPropertyType').then(res => {
      dispatch(storePropertyType(res.propertyType))
    });
  };
}