import { fetchProfiles } from '@/api/profile';
import AnimatedSwitch from '@/components/AnimatedSwitch';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import RizzCard from '@/components/discover/RizzCard';
import SwipeButton from '@/components/discover/SwipeButton';
import {
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetView,
  CustomBackdrop,
} from '@/components/ui/bottom-sheet';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import { getHeaderTitle } from '@react-navigation/elements';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';

export default function Discover() {
  const lookingForOptions = useMemo(
    () => ['Long-term relationship', 'Something casual', 'New friends', 'Still figuring it out'],
    []
  );
  const interests = useMemo(
    () => ['Music', 'Travel', 'Photography', 'Sports', 'Art', 'Food', 'Movies', 'Gaming'],
    []
  );

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: ({ pageParam }) => fetchProfiles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 30 * 1000,
  });

  const currentIndex = useSharedValue<number>(0);
  const swipeDirection = useSharedValue<'left' | 'right' | 'idle' | 'undo'>('idle');
  const swipeButtonActionSize = useMemo(() => 40, []);
  const MAX_VISIBLE = useMemo(() => 3, []);
  const enableDeviceMotion = useSharedValue<boolean>(false);

  // Bottom sheet reference
  const filterBottomSheetRef = useRef<BottomSheetModal>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['75%'], []);

  const soulmates = useMemo(() => {
    if (!data) return null;
    return data.pages.flatMap((p) => p.profiles);
  }, [data]);

  // Bottom sheet handlers
  const handlePresentFilterSheet = useCallback(() => {
    filterBottomSheetRef.current?.present();
  }, []);

  const handleCloseFilterSheet = useCallback(() => {
    filterBottomSheetRef.current?.dismiss();
  }, []);

  useAnimatedReaction(
    () => currentIndex.value,
    (value) => {
      if (!soulmates) return;
      if (value === soulmates.length - MAX_VISIBLE) {
        runOnJS(fetchNextPage)();
      }
    }
  );

  if (!soulmates) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Discover',
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);

            return <DiscoverHeader title={title} onFilterPress={handlePresentFilterSheet} />;
          },
          headerTransparent: true,
        }}
      />
      <View
        className="-bottom-10 z-10 shadow-md shadow-black/50"
        style={styles.container}
        pointerEvents="box-none">
        {soulmates.map((item, index) => (
          <RizzCard
            maxVisible={MAX_VISIBLE}
            swipeDirection={swipeDirection}
            currentIndex={currentIndex}
            profile={item}
            enableDeviceMotion={enableDeviceMotion}
            length={soulmates.length}
            key={index}
            index={index}
            onSwipeLeft={() => {
              if (currentIndex.value < soulmates.length) currentIndex.value += 1;
            }}
            onSwipeRight={() => {
              if (currentIndex.value < soulmates.length) currentIndex.value += 1;
            }}
            onUndoSwipe={() => {
              if (currentIndex.value > 0) currentIndex.value -= 1;
            }}
          />
        ))}
      </View>
      <View className="bottom-28 z-20 m-auto flex flex-row gap-8">
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'left';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={swipeButtonActionSize} name="cross" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'undo';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={swipeButtonActionSize} name="back" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'right';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-purple-400"
          icon={<Entypo size={swipeButtonActionSize} name="heart" color={'#c084fc'} />}
        />
      </View>

      {/* Filter Bottom Sheet */}
      <BottomSheetModal
        ref={filterBottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <CustomBackdrop {...props} onPress={handleCloseFilterSheet} />
        )}
        backgroundStyle={{ backgroundColor: '#f9fafb' }}
        handleComponent={BottomSheetHandle}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView className="flex-1">
          {/* Header - Fixed */}
          <View className="mb-4 flex-row items-center justify-between px-6 pt-4">
            <Text className="text-2xl font-bold text-gray-900">Filters</Text>
            <TouchableOpacity
              onPress={handleCloseFilterSheet}
              className="rounded-full bg-gray-200 p-2">
              <MaterialIcons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="px-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            bounces={true}
            overScrollMode="auto"
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled">
            {/* Age Range Section */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Age Range</Text>
              <View className="rounded-lg bg-white p-4 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">18</Text>
                  <View className="mx-4 h-1 flex-1 rounded bg-purple-200">
                    <View className="h-1 w-1/2 rounded bg-purple-500" />
                  </View>
                  <Text className="text-gray-600">50</Text>
                </View>
                <Text className="mt-2 text-center text-sm text-gray-500">18 - 35 years old</Text>
              </View>
            </View>

            {/* Distance Section */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Distance</Text>
              <View className="rounded-lg bg-white p-4 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">1 km</Text>
                  <View className="mx-4 h-1 flex-1 rounded bg-purple-200">
                    <View className="h-1 w-3/4 rounded bg-purple-500" />
                  </View>
                  <Text className="text-gray-600">100 km</Text>
                </View>
                <Text className="mt-2 text-center text-sm text-gray-500">Within 25 km</Text>
              </View>
            </View>

            {/* Interests Section */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Interests</Text>
              <View className="flex-row flex-wrap gap-2">
                <LegendList
                  data={interests}
                  keyExtractor={(item) => item}
                  renderItem={({ item: interest }) => (
                    <TouchableOpacity
                      key={interest}
                      className="mb-2 mr-2 rounded-full border border-purple-200 bg-white px-4 py-2">
                      <Text className="text-purple-600">{interest}</Text>
                    </TouchableOpacity>
                  )}
                  numColumns={3}
                  scrollEnabled={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                />
              </View>
            </View>
            {/* Enable Device Motion Section */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <Text className="text-lg font-semibold text-gray-800">Device Motion</Text>
                <AnimatedSwitch
                  value={enableDeviceMotion}
                  onPress={() => {
                    enableDeviceMotion.value = !enableDeviceMotion.value;
                  }}
                  trackColors={{
                    off: '#d1d5db',
                    on: '#a78bfa',
                  }}
                  duration={300}
                />
              </View>
              <Text className="ml-1 mt-1 text-sm text-gray-500">
                Tilt your phone to swipe cards.
              </Text>
            </View>
            {/* Looking For Section */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-gray-800">Looking For</Text>
              <View className="space-y-2">
                <LegendList
                  data={lookingForOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item: option }) => (
                    <TouchableOpacity className="flex-row items-center rounded-lg bg-white p-4 shadow-sm">
                      <View className="mr-3 h-5 w-5 rounded-full border-2 border-purple-300" />
                      <Text className="text-gray-700">{option}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  scrollEnabled={false}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="mb-8 flex-row gap-4">
              <TouchableOpacity
                onPress={handleCloseFilterSheet}
                className="flex-1 rounded-lg border border-gray-300 bg-white py-3">
                <Text className="text-center font-semibold text-gray-700">Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCloseFilterSheet}
                className="flex-1 rounded-lg bg-purple-500 py-3">
                <Text className="text-center font-semibold text-white">Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
