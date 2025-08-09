import { WINDOW } from '@/constants/sizes';
import { Profile } from '@/types/profile';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  SensorType,
  SharedValue,
  useAnimatedReaction,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width, height } = WINDOW;
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = height * 0.55;
const SIDE = (width + CARD_WIDTH + 80) / 2;
const DURATION = 100;
const LEFT_SWIPE_THRESH_HOLD = -SIDE;
const RIGHT_SWIPE_THRESH_HOLD = SIDE;
const SNAP_POINTS = [LEFT_SWIPE_THRESH_HOLD, 0, RIGHT_SWIPE_THRESH_HOLD];

const SPRING_CONFIG = {
  damping: 30,
  stiffness: 100,
  mass: 1,
};

const MOTION_SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

const TIMING_CONFIG = {
  easing: Easing.inOut(Easing.ease),
};

interface RizzCardProps {
  index: number;
  length: number;
  profile: Profile;
  currentIndex: SharedValue<number>;
  swipeDirection: SharedValue<'left' | 'right' | 'idle' | 'undo'>;
  reverse?: boolean;
  maxVisible: number;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onUndoSwipe: () => void;
  enableDeviceMotion: SharedValue<boolean>; // New prop for device motion control
}

// Simplified component for better performance
const RizzCard = ({
  index,
  length,
  currentIndex,
  profile,
  swipeDirection,
  maxVisible,
  reverse,
  onSwipeLeft,
  onSwipeRight,
  onUndoSwipe,
  enableDeviceMotion,
}: RizzCardProps) => {
  const initialDone = useSharedValue(0);
  // Simplified constants
  const perspective = useMemo(() => 888, []);
  const damping = useMemo(() => 30, []);
  const theta = useMemo(() => Math.random() * 20 - 10, []);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height - 300);
  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);
  const rotateX = useSharedValue(30);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const isCardShowing = useSharedValue<boolean>(false);

  // Simplified opacity calculation
  const opacity = useDerivedValue(() =>
    index >= currentIndex.value && index < currentIndex.value + maxVisible
      ? withTiming(1, { easing: Easing.inOut(Easing.ease) })
      : withTiming(0, { easing: Easing.inOut(Easing.ease) })
  );

  const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 16,
  });

  useAnimatedReaction(
    () => enableDeviceMotion.value,
    () => {
      if (isCardShowing.value) isCardShowing.value = !isCardShowing.value;
    }
  );

  useDerivedValue(() => {
    'worklet';
    if (enableDeviceMotion.value && currentIndex.value === index && initialDone.value) {
      // Device motion is enabled and this is the current card
      const { z } = rotationGravity.sensor.value;

      scale.value = withSpring(
        interpolate(z, [-9.5, -8.5], [1, 1.32], Extrapolation.CLAMP),
        MOTION_SPRING_CONFIG
      );
      rotateX.value = withSpring(
        interpolate(z, [-9.5, -8.5], [30, 0], Extrapolation.CLAMP),
        MOTION_SPRING_CONFIG
      );
      rotateZ.value = withSpring(
        interpolate(z, [-9.5, -8.5], [theta, 0], Extrapolation.CLAMP),
        MOTION_SPRING_CONFIG
      );
    } else if (currentIndex.value !== index) {
      // Non-current cards should remain in lying down position
      rotateX.value = withSpring(30, SPRING_CONFIG); // Lying down
      scale.value = withSpring(1, SPRING_CONFIG); // Normal scale
      rotateZ.value = withSpring(theta, SPRING_CONFIG); // Original random rotation
    } else if (!enableDeviceMotion.value && currentIndex.value === index && !isCardShowing.value) {
      // Device motion disabled, current card, not showing - return to lying down
      rotateX.value = withSpring(30, SPRING_CONFIG); // Lying down
      scale.value = withSpring(1, SPRING_CONFIG); // Normal scale
      rotateZ.value = withSpring(theta, SPRING_CONFIG); // Original random rotation
    }
  });

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.out(Easing.quad),
      })
    );
    rotateZ.value = withDelay(
      delay,
      withTiming(theta, {
        duration: DURATION,
        easing: Easing.out(Easing.quad),
      })
    );
    initialDone.value = withDelay(delay + 1000, withTiming(1));
  }, [index, translateY, theta]);

  // Optimized card showing animation with motion isolation
  useAnimatedReaction(
    () => isCardShowing.value,
    () => {
      if (isCardShowing.value && currentIndex.value === index) {
        // Current card showing animation
        scale.value = withTiming(1.32, TIMING_CONFIG);
        rotateZ.value = withTiming(0, TIMING_CONFIG);
        rotateX.value = withTiming(0, TIMING_CONFIG);
      }

      if (!isCardShowing.value && currentIndex.value === index) {
        // Current card hiding animation
        scale.value = withTiming(1, TIMING_CONFIG);
        rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
        rotateX.value = withTiming(30, TIMING_CONFIG);
      }

      // Non-current cards should always remain lying down
      if (currentIndex.value !== index) {
        scale.value = withTiming(1, TIMING_CONFIG);
        rotateX.value = withTiming(30, TIMING_CONFIG); // Keep lying down
      }
    }
  );

  // Optimized swipe direction handling with motion isolation
  useAnimatedReaction(
    () => swipeDirection.value,
    (value) => {
      const velocity = 300;
      switch (value) {
        case 'left':
          if (currentIndex.value === index) {
            translateX.value = withSpring(LEFT_SWIPE_THRESH_HOLD, {
              velocity,
              ...SPRING_CONFIG,
            });
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(30, TIMING_CONFIG);
            runOnJS(onSwipeLeft)();
            swipeDirection.value = 'idle';
          } else {
            // Ensure non-current cards remain lying down
            rotateX.value = withTiming(30, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          break;
        case 'right':
          if (currentIndex.value === index) {
            translateX.value = withSpring(RIGHT_SWIPE_THRESH_HOLD, {
              velocity,
              ...SPRING_CONFIG,
            });
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(30, TIMING_CONFIG);
            runOnJS(onSwipeRight)();
            swipeDirection.value = 'idle';
          } else {
            // Ensure non-current cards remain lying down
            rotateX.value = withTiming(30, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          break;
        case 'undo':
          if (currentIndex.value === index && isCardShowing.value) {
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(30, TIMING_CONFIG);
            isCardShowing.value = !isCardShowing.value;
          }
          if (currentIndex.value - 1 === index) {
            translateX.value = withSpring(0, { velocity, ...SPRING_CONFIG });
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(30, TIMING_CONFIG);
            if (isCardShowing) isCardShowing.value = false;
            runOnJS(onUndoSwipe)();
          }
          // Ensure non-current cards remain lying down during undo
          if (currentIndex.value !== index && currentIndex.value - 1 !== index) {
            rotateX.value = withTiming(30, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          if (index === length - 1) swipeDirection.value = 'idle';
          break;
        case 'idle':
          // Ensure non-current cards remain in lying down state when idle
          if (currentIndex.value !== index) {
            rotateX.value = withTiming(30, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          break;
      }
    }
  );

  // Simplified pan gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (currentIndex.value === index) {
        prevX.value = translateX.value;
        prevY.value = translateY.value;
        scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
        rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      }
    })
    .onUpdate(({ translationX, translationY, velocityX }) => {
      if (currentIndex.value === index) {
        translateX.value = prevX.value + translationX;
        translateY.value = prevY.value + translationY;
      }
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      if (dest < LEFT_SWIPE_THRESH_HOLD) {
        swipeDirection.value = 'left';
      } else if (dest > RIGHT_SWIPE_THRESH_HOLD) {
        swipeDirection.value = 'right';
      } else {
        swipeDirection.value = 'idle';
      }
    })
    .onEnd(({ velocityX, velocityY }) => {
      if (currentIndex.value === index) {
        const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
        translateX.value = withSpring(dest, { velocity: velocityX, damping });
        translateY.value = withSpring(0, { velocity: velocityY, damping });
        scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
        rotateZ.value = withTiming(Math.random() * 20 - 10, { easing: Easing.inOut(Easing.ease) });
        if (isCardShowing) isCardShowing.value = false;

        if (dest === LEFT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeLeft)();
        } else if (dest === RIGHT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeRight)();
        }
      }
    });

  // Simplified animated style
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: perspective },
        { rotateX: `${rotateX.value}deg` },
        { rotateZ: `${rotateZ.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateY: `${rotateZ.value / 10}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const onPress = () => {
    // Only allow onPress scaling when device motion is disabled
    if (!enableDeviceMotion.value) {
      isCardShowing.value = !isCardShowing.value;
    }
  };

  const onLongPress = () => {
    console.log('Long');
  };

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-0 bottom-20 flex-1 items-center justify-center"
      style={{ zIndex: reverse ? index : length - index }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedCardStyle, styles.cardContainer]}>
          <TouchableOpacity activeOpacity={1} onLongPress={onLongPress} onPress={onPress}>
            <Card profile={profile} />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// Simplified Card component
function Card({ profile }: { profile: Profile }) {
  return (
    <Animated.View
      className="h-[55vh] w-[70vw] items-center justify-end overflow-hidden rounded-2xl border-2 border-neutral-900 bg-white shadow-lg"
      style={{
        elevation: 6,
      }}>
      {/* Card Image */}
      <Animated.Image
        source={{ uri: profile.images.at(0) }}
        className="absolute left-0 top-0 h-full w-full rounded-2xl"
        resizeMode="cover"
      />
      {/* Top symbols */}
      <View className="absolute left-4 top-3 z-10 flex-row items-center">
        <Text
          className="text-2xl font-bold text-white"
          style={{
            textShadowColor: '#000',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
          ♠
        </Text>
      </View>
      <View className="absolute right-4 top-3 z-10 flex-row items-center">
        <TouchableOpacity
          className="rounded-full p-2"
          onPress={() => {
            // Handle detail view here
          }}
          activeOpacity={0.85}>
          <FontAwesome name="info" color={'white'} size={20} />
        </TouchableOpacity>
      </View>
      {/* Info Overlay */}
      <View className="w-full rounded-b-2xl bg-white/70 px-5 pb-5 pt-4">
        <View className="items-center">
          <Text className="text-xl font-bold text-neutral-900">{`${profile.firstName} ${profile.lastName}`}</Text>
          <Text className="mt-1 text-base text-neutral-700">Age: {profile.age}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RizzCard;
