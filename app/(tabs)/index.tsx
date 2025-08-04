import RizzCard from '@/components/discover/RizzCard';
import SwipeButton from '@/components/discover/SwipeButton';
import { Profile } from '@/types/profile';
import { Entypo } from '@expo/vector-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { fetchProfiles } from '../../api/profile';

const data = [
  {
    firstName: 'Alice',
    lastName: 'Smith',
    age: 25,
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 28,
    images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167'],
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 22,
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'],
  },
  {
    firstName: 'Diana',
    lastName: 'Prince',
    age: 27,
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
  },
  {
    firstName: 'Ethan',
    lastName: 'Hunt',
    age: 30,
    images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca'],
  },
  {
    firstName: 'Fiona',
    lastName: 'Gallagher',
    age: 24,
    images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
  },
  {
    firstName: 'George',
    lastName: 'Miller',
    age: 29,
    images: ['https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0'],
  },
  {
    firstName: 'Hannah',
    lastName: 'Williams',
    age: 26,
    images: ['https://images.unsplash.com/photo-1519125323398-675f0ddb6308'],
  },
  {
    firstName: 'Ian',
    lastName: 'Curtis',
    age: 31,
    images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'],
  },
  {
    firstName: 'Julia',
    lastName: 'Roberts',
    age: 32,
    images: ['https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5'],
  },
];

export default function Discover() {
  const [soulmates, setSoulMates] = useState<Profile[]>(data);
  const { data: foo, fetchNextPage } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: ({ pageParam }) => fetchProfiles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const currentIndex = useSharedValue<number>(0);
  const swipeDirection = useSharedValue<'left' | 'right' | 'idle' | 'undo'>('idle');
  const MAX_VISIBLE = useMemo(() => 3, []);
  const result = useMemo(() => {
    if (!foo) return []

    return {
        soulmates: foo.pages.flatMap(p => p.profiles)
    }
  }, [foo])

  useEffect(() => {
    console.log(JSON.stringify(foo?.pages.flatMap(p => p.profiles), null, 2));
  }, [foo]);

  useAnimatedReaction(
    () => currentIndex.value,
    (value) => {
      if (value === soulmates.length - MAX_VISIBLE) {
        const newArray = [
          ...soulmates,
          ...[
            {
              firstName: 'Charlie',
              lastName: 'Brown',
              age: 22,
              images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'], // changed image
            },
            {
              firstName: 'Diana',
              lastName: 'Prince',
              age: 27,
              images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
            },
            {
              firstName: 'Ethan',
              lastName: 'Hunt',
              age: 30,
              images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca'],
            },
            {
              firstName: 'Fiona',
              lastName: 'Gallagher',
              age: 24,
              images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
            },
            {
              firstName: 'George',
              lastName: 'Miller',
              age: 29,
              images: ['https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0'],
            },
          ],
        ];
        runOnJS(setSoulMates)(newArray);
      }
    }
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="shadow-md shadow-black/50" style={styles.container}>
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
      <View className="bottom-36 m-auto flex flex-row gap-8">
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'left';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={45} name="cross" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            swipeDirection.value = 'undo';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={45} name="back" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            fetchNextPage();
            // swipeDirection.value = 'right';
          }}
          className="h-20 w-20 bg-white shadow-md shadow-purple-400"
          icon={<Entypo size={45} name="heart" color={'#c084fc'} />}
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
