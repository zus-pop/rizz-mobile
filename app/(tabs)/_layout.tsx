import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
// Không cần import Header ở đây nữa

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'pink',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      {/* SỬA LỖI: Ẩn header mặc định và không định nghĩa header ở đây */}
      <Tabs.Screen
        name="message"
        options={{
          headerShown: false, // <-- Quan trọng: Ẩn header của tab
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
        }}
      />
    </Tabs>
  );
}
