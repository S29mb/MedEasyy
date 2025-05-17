import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { Linking } from 'react-native';

const ipms = [
  { id: '1', name: 'IPM CSS' },
  { id: '2', name: 'IPM SDE' },
  { id: '3', name: 'IPM SONATEL' },
  { id: '4', name: 'IPM CBAO' },
  { id: '5', name: 'IPM Poste Santé' },
];

const pharmacies = [
  {
    id: 'p1',
    nom: 'Pharmacie Centrale',
    adresse: 'Avenue Caen, Thiès',
    ipmsAcceptees: ['1', '2', '4'],
  },
  {
    id: 'p2',
    nom: 'Pharmacie Medina Fall',
    adresse: 'Medina Fall, Thiès',
    ipmsAcceptees: ['2', '3'],
  },
  {
    id: 'p3',
    nom: 'Pharmacie Grand Standing',
    adresse: 'Grand Standing, Thiès',
    ipmsAcceptees: ['1', '3', '5'],
  },
];

export default function PharmacieIPMScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPharmacies, setFilteredPharmacies] = useState(pharmacies);

  // Fonction pour filtrer les pharmacies selon l'IPM
  const filterPharmacies = () => {
    const ipm = searchQuery.trim();
    if (ipm === '') {
      setFilteredPharmacies(pharmacies);
    } else {
      const ipmId = ipms.find((ipmObj) => ipmObj.name.toLowerCase() === ipm.toLowerCase())?.id;
      if (ipmId) {
        const filtered = pharmacies.filter((pharmacy) =>
          pharmacy.ipmsAcceptees.includes(ipmId)
        );
        setFilteredPharmacies(filtered);
      } else {
        setFilteredPharmacies([]);
      }
    }
  };
  
  const renderItem = ({ item }: { item: typeof pharmacies[0] }) => {
    const ipmsList = item.ipmsAcceptees
      .map((ipmId) => ipms.find((ipm) => ipm.id === ipmId)?.name)
      .join(', ');

    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.nom}</Text>
        <Text style={styles.adresse}>📍 {item.adresse}</Text>
        <Text style={styles.ipms}>✅ IPM acceptées : {ipmsList}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacies acceptant un IPM</Text>

      {/* Champ de saisie pour l'IPM */}
      <TextInput
        style={styles.searchInput}
        placeholder="Entrez un IPM"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {/* Bouton pour lancer la recherche */}
      <Button title="Rechercher" onPress={filterPharmacies} />

      {/* Liste des pharmacies filtrées selon l'IPM */}
      <FlatList
        data={filteredPharmacies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Text style={{ marginTop: 20, color: '#239C35', textAlign: 'center' }}>
  Cliquez sur ce lien pour visiter notre plateforme avec plus de fonctionnalités :{' '}
  <Text
    style={{ color: 'blue', textDecorationLine: 'underline' }}
    onPress={() => Linking.openURL('https://www.tektalpharma.com/')}
  >
    https://www.tektalpharma.com/
  </Text>
  </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#239C35',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#239C35',
  },
  adresse: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  ipms: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
