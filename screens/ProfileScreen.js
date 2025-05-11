import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  TextInput, ScrollView, Alert, ActivityIndicator, Platform
} from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDocId, setUserDocId] = useState(null);
  const [showDobPicker, setShowDobPicker] = useState(false);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
          setUserDocId(userDoc.id);
        } else {
          Alert.alert('User not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout error', error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (!userDocId) return;

      await updateDoc(doc(db, 'users', userDocId), {
        name: userData.name,
        dob: userData.dob,
        mobile: userData.mobile,
      });

      setEditing(false);
      Alert.alert('Profile updated');
    } catch (error) {
      Alert.alert('Update error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>

      <Image source={require('../assets/Profile.jpg')} style={styles.avatar} />
      <Text style={styles.username}>{userData?.name}</Text>
      <Text style={styles.email}>{userData?.email}</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userData?.name || ''}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          editable={editing}
        />

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={userData?.mobile || ''}
          onChangeText={(text) => setUserData({ ...userData, mobile: text })}
          editable={editing}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={() => editing && setShowDobPicker(true)}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              value={userData?.dob || ''}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        {showDobPicker && (
          <DateTimePicker
            value={userData?.dob ? new Date(userData.dob.split('/').reverse().join('-')) : new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDobPicker(Platform.OS === 'ios');
              if (selectedDate) {
                const day = selectedDate.getDate().toString().padStart(2, '0');
                const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = selectedDate.getFullYear();
                const formatted = `${day}/${month}/${year}`;
                setUserData({ ...userData, dob: formatted });
              }
            }}
          />
        )}
      </View>

      {!editing ? (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F8FAFC',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  },
  formContainer: {
    width: '90%',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#10B981',
    padding: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#EF4444',
    padding: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});