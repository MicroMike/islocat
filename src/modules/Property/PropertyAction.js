import callApi from '../../utils/callApi';

export function storePropertyType(propertyType) {
  return {
    type: 'PROPERTY_TYPE',
    propertyType,
  };
}

export function fetchPropertyType(dispatch) {
  return () => {
    const prefetch = callApi('property/getPropertyType')

    prefetch.then(res => {
      dispatch(storePropertyType(res.propertyType))
    });

    dispatch({
      type: 'ADD_PREFETCH',
      prefetch,
    })
  }
}
