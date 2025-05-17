import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Linking } from 'react-native'; // Assurez-vous que StyleSheet est importé correctement
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// --- Types ---
interface Coords {
  latitude: number;
  longitude: number;
}

interface Pharmacie {
  id: string;
  nom: string;
  adresse: string;
  coords: Coords;
}

// --- Données ---
const pharmacies: Pharmacie[] = [
  {
    id: '1',
    nom: 'Pharmacie Ndiaye',
    adresse: 'Rue 12, Thiès',
    coords: { latitude: 14.791, longitude: -16.924 },
  },
  {
    id: '2',
    nom: 'Pharmacie Guèye',
    adresse: 'Avenue Blaise Diagne, Thiès',
    coords: { latitude: 14.793, longitude: -16.926 },
  },
];

// --- Composant principal ---
export default function PharmacieScreen() {
  const [location, setLocation] = useState<Coords | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [sortedPharmacies, setSortedPharmacies] = useState<Pharmacie[]>(pharmacies);

  // Obtenir la position actuelle
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // Fonction pour calculer la distance
  const getDistance = (loc1: Coords, loc2: Coords): number => {
    const dx = loc1.latitude - loc2.latitude;
    const dy = loc1.longitude - loc2.longitude;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Fonction de tri par proximité
  const trierParProximite = () => {
    if (!location) return;
    const sorted = [...pharmacies].sort(
      (a, b) => getDistance(location, a.coords) - getDistance(location, b.coords)
    );
    setSortedPharmacies(sorted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacies à Thiès</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une pharmacie..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Trier par proximité" onPress={trierParProximite} />
      <FlatList
        data={sortedPharmacies.filter(pharma =>
          pharma.nom.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nom}</Text>
            <Text style={styles.address}>{item.adresse}</Text>
          </View>
        )}
      />
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="Ma position" pinColor="blue" />
          {sortedPharmacies.map((pharma: Pharmacie) => (
            <Marker key={pharma.id} coordinate={pharma.coords} title={pharma.nom} description={pharma.adresse} />
          ))}
        </MapView>
      )}
      <Text style={{ marginTop: 20, color: '#239C35' }}>
        Cliquez sur ce lien pour visiter notre plateforme avec plus de fonctionnalités :{' '}
        <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => Linking.openURL('https://qr-code.click/i/682206b289b20')}
        >
          https://www.tektalpharma.com/
        </Text>
      </Text>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: 'white', // Arrière-plan blanc
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
  },
  address: {
    color: '#555',
  },
  map: {
    height: 200,
    marginTop: 10,
    borderRadius: 12,
  },
});
