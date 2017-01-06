import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import AdService from '../../../services/AdService';

// get
export const AD_GET_REQUEST = 'ad/get/request';
export const AD_GET_SUCCESS = 'ad/get/succes';
export const AD_GET_ERROR = 'ad/get/error';

export const adGetRequest = createAction(AD_GET_REQUEST, (id) => {
  return (dispatch, getState) => {
    const adService = new AdService(dispatch, getState());
    adService.read(id, {
      SUCCESS: AD_GET_SUCCESS,
      ERROR: AD_GET_ERROR
    });
  };
});

// create
export const AD_CREATE_REQUEST = 'ad/create/request';
export const AD_CREATE_SUCCESS = 'ad/create/succes';
export const AD_CREATE_ERROR = 'ad/create/error';

export const adCreateRequest = createAction(AD_CREATE_REQUEST, (adData) => {
  return (dispatch, getState) => {
    const adService = new AdService(dispatch, getState());
    return adService.create(adData, {
      SUCCESS: AD_CREATE_SUCCESS,
      ERROR: AD_CREATE_ERROR
    }).then((ad) => {
      dispatch(push(`/ads/edit/${ad.id}`));
    });
  };
});

// edit
export const AD_EDIT_REQUEST = 'ad/edit/request';
export const AD_EDIT_SUCCESS = 'ad/edit/succes';
export const AD_EDIT_ERROR = 'ad/edit/error';

export const adEditRequest = createAction(AD_EDIT_REQUEST, (id, adData) => {
  return (dispatch, getState) => {
    const adService = new AdService(dispatch, getState());
    return adService.update(id, adData, {
      SUCCESS: AD_EDIT_SUCCESS,
      ERROR: AD_EDIT_ERROR
    });
  };
});

// list
export const AD_LIST_REQUEST = 'ad/list/request';
export const AD_LIST_SUCCESS = 'ad/list/succes';
export const AD_LIST_ERROR = 'ad/list/error';

export const adListRequest = createAction(AD_LIST_REQUEST, (data) => {
  return (dispatch, getState) => {
    const adService = new AdService(dispatch, getState());
    return adService.list(data, {
      SUCCESS: AD_LIST_SUCCESS,
      ERROR: AD_LIST_ERROR
    });
  };
});

// list
export const AD_ANALYTICS_REQUEST = 'ad/analytics/request';
export const AD_ANALYTICS_SUCCESS = 'ad/analytics/succes';
export const AD_ANALYTICS_ERROR = 'ad/analytics/error';

export const adAnalyticsRequest = createAction(AD_ANALYTICS_REQUEST, () => {
  return (dispatch, getState) => {
    const adService = new AdService(dispatch, getState());
    return adService.analytics({
      SUCCESS: AD_ANALYTICS_SUCCESS,
      ERROR: AD_ANALYTICS_ERROR
    });
  };
});

export default {
  adGetRequest,
  adCreateRequest,
  adEditRequest,
  adListRequest
};
