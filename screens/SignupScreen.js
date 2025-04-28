import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function ClinicLinkSignup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (mobile.length !== 10) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validate()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          mobile,
          email,
          dob,
          createdAt: new Date(),
        });

        console.log('Signup successful');
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } catch (error) {
        console.log('Signup error:', error.message);
        Alert.alert('Signup Error', error.message);
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
        <Text style={styles.title}>Create new Account</Text>
        <Text style={styles.subtitle}>
          Already Registered?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Log in here.
          </Text>
        </Text>

        <Text style={styles.inputLabel}>NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.inputLabel}>MOBILE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

        <Text style={styles.inputLabel}>EMAIL</Text>
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

        <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
        <TextInput
          style={styles.input}
          placeholder="Select"
          value={dob}
          onChangeText={setDob}
        />
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
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
