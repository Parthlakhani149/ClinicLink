import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function ClinicLinkLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.log('Login error:', error.message);
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'No user found with this email' });
        } else if (error.code === 'auth/wrong-password') {
          setErrors({ password: 'Incorrect password' });
        } else {
          setErrors({ general: error.message });
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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

        <Text style={styles.inputLabel}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff' },
  topContainer: { alignItems: 'center' },
  backgroundImage: { width: '100%', height: 200, resizeMode: 'cover', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
  logo: { width: 80, height: 80, marginTop: -40, borderRadius: 40, backgroundColor: '#fff', padding: 5 },
  bottomContainer: { marginTop: 20, paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'gray', textAlign: 'center', marginVertical: 10 },
  inputLabel: { fontSize: 12, color: 'gray', marginTop: 20 },
  input: { backgroundColor: '#dedcdc', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12, marginTop: 5 },
  loginButton: { backgroundColor: '#181a1b', borderRadius: 10, marginTop: 30, paddingVertical: 15, alignItems: 'center' },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  forgotText: { color: 'gray', fontSize: 13, textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
  signupText: { color: 'gray', fontSize: 13, textAlign: 'center', marginTop: 10 },
  errorText: { color: 'red', fontSize: 12, marginTop: 2, marginLeft: 5 },
});
