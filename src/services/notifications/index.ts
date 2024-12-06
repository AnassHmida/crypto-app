import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
    this.createDefaultChannels();
  }

  configure = () => {
    // Configure the notification settings
    PushNotification.configure({
      onRegister: function (token: { os: string; token: string }) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification: any) {
        console.log('NOTIFICATION RECEIVED:', notification);

        // Handle foreground notifications for iOS
        if (Platform.OS === 'ios') {
          if (notification.foreground) {
            // Show notification even when app is in foreground
            PushNotificationIOS.addNotificationRequest({
              id: String(Date.now()),
              title: notification.title,
              body: notification.message,
              sound: 'default',
              badge: 1,
            });
          }
        }

 
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification: { action: string; [key: string]: any }) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function(err: Error) {
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
      (created: boolean) => console.log(`Channel 'price-alerts' created: ${created}`)
    );
  }


  sendPriceAlert = (symbol: string, price: number, isAbove: boolean) => {
    if (Platform.OS === 'ios') {
      // iOS-specific notification
      PushNotificationIOS.addNotificationRequest({
        id: String(Date.now()),
        title: '💰 Price Alert',
        body: `${symbol} is now ${isAbove ? 'above' : 'below'} $${price.toFixed(2)}`,
        sound: 'default',
        badge: 1,
        userInfo: {
          symbol,
          price,
          isAbove,
        },
      });
    } else {
      PushNotification.localNotification({
        channelId: 'price-alerts',
        title: '💰 Price Alert',
        message: `${symbol} is now ${isAbove ? 'above' : 'below'} $${price.toFixed(2)}`,
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        priority: 'high',
      });
    }
  }


  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  }


  cancelNotification = (notificationId: string) => {
    PushNotification.cancelLocalNotification(notificationId);
  }


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