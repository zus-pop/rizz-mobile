import { router, Tabs } from 'expo-router';

import MyTabBar from '@/components/bottom-tabs/MyTabBar';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: 'pink',
        tabBarShowLabel: false,
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          tabBarLabel: 'Discover',
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          title: 'Liked',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          headerTitle: 'Profile',
          headerTintColor: '#fa5eff',
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600' },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/settings')}>
              <Ionicons name="settings-outline" size={28} color="#fa5eff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
