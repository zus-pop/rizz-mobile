import { fetchProfiles } from '@/api/profile';
import RizzCard from '@/components/discover/RizzCard';
import SwipeButton from '@/components/discover/SwipeButton';
import { Entypo } from '@expo/vector-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';

export default function Discover() {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: ({ pageParam }) => fetchProfiles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const currentIndex = useSharedValue<number>(0);
  const swipeDirection = useSharedValue<'left' | 'right' | 'idle' | 'undo'>('idle');
  const swipeButtonActionSize = useMemo(() => 30, []);
  const MAX_VISIBLE = useMemo(() => 3, []);
  const soulmates = useMemo(() => {
    if (!data) return null;
    return data.pages.flatMap((p) => p.profiles);
  }, [data]);

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
      <Stack.Screen options={{ headerShown: true }} />
      <View className="z-10 shadow-md shadow-black/50" style={styles.container}>
        {soulmates.map((item, index) => (
          <RizzCard
            maxVisible={MAX_VISIBLE}
            swipeDirection={swipeDirection}
            currentIndex={currentIndex}
            profile={item}
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
      <View className="bottom-36 z-20 m-auto flex flex-row gap-8">
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'left';
          }}
          className="h-16 w-16 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={swipeButtonActionSize} name="cross" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'undo';
          }}
          className="h-16 w-16 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={swipeButtonActionSize} name="back" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'right';
          }}
          className="h-16 w-16 bg-white shadow-md shadow-purple-400"
          icon={<Entypo size={swipeButtonActionSize} name="heart" color={'#c084fc'} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
