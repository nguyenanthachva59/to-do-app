import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (text, date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📅 Nhắc nhở công việc',
      body: text,
    },
    trigger: new Date(date),
  });
};
