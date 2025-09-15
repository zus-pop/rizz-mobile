import { Tabs } from 'expo-router';

import MyTabBar from '@/components/bottom-tabs/MyTabBar';

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
    </Tabs>
  );
}
