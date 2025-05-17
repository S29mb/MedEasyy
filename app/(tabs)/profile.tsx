import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Profile.jpg')} // Ajoute une image si tu en as une
        style={styles.avatar}
      />
      <Text style={styles.name}>Ndaye Ndiaye</Text>
      <Text style={styles.email}>NdayeNdiaye@gmail.com</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Téléphone</Text>
        <Text style={styles.value}>777777777</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Adresse</Text>
        <Text style={styles.value}>Thies, Senegal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#239C35',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginTop: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    marginTop: 4,
    color: '#555',
  },
});
