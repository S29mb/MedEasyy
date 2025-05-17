import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>

      <Text style={styles.info}>Entrez votre adresse email pour recevoir un lien de réinitialisation.</Text>

      <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />

      <Button title="Envoyer" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
  },
  info: {
    textAlign: 'center', marginBottom: 20, color: '#666',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 16,
  },
});
