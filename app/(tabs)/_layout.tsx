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
        // tabBarStyle: {
        //   position: 'absolute',
        //   height: 200,
        //   backgroundColor: 'transparent',
        //   elevation: 0,
        //   shadowOpacity: 0,
        // },
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="liked"
        options={{
          title: 'Liked',
        }}
      />
    </Tabs>
  );
}
