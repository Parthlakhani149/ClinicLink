// 📄 Premium PrescriptionsScreen.js — Enhanced UI

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const prescriptions = [
  { id: '1', doctor: 'Dr. Smith', date: '2024-12-05', medicine: 'Amoxicillin 500mg' },
  { id: '2', doctor: 'Dr. Patel', date: '2024-11-10', medicine: 'Ibuprofen 200mg' },
  { id: '3', doctor: 'Dr. Kumar', date: '2024-10-22', medicine: 'Paracetamol 500mg' },
];

export default function PrescriptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Prescription List */}
      <FlatList
        data={prescriptions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="doctor" size={22} color="#2563EB" style={styles.icon} />
              <Text style={styles.doctor}>{item.doctor}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" style={styles.icon} />
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="medkit-outline" size={20} color="#10B981" style={styles.icon} />
              <Text style={styles.medicine}>{item.medicine}</Text>
            </View>
          </View>
        )}
      />
    </View>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  doctor: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  date: {
    fontSize: 15,
    color: '#6B7280',
  },
  medicine: {
    fontSize: 15,
    fontWeight: '500',
    color: '#10B981',
  },
});