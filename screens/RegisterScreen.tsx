import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (motDePasse !== confirmerMotDePasse) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      // Remplace par ta fonction Firebase
      // await registerWithEmailAndPassword(email, motDePasse);
      Alert.alert('Inscription réussie', 'Vous pouvez maintenant vous connecter.');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={motDePasse}
          onChangeText={setMotDePasse}
          style={styles.input}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#555"
            style={styles.icon}
          />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!showConfirmPassword}
          value={confirmerMotDePasse}
          onChangeText={setConfirmerMotDePasse}
          style={styles.input}
        />
        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#555"
            style={styles.icon}
          />
        </Pressable>
      </View>

      <Button title="S'inscrire" onPress={handleRegister} color="#008000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#008000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginHorizontal: 5,
  },
});
