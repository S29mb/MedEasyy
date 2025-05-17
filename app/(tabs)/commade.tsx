import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function OrdersScreen() {
  // Simulation de commandes
  const commandes = [
    { id: 1, produit: 'Doliprane 500mg', date: '2025-05-01' },
    { id: 2, produit: 'Vitamine C', date: '2025-04-25' },
    { id: 3, produit: 'Sirop Toux', date: '2025-04-20' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mes Commandes</Text>
      {commandes.map((cmd) => (
        <View key={cmd.id} style={styles.orderItem}>
          <Text style={styles.produit}>{cmd.produit}</Text>
          <Text style={styles.date}>{cmd.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#239C35',
    textAlign: 'center',
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  produit: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#555',
    marginTop: 4,
  },
});
