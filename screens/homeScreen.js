// ✅ HomeScreen.js with User Name, First-Time Tutorial, Appointment Count Badge, and Professional Icons

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setUserName(userData.name);
        }
      }
    };

    const checkTutorialStatus = async () => {
      const seen = await AsyncStorage.getItem('seenTutorial');
      if (!seen) {
        setShowTutorial(true);
        await AsyncStorage.setItem('seenTutorial', 'true');
      }
    };

    const fetchAppointments = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const q = query(collection(db, 'appointments'), where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const now = new Date();
      const activeAppointments = snapshot.docs.filter(doc => {
        const { date, time } = doc.data();
        return new Date(`${date}T${time}`) > now;
      });
      setAppointmentCount(activeAppointments.length);
    };

    fetchUser();
    checkTutorialStatus();
    fetchAppointments();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>        
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/Profile.jpg')} style={styles.profile} />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcome}>Hi {userName || 'there'} 👋</Text>
          <Text style={styles.subtitle}>Welcome to <Text style={{ fontWeight: 'bold' }}>ClinicLink</Text>, your health partner.</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Swiper autoplay height={200} dotColor="#ccc" activeDotColor="#007AFF">
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
          </Swiper>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ScheduledAppointments')}>
            {appointmentCount > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{appointmentCount}</Text></View>
            )}
            <Ionicons name="calendar-outline" size={32} color="#1E293B" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Prescriptions')}>
            <Ionicons name="medkit-outline" size={32} color="#1E293B" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Prescriptions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookAppointment')}>
          <Text style={styles.bookText}>BOOK NOW</Text>
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AIChat')}>
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal visible={showTutorial} transparent animationType="fade">
        <View style={styles.tutorialWrapper}>
          <Swiper
            loop={false}
            activeDotColor="#2563EB"
            dotColor="#ccc"
            showsButtons={true}
            buttonWrapperStyle={styles.buttonWrapper}
            nextButton={<Text style={styles.buttonText}>Next</Text>}
            prevButton={<Text style={styles.buttonText}>Back</Text>}
            onIndexChanged={(index) => {
              if (index === 2) {
                setTimeout(() => setShowTutorial(false), 1500);
              }
            }}
          >
            <View style={styles.tutorialPage}>
              <Image source={require('../assets/doctor.jpg')} style={styles.tutorialImage} />
              <Text style={styles.tutorialTitle}>Welcome to ClinicLink</Text>
              <Text style={styles.tutorialDesc}>Manage doctor appointments and prescriptions effortlessly.</Text>
            </View>
            <View style={styles.tutorialPage}>
              <Image source={require('../assets/logo.jpg')} style={styles.tutorialImage} />
              <Text style={styles.tutorialTitle}>Easy Booking</Text>
              <Text style={styles.tutorialDesc}>Schedule your appointment anytime between 9 AM - 5 PM, Mon to Fri.</Text>
            </View>
            <View style={styles.tutorialPage}>
              <Image source={require('../assets/Profile.jpg')} style={styles.tutorialImage} />
              <Text style={styles.tutorialTitle}>Smart Assistant</Text>
              <Text style={styles.tutorialDesc}>Use the AI Chatbot to ask health-related queries 24/7.</Text>
            </View>
          </Swiper>
        </View>
      </Modal>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4F8',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 5,
  },
  sliderContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  sliderImage: {
    width: width - 40,
    height: 200,
    borderRadius: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#ffffff',
    width: (width - 60) / 2,
    paddingVertical: 30,
    borderRadius: 15,
    alignItems: 'center',
    position: 'relative',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 12,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    gap: 15,
    marginBottom: 30,
  },
  menuButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  menuText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#22C55E',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 40,
  },
  tutorialImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  tutorialTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
    textAlign: 'center',
  },
  tutorialDesc: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
