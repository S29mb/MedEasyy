// ✅ Fichier : app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Affiche la page de connexion (index.tsx) d'abord */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Groupe de navigation principale avec tab bar */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Autres écrans non inclus dans la tab bar */}
        <Stack.Screen name="ipm" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="pharmacie" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="medicament" options={{ presentation: 'modal', headerShown: false }} />

        {/* Page 404 par défaut */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
