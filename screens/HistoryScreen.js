import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function HistoryScreen({ navigation }) {
  // State variables to manage appointment data and filters
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Fetch appointment history for the logged-in user from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'appointments'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(results);
      setFiltered(results);

      // Extract unique doctor names for dropdown
      const uniqueDoctors = [...new Set(results.map(app => app.doctorName))];
      const doctorList = uniqueDoctors.map(name => ({ label: name, value: name }));
      setDoctorOptions([{ label: 'See All', value: 'all' }, ...doctorList]);
    };

    fetchAppointments();
  }, []);

  // Apply filters (doctor and date range) when any of the filter states change
  useEffect(() => {
    let filteredList = appointments;

    // Filter by selected doctor
    if (selectedDoctor && selectedDoctor !== 'all') {
      filteredList = filteredList.filter(app => app.doctorName === selectedDoctor);
    }

    // Filter by date range
    if (fromDate && toDate) {
      filteredList = filteredList.filter(app => {
        const appDate = new Date(`${app.date}T${app.time}`);
        return appDate >= fromDate && appDate <= toDate;
      });
    }

    setFiltered(filteredList);
  }, [selectedDoctor, fromDate, toDate, appointments]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Top header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Filter section with doctor dropdown and date pickers */}
      <View style={styles.filterSection}>
        <DropDownPicker
          open={openDropdown}
          value={selectedDoctor}
          items={doctorOptions}
          setOpen={setOpenDropdown}
          setValue={setSelectedDoctor}
          setItems={setDoctorOptions}
          placeholder="Select Doctor"
          style={styles.dropdown}
          dropDownContainerStyle={{ borderColor: '#E5E7EB' }}
        />

        <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBtn}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{fromDate ? fromDate.toDateString() : 'From'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBtn}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{toDate ? toDate.toDateString() : 'To'}</Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePickers for From and To Date */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowFromPicker(Platform.OS === 'ios');
            if (date) setFromDate(date);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowToPicker(Platform.OS === 'ios');
            if (date) setToDate(date);
          }}
        />
      )}

      {/* Appointment cards */}
      <FlatList
        data={filtered.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="medkit-outline" size={22} color="#2563EB" />
              <Text style={styles.cardDoctor}>{item.doctorName}</Text>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.cardDetail}>{item.date}</Text>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text style={styles.cardDetail}>{item.time}</Text>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="document-text-outline" size={16} color="#6B7280" />
              <Text style={styles.cardDetail}>Reason: {item.reason}</Text>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="person-outline" size={16} color="#6B7280" />
              <Text style={styles.cardDetail}>Specialty: {item.specialty}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// StyleSheet for History screen UI components
const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  filterSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    minWidth: 130,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardDoctor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardDetail: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
  },
});
