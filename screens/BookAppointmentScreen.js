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
import { db, auth } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Static list of doctors with images
const doctors = [
  { id: '1', name: 'Dr. Smith', specialty: 'Cardiologist', image: require('../assets/Smith.jpg') },
  { id: '2', name: 'Dr. Patel', specialty: 'Dermatologist', image: require('../assets/Patel.jpg') },
  { id: '3', name: 'Dr. Kumar', specialty: 'Neurologist', image: require('../assets/Kumar.jpg') },
];

export default function BookAppointmentScreen({ navigation }) {
  // Form state
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Date picker change handler
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // keep open only on iOS
    if (selectedDate) setDate(selectedDate);
  };

  // Time picker change handler
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  // Check if selected time is available (no conflict within 45 mins for that doctor)
  const isTimeAvailable = async (doctorId, selectedDate, selectedTime) => {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('date', '==', selectedDate)
    );
    const querySnapshot = await getDocs(q);
    const newTime = new Date(`${selectedDate}T${selectedTime}`);

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const existingTime = new Date(`${data.date}T${data.time}`);
      const timeDiff = Math.abs(existingTime - newTime);
      if (timeDiff < 45 * 60 * 1000) return false; // conflict within 45 minutes
    }
    return true;
  };

  // Handle booking logic with full validation and Firestore write
  const handleBooking = async () => {
    const selectedDateStr = date.toISOString().split('T')[0];
    const selectedTimeStr = time.toTimeString().split(' ')[0].slice(0, 5);
    const appointmentDateTime = new Date(`${selectedDateStr}T${selectedTimeStr}`);
    const now = new Date();

    if (appointmentDateTime < now) {
      Alert.alert('Invalid Time', 'You cannot book an appointment in the past.');
      return;
    }

    const selectedHour = time.getHours();
    if (selectedHour < 9 || selectedHour >= 17) {
      Alert.alert('Invalid Time', 'Appointments can only be booked between 9:00 AM and 5:00 PM.');
      return;
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      Alert.alert('Invalid Day', 'Appointments can only be booked Monday to Friday.');
      return;
    }

    if (!selectedDoctor || !reason.trim()) {
      Alert.alert('Missing Info', 'Please complete all fields.');
      return;
    }

    const available = await isTimeAvailable(selectedDoctor.id, selectedDateStr, selectedTimeStr);
    if (!available) {
      Alert.alert('Time Unavailable', 'Another appointment is already booked within 45 minutes.');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert('Not Logged In', 'Please log in to book an appointment.');
      return;
    }

    // Save the appointment to Firestore
    await addDoc(collection(db, 'appointments'), {
      userId: currentUser.uid,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDateStr,
      time: selectedTimeStr,
      reason,
      createdAt: new Date(),
    });

    Alert.alert('Success', 'Appointment booked successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Doctor Cards */}
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
            <Image source={item.image} style={styles.cardBackground} resizeMode="cover" />
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
        <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
      )}

      {/* Time Picker */}
      <Text style={styles.sectionTitle}>Select Time</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Get screen width for responsive design
const width = Dimensions.get('window').width;

// Styles
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
