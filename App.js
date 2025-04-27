import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClinicLinkLogin from './screens/LoginScreen';
import ClinicLinkForgotPassword from './screens/ForgotPasswordScreen';
import ClinicLinkSignup from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={ClinicLinkLogin} />
        <Stack.Screen name="Signup" component={ClinicLinkSignup} />
        <Stack.Screen name="ForgotPassword" component={ClinicLinkForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
