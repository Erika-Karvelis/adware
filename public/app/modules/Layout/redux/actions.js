import { createAction } from 'redux-actions';

// notification
export const NOTIFICATION_SHOW = 'layout/notification/show';
export const NOTIFICATION_HIDE = 'layout/notification/hide';

export const showNotification = createAction(NOTIFICATION_SHOW, (type, message) => ({
  type,
  message
}));
export const hideNotification = createAction(NOTIFICATION_HIDE);

export default {
  showNotification,
  hideNotification,
};
