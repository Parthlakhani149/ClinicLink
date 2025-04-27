<<<<<<< HEAD
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
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi Parth and Smit</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> d7bdb6b1ebff3fbfdb99269ff67a1b2210683f75
