import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ClinicLinkSignup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
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

      {/* Signup Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Create new Account</Text>
        <Text style={styles.subtitle}>Already Registered? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log in here.</Text></Text>

        <Text style={styles.inputLabel}>NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>MOBILE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        <Text style={styles.inputLabel}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
        <TextInput
          style={styles.input}
          placeholder="Select"
          value={dob}
          onChangeText={setDob}
        />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up</Text>
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
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
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
  signupButton: {
    backgroundColor: '#181a1b',
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
