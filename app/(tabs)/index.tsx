import { Stack, router } from 'expo-router';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />

        {/* Test Navigation Button */}
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
