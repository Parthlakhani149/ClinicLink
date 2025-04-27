import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ClinicLinkForgotPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background and Logo */}
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

      {/* Forgot Password Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your registered email address.</Text>

        <Text style={styles.inputLabel}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

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
