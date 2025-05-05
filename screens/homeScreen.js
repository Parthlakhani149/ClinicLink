// ✅ HomeScreen.js with Stylish AI Chat Floating Button and Updated UI

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>        
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/Profile.jpg')} style={styles.profile} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcome}>Hi there 👋</Text>
          <Text style={styles.subtitle}>Welcome to <Text style={{ fontWeight: 'bold' }}>ClinicLink</Text>, your health partner.</Text>
        </View>

        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <Swiper autoplay height={200} dotColor="#ccc" activeDotColor="#007AFF">
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
            <Image source={require('../assets/doctor.jpg')} style={styles.sliderImage} />
          </Swiper>
        </View>

        {/* Feature Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/doctor.jpg')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Prescriptions')}>
               <Image source={require('../assets/Profile.jpg')} style={styles.cardIcon} />
               <Text style={styles.cardTitle}>Prescriptions</Text>
          </TouchableOpacity>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookAppointment')}>
          <Text style={styles.bookText}>BOOK NOW</Text>
        </TouchableOpacity>

        {/* Menu Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Stylish Floating AI Chat Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AIChat')}
        >   
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>

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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
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
    elevation: 2,
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
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
});
