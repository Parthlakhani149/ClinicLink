// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function ClinicLinkForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const navigation = useNavigation();

//   const validateEmail = (email) => {
//     // Basic email regex validation
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const handleResetPassword = () => {
//     if (!email) {
//       setEmailError('Email is required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setEmailError('Enter a valid email address');
//       return;
//     }

//     // If validation passes
//     setEmailError('');
//     Alert.alert('Success', 'Password reset instructions sent to your email.');
//     // Reset form or Navigate if needed
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Background and Logo */}
//       <View style={styles.topContainer}>
//         <Image 
//           source={require('../assets/background.png')} 
//           style={styles.backgroundImage}
//         />
//         <Image 
//           source={require('../assets/logo.jpg')} 
//           style={styles.logo}
//         />
//       </View>

//       {/* Forgot Password Form */}
//       <View style={styles.bottomContainer}>
//         <Text style={styles.title}>Forgot Password</Text>
//         <Text style={styles.subtitle}>Enter your registered email address.</Text>

//         <Text style={styles.inputLabel}>EMAIL</Text>
//         <TextInput
//           style={[styles.input, emailError ? { borderColor: 'red', borderWidth: 1 } : null]}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError(''); // clear error while typing
//           }}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//         <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
//           <Text style={styles.resetButtonText}>Reset Password</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.backToLogin}>Back to Login</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//   },
//   topContainer: {
//     alignItems: 'center',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginTop: -40,
//     borderRadius: 40,
//     backgroundColor: '#fff',
//     padding: 5,
//   },
//   bottomContainer: {
//     marginTop: 20,
//     paddingHorizontal: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: 'gray',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   inputLabel: {
//     fontSize: 12,
//     color: 'gray',
//     marginTop: 20,
//   },
//   input: {
//     backgroundColor: '#dedcdc',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     marginTop: 5,
//   },
//   resetButton: {
//     backgroundColor: '#181a1b',
//     borderRadius: 10,
//     marginTop: 30,
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   resetButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   backToLogin: {
//     color: 'gray',
//     fontSize: 13,
//     textAlign: 'center',
//     marginTop: 20,
//     textDecorationLine: 'underline',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
// });


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ClinicLinkForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validate()) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('Success', 'Password reset link has been sent to your email.');
        navigation.navigate('Login'); // After sending link, go back to Login
      } catch (error) {
        console.log('Reset Password Error:', error.message);
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'No user found with this email' });
        } else {
          setErrors({ general: error.message });
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background and Logo */}
      <View style={styles.topContainer}>
        <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>

      {/* Forgot Password Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your registered email address.</Text>

        {/* Email */}
        <Text style={styles.inputLabel}>EMAIL ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -40,
    borderRadius: 40,
    backgroundColor: '#fff',
    padding: 5,
  },
  bottomContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#dedcdc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  resetButton: {
    backgroundColor: '#181a1b',
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
