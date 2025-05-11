import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ClinicLinkLogin from './screens/LoginScreen';
import ClinicLinkForgotPassword from './screens/ForgotPasswordScreen';
import ClinicLinkSignup from './screens/SignupScreen';
import HomeScreen from './screens/homeScreen';
import Profile from './screens/ProfileScreen';
import PrescriptionsScreen from './screens/PrescriptionsScreen';
import BookAppointmentScreen from './screens/BookAppointmentScreen';
import AIChatScreen from './screens/AIChatScreen';
import ScheduledAppointmentsScreen from './screens/ScheduledAppointmentsScreen';
import HistoryScreen from './screens/HistoryScreen';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const Stack = createNativeStackNavigator();

// ✅ Handle foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const registerForPushNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          alert('Permission for notifications was not granted');
        }
      } else {
        alert('Must use physical device for push notifications');
      }
    };

    registerForPushNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={ClinicLinkLogin} />
        <Stack.Screen name="Signup" component={ClinicLinkSignup} />
        <Stack.Screen name="ForgotPassword" component={ClinicLinkForgotPassword} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Prescriptions" component={PrescriptionsScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />
        <Stack.Screen name="ScheduledAppointments" component={ScheduledAppointmentsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
