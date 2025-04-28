// config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCJtqq183DPKKI833qpdJsf4r2S30ivy3k",
  authDomain: "cliniclink-9dd9d.firebaseapp.com",
  projectId: "cliniclink-9dd9d",
  storageBucket: "cliniclink-9dd9d.appspot.com",
  messagingSenderId: "708651354399",
  appId: "1:708651354399:web:7960bbecc092ad5e5c082a",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Export them
export { auth, db };
