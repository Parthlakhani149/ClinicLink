// 📍 ChemistMap.js — MapView with 4 Chemist Partners

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const chemists = [
  {
    id: '1',
    name: 'PharmaCare',
    latitude: -37.8136,
    longitude: 144.9631,
  },
  {
    id: '2',
    name: 'MediStore',
    latitude: -37.8150,
    longitude: 144.9660,
  },
  {
    id: '3',
    name: 'Wellness Pharmacy',
    latitude: -37.8125,
    longitude: 144.9612,
  },
  {
    id: '4',
    name: 'GreenCross Chemist',
    latitude: -37.8147,
    longitude: 144.9700,
  },
];

export default function ChemistMap({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chemist Partners</Text>
        <View style={{ width: 26 }} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {chemists.map((chemist) => (
          <Marker
            key={chemist.id}
            coordinate={{ latitude: chemist.latitude, longitude: chemist.longitude }}
            title={chemist.name}
            description="Partner Chemist Location"
          />
        ))}
      </MapView>
    </View>
  );
}

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
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
