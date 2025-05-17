import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'; // ✅ corrigé ici
import * as ImagePicker from 'expo-image-picker';

type Medicament = {
  nom: string;
  prix: number;
  posologie: string;
};

type PanierItem = {
  nom: string;
  prix: number;
  posologie: string;
  quantite: number;
};

export default function MedicamentScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [panier, setPanier] = useState<PanierItem[]>([]);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission requise", "L'accès à la caméra est nécessaire.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (image) {
      // Médicaments simulés après OCR
      const medicamentsExtraits: Medicament[] = [
        { nom: 'Doliprane', prix: 2.5, posologie: '1 comprimé toutes les 6h' },
        { nom: 'Amoxicilline', prix: 5.0, posologie: '500mg 3x/jour' },
        { nom: 'Spasfon', prix: 3.2, posologie: '2 comprimés en cas de douleur' },
      ];
      setMedicaments(medicamentsExtraits);
    }
  }, [image]);

  const ajouterAuPanier = (med: Medicament) => {
    const existe = panier.find(item => item.nom === med.nom);
    if (existe) {
      setPanier(panier.map(item =>
        item.nom === med.nom ? { ...item, quantite: item.quantite + 1 } : item
      ));
    } else {
      setPanier([...panier, { ...med, quantite: 1 }]);
    }
  };

  const modifierQuantite = (nom: string, delta: number) => {
    setPanier(panier =>
      panier.map(item =>
        item.nom === nom ? { ...item, quantite: Math.max(1, item.quantite + delta) } : item
      )
    );
  };

  const supprimerDuPanier = (nom: string) => {
    setPanier(panier.filter(item => item.nom !== nom));
  };

  const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recherche de Médicaments</Text>

      <Text style={styles.infoText}>
        Scannez une ordonnance pour détecter les médicaments.
      </Text>

      <Button title="📸 Scanner une ordonnance" onPress={takePhoto} />

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} contentFit="contain" />
          <Text style={styles.imageInfo}>Ordonnance scannée</Text>
        </View>
      )}

      {medicaments.length > 0 && (
        <View style={styles.medicamentList}>
          <Text style={styles.title}>💊 Médicaments détectés :</Text>
          {medicaments.map((med, index) => (
            <TouchableOpacity key={index} onPress={() => ajouterAuPanier(med)}>
              <Text style={styles.medicamentText}>
                • {med.nom} - {med.prix.toFixed(2)}€ ({med.posologie})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {panier.length > 0 && (
        <View style={styles.panierContainer}>
          <Text style={styles.title}>🧺 Panier :</Text>
          {panier.map((item, index) => (
            <View key={index} style={styles.panierItem}>
              <Text style={styles.medicamentText}>
                {item.nom} - {item.prix.toFixed(2)}€ x {item.quantite} = {(item.prix * item.quantite).toFixed(2)}€
              </Text>
              <Text style={styles.posologie}>{item.posologie}</Text>
              <View style={styles.actions}>
                <Button title="−" onPress={() => modifierQuantite(item.nom, -1)} />
                <Button title="+" onPress={() => modifierQuantite(item.nom, 1)} />
                <Button title="🗑 Supprimer" color="red" onPress={() => supprimerDuPanier(item.nom)} />
              </View>
            </View>
          ))}

          <Text style={styles.total}>💵 Total : {total}€</Text>
          <Button
            title="✅ Valider la commande"
            onPress={() => {
              Alert.alert("Commande validée", "Votre commande a bien été prise en compte !");
              setPanier([]);
            }}
            color="#239C35"
          />
        </View>
      )}

      {!image && (
        <Text style={styles.instructions}>
          Cliquez sur "Scanner une ordonnance" pour commencer.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#239C35',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 350,
    borderRadius: 10,
  },
  imageInfo: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  medicamentList: {
    marginTop: 20,
    width: '100%',
  },
  medicamentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    paddingVertical: 5,
  },
  posologie: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  panierContainer: {
    marginTop: 30,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  panierItem: {
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 15,
  },
});
