// 📅 BookAppointmentScreen.js — Professional UI with Doctor Images

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Dimensions,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const doctors = [
  { id: '1', name: 'Dr. Smith', specialty: 'Cardiologist' },
  { id: '2', name: 'Dr. Patel', specialty: 'Dermatologist' },
  { id: '3', name: 'Dr. Kumar', specialty: 'Neurologist' },
];

export default function BookAppointmentScreen({ navigation }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [reason, setReason] = useState('');

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  const handleBooking = () => {
    if (!selectedDoctor || !date || !time || !reason.trim()) {
      Alert.alert('Missing Info', 'Please complete all fields.');
      return;
    }
    Alert.alert('Success', `Appointment booked with ${selectedDoctor.name} on ${date.toDateString()} at ${time.toLocaleTimeString()}.`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Doctor List */}
      <Text style={styles.sectionTitle}>Choose a Doctor</Text>
      <FlatList
        data={doctors}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.doctorCard, selectedDoctor?.id === item.id && styles.selectedCard]}
            onPress={() => setSelectedDoctor(item)}
          >
            <Image
              source={require('../assets/doctor.jpg')}
              style={styles.cardBackground}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Date Picker */}
      <Text style={styles.sectionTitle}>Select Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Time Picker */}
      <Text style={styles.sectionTitle}>Select Time</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* Reason Input */}
      <Text style={styles.sectionTitle}>Reason for Visit</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        numberOfLines={4}
        placeholder="e.g. General Checkup, Fever, Skin Allergy..."
        value={reason}
        onChangeText={setReason}
      />

      {/* Book Now */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#1D4ED8',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 20,
    marginTop: 20,
  },
  doctorCard: {
    marginRight: 12,
    width: width * 0.6,
    height: 120,
    borderRadius: 16,
    marginTop: 10,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  selectedCard: {
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  specialty: {
    fontSize: 14,
    color: '#d1d5db',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 1,
  },
  bookButton: {
    backgroundColor: '#22C55E',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
