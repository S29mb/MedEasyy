import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000c',
        tabBarStyle: {
          backgroundColor: '#239C35',     // ✅ Fond vert
          borderTopLeftRadius: 20,         // ✅ Coins arrondis
          borderTopRightRadius: 20,
          height: 50,
          position: 'absolute',            // ✅ Nécessaire pour arrondir
          left: 10,
          right: 10,
          bottom: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'accueil':
              iconName = 'home';
              break;
            case 'commande':
              iconName = 'cart';
              break;
            case 'profile':
              iconName = 'person';
              break;
            default:
              iconName = 'ellipse-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="accueil" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="commande" options={{ title: 'Commande' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
      <Tabs.Screen name="ipm" options={{ href: null }} />
      <Tabs.Screen name="pharmacie" options={{ href: null }} />
      <Tabs.Screen name="medicament" options={{ href: null }} />
    </Tabs>
  );
}
