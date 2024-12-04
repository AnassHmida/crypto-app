import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
    this.createDefaultChannels();
  }

  configure = () => {
    // Configure the notification settings
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish();
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  createDefaultChannels() {
    // Create the default notification channel
    PushNotification.createChannel(
      {
        channelId: 'price-alerts',
        channelName: 'Price Alerts',
        channelDescription: 'Cryptocurrency price alerts',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`Channel 'price-alerts' created: ${created}`)
    );
  }

  // Send a local notification for price alerts
  sendPriceAlert = (symbol: string, price: number, isAbove: boolean) => {
    PushNotification.localNotification({
      channelId: 'price-alerts',
      title: '💰 Price Alert',
      message: `${symbol} is now ${isAbove ? 'above' : 'below'} $${price.toFixed(2)}`,
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
      vibration: 300,
      priority: 'high',
      autoCancel: true,
      largeIcon: '', // Android only - set your app icon name
      smallIcon: '', // Android only - set your app small icon name
    });
  }

  // Cancel all pending notifications
  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  }

  // Cancel a specific notification by ID
  cancelNotification = (notificationId: string) => {
    PushNotification.cancelLocalNotification(notificationId);
  }

  // Schedule a notification for the future
  scheduleNotification = (title: string, message: string, date: Date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'price-alerts',
      title,
      message,
      date,
      allowWhileIdle: true,
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
      vibration: 300,
    });
  }
}

export default new NotificationService();