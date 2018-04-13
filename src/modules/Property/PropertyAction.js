import callApi from '../../utils/callApi';

export function storePropertyData(property) {
  return {
    type: 'PROPERTY',
    property,
  };
}

export function fetchPropertyData(dispatch) {
  return () => {
    const prefetch = callApi('property/getPropertyData')

    prefetch.then(res => {
      dispatch(storePropertyData(res))
    });

    dispatch({
      type: 'ADD_PREFETCH',
      prefetch,
    })
  }
}

export const storePropertyForm = (form) => {
  return {
    type: 'OWNER_FORM',
    ...form
  };
}

export const storePropertyFormErrors = (errors) => {
  return {
    type: 'FORM_ERRORS',
    errors: errors
  };
}