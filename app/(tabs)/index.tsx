import RizzCard from '@/components/discover/RizzCard';
import { getImages } from '@/utils/get-images';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SwipeButton from '../../components/discover/SwipeButton';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function Discover() {
  const [soulmates, setSoulMates] = useState([...Array(5)]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'idle' | 'undo'>('idle');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="shadow-md shadow-black/50" style={styles.container}>
        {soulmates.map((_, index) => (
          <RizzCard
            swipeDirection={swipeDirection}
            setSwipeDirection={setSwipeDirection}
            currentIndex={currentIndex}
            profile={{
              images: getImages(),
              firstName: 'Foo',
              lastName: 'Bar',
            }}
            length={soulmates.length}
            key={index}
            index={index}
            onSwipeLeft={() => {
              if (currentIndex < soulmates.length) setCurrentIndex(currentIndex + 1);
            }}
            onSwipeRight={() => {
              if (currentIndex < soulmates.length) setCurrentIndex(currentIndex + 1);
            }}
            onUndoSwipe={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
          />
        ))}
      </View>
      <View className="bottom-36 m-auto flex flex-row gap-8">
        <SwipeButton
          onPress={() => {
            setSwipeDirection('left');
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={45} name="cross" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            setSwipeDirection('undo');
          }}
          className="h-20 w-20 bg-white shadow-md shadow-amber-400"
          icon={<Entypo size={45} name="back" color={'#fbbf24'} />}
        />
        <SwipeButton
          onPress={() => {
            setSwipeDirection('right');
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
