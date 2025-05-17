import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AccueilScreen() {
  const router = useRouter();

  const renderPartnerLogo = (source: any, description: string) => (
    <View style={styles.partnerLogoContainer} key={description}>
      <Image source={source} style={styles.logo} />
      <Text style={styles.partnerDescription}>{description}</Text>
    </View>  
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Titre de bienvenue */}
        <Text style={styles.title}>Bienvenue sur Tektal Pharma</Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            placeholder="Rechercher un médicament, une pharmacie, etc."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* Boutons de fonctionnalités */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/ipm')}>
            <Ionicons name="people" size={28} color="#239C35" />
            <Text style={styles.featureText}>IPM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/pharmacie')}>
            <Ionicons name="medkit" size={28} color="#239C35" />
            <Text style={styles.featureText}>Pharmacie</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/medicament')}>
            <Ionicons name="flask" size={28} color="#239C35" />
            <Text style={styles.featureText}>Médicament</Text>
          </TouchableOpacity>
        </View>

        {/* Section des partenaires */}
        <View style={styles.partenairesSection}>
          <Text style={styles.partenairesTitle}>🤝 Nos Partenaires</Text>
          <View style={styles.logoRow}>
            {renderPartnerLogo(require('@/assets/images/Image1.png'), 'Pharmacie Khadim - Localisée sur l\'Avenue Général de Gaulle')}
            {renderPartnerLogo(require('@/assets/images/ipm.jpg'), 'IPM Group - Votre IPM de tous les jours')}
            {renderPartnerLogo(require('@/assets/images/Lat.jpg'), 'Pharmacie Lat Dior - Située sur l\'Avenue Léopold Sédar Senghor')}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#239C35',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  featureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    color: '#239C35',
    fontWeight: '600',
    textAlign: 'center',
  },
  partenairesSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  partenairesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#239C35',
    marginBottom: 15,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  partnerLogoContainer: {
    flexDirection: 'row', // Alignement horizontal (logo + texte)
    alignItems: 'center', // Centrage vertical
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  partnerDescription: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
});
