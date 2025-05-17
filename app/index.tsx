import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // ✅ Bien placé

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'rgba(0, 128, 0, 0.80)', dark: 'rgba(0, 128, 0, 0.80)' }}
      headerImage={
        <Image
          source={require('@/assets/images/Logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/images/pha.jpg')}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <ThemedView style={styles.titleContainer}>
            <Text style={styles.title}>Bienvenue !</Text>
            <HelloWave />
          </ThemedView>

          <View style={styles.formContainer}>
            {/* Champ Email */}
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={20} color="#333" style={styles.icon} />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#333"
              />
            </View>

            {/* Champ Mot de passe */}
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={20} color="#333" style={styles.icon} />
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry={!showPassword}
                style={[styles.input, { flex: 1 }]}
                placeholderTextColor="#333"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#333"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>

            {/* Bouton de connexion */}
            <Button
  title="Se connecter"
  onPress={() => router.replace('/Accueil')}
/>


            {/* Liens */}
            <View style={styles.linkContainer}>
              <Link href="/register" asChild>
                <Pressable>
                  <Text style={styles.link}>Devenir client</Text>
                </Pressable>
              </Link>

              <Link href="/forgot-password" asChild>
                <Pressable>
                  <Text style={styles.link}>Mot de passe oublié ?</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 290,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  backgroundContainer: {
    position: 'relative',
    height: height,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#239C35',
  },
  formContainer: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 8,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  linkContainer: {
    marginTop: 12,
    alignItems: 'center',
    gap: 8,
  },
  link: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
