import { Stack } from 'expo-router';

import { Image, StyleSheet, View } from 'react-native';

import { ScreenContent } from '@/components/ScreenContent';
import { ScrollView, Text } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
        <ScrollView style={{ flex: 1, marginTop: 16 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View
              key={i}
              style={{
                padding: 16,
                marginBottom: 12,
                backgroundColor: '#f2f2f2',
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Image {i + 1}</Text>
              <Image
                source={{ uri: `https://picsum.photos/seed/${i}/200/120` }}
                style={{ width: 200, height: 120, borderRadius: 8 }}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
        {/* Test Navigation Button */}
        {/* <TouchableOpacity
          onPress={() => router.push('/profile-details')}
          className="mx-10 mt-6 h-14 items-center justify-center rounded-[15px] bg-[#FA5EFF]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
          }}>
          <Text className="font-roboto text-base font-bold text-white">Go to Profile Details</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
