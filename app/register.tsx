import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

export default function RegisterScreen() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');

  const handleRegister = () => {
    if (!prenom || !nom || !telephone || !email || !motDePasse || !confirmerMotDePasse) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    // Intégration Firebase à venir ici
    Alert.alert('Succès', 'Compte créé avec succès (simulation)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        placeholder="Prénom"
        style={styles.input}
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        placeholder="Téléphone"
        keyboardType="phone-pad"
        style={styles.input}
        value={telephone}
        onChangeText={setTelephone}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={motDePasse}
        onChangeText={setMotDePasse}
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        style={styles.input}
        value={confirmerMotDePasse}
        onChangeText={setConfirmerMotDePasse}
      />

      <Button title="S'inscrire" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#239C35',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
