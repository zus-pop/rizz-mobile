import { Link, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, useColorScheme } from 'react-native';

// Bạn có thể tạo một component dùng chung cho icon trên tab bar
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FA5EFF', // Màu hồng chủ đạo khi tab được chọn
        tabBarInactiveTintColor: 'gray',   // Màu xám khi tab không được chọn
        tabBarShowLabel: false,          // Ẩn tên của các tab
        tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            height: 80, // Tăng chiều cao cho thanh tab
            paddingBottom: 10,
        },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index" // Tên tệp: app/(tabs)/index.tsx
        options={{
          title: 'Rizz', // Tiêu đề hiển thị trên header
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="liked" // Tên tệp: app/(tabs)/liked.tsx
        options={{
          title: 'Đã thích',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}
