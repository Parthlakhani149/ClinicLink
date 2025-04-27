import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';  // Add this at top
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

export default function ClinicLinkLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Section with Background and Logo */}
      <View style={styles.topContainer}>
        <Image 
          source={require('../assets/background.png')} 
          style={styles.backgroundImage}
        />
        <Image 
          source={require('../assets/logo.jpg')} 
          style={styles.logo}
        />
      </View>

      {/* Bottom Section - Login Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.loginSubtitle}>Sign in to continue.</Text>

        <Text style={styles.inputLabel}>EMAIL ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#8e8e8e"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#8e8e8e"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
         <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>


         <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
      <Text style={styles.signupText}>Signup !</Text>
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
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginSubtitle: {
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
  loginButton: {
    backgroundColor: '#181a1b',
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  signupText: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
