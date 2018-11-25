import { NotificationManager } from 'react-notifications';

export const createNotification = (type, message) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message);
      break;
    case 'success':
      NotificationManager.success(message, 'Success');
      break;
    case 'warning':
      NotificationManager.warning('Warning message', message, 3000);
      break;
    case 'error':
      NotificationManager.error(message, 'Error', 5000);
      break;
    default:
      NotificationManager.info(message);
      break;
  }
};
