// 📅 ScheduledAppointmentsScreen.js — Styled UI with Header, Modal, Call Support, and Cancel Rules

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function ScheduledAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(q);
        const now = new Date();

        const results = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(app => new Date(`${app.date}T${app.time}`) > now)
          .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

        setAppointments(results);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async () => {
    if (!selected) return;

    const appointmentTime = new Date(`${selected.date}T${selected.time}`);
    const now = new Date();
    const diffHours = (appointmentTime - now) / (1000 * 60 * 60);

    if (diffHours < 24) {
      Alert.alert('Cannot Cancel', 'Appointments can only be cancelled at least 24 hours in advance.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'appointments', selected.id));
      setAppointments(prev => prev.filter(app => app.id !== selected.id));
      setModalVisible(false);
      Alert.alert('Cancelled', 'Appointment cancelled successfully.');
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <View style={{ width: 26 }} />
      </View>

      <Text style={styles.infoText}>Tap on a card to see details. Cancellations allowed up to 24 hours before.</Text>

      {appointments.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No upcoming appointments.</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelected(item);
                setModalVisible(true);
              }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="person-circle-outline" size={24} color="#2563EB" />
                <Text style={styles.cardTitle}>{item.doctorName}</Text>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                <Text style={styles.cardText}>{item.date}</Text>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="time-outline" size={18} color="#6B7280" />
                <Text style={styles.cardText}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Text style={styles.modalTitle}>{selected.doctorName}</Text>
                <Text style={styles.modalDetail}>Specialty: {selected.specialty}</Text>
                <Text style={styles.modalDetail}>Date: {selected.date}</Text>
                <Text style={styles.modalDetail}>Time: {selected.time}</Text>
                <Text style={styles.modalDetail}>Reason: {selected.reason}</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                    <Text style={{ color: '#fff' }}>Cancel Appointment</Text>
                  </TouchableOpacity>
                  {(new Date(`${selected.date}T${selected.time}`) - new Date()) / (1000 * 60 * 60) < 24 && (
                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={() => Linking.openURL('tel:0451032428')}
                    >
                      <Ionicons name="call" size={18} color="#fff" />
                      <Text style={{ color: '#fff', marginLeft: 8 }}>Call Support</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                    <Text style={{ color: '#2563EB' }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  listContainer: {
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
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
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 5,
  },
  modalActions: {
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  callBtn: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeBtn: {
    borderColor: '#2563EB',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});
