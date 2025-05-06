import React from 'react';
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


const Stack = createNativeStackNavigator();

export default function App() {
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

        </Stack.Navigator>
      </NavigationContainer>
    
  );
}




// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Image, Text, TouchableOpacity, View } from 'react-native';

// import Login from './screens/LoginScreen';
// import Signup from './screens/SignupScreen';
// import ForgotPassword from './screens/ForgotPasswordScreen';
// import Home from './screens/homeScreen';
// import Profile from './screens/ProfileScreen';

// const AuthStack = createNativeStackNavigator();
// const AppStack = createNativeStackNavigator();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Replace with real auth logic later

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? (
//         <AppStack.Navigator
//           initialRouteName="Home"
//           screenOptions={({ navigation }) => ({
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerTitle: () => (
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Image
//                   source={require('./assets/logo.jpg')}
//                   style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
//                 />
//                 <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
//                   Clinic Link
//                 </Text>
//               </View>
//             ),
//             headerRight: () => (
//               <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//                 <Image
//                   source={require('./assets/Profile.jpg')}
//                   style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
//                 />
//               </TouchableOpacity>
//             ),
//           })}
//         >
//           <AppStack.Screen name="Home" component={Home} />
//           <AppStack.Screen name="Profile">
//             {(props) => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </AppStack.Screen>
//         </AppStack.Navigator>
//       ) : (
//         <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//           <AuthStack.Screen name="Login">
//             {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </AuthStack.Screen>
//           <AuthStack.Screen name="Signup" component={Signup} />
//           <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
//         </AuthStack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// };

// export default App;
