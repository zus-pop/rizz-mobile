import { WINDOW } from '@/constants/sizes';
import { Profile } from '@/types/profile';
import { useEffect, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      className="absolute inset-0 -bottom-20 flex-1 items-center justify-center"
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
  const currentImageIndex = useSharedValue(0);
  const imageCount = profile.images.length;
  const getProgressBarStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = currentImageIndex.value === index;
      return {
        backgroundColor: withTiming(isActive ? 'white' : 'rgba(255, 255, 255, 0.3)', {
          duration: 300,
        }),
      };
    });
  };

  const navigateToPrevious = () => {
    'worklet';
    if (currentImageIndex.value > 0) {
      currentImageIndex.value = currentImageIndex.value - 1;
    }
  };

  const navigateToNext = () => {
    'worklet';
    if (currentImageIndex.value < imageCount - 1) {
      currentImageIndex.value = currentImageIndex.value + 1;
    }
  };

  return (
    <Animated.View
      className="border-black-800 h-[55vh] w-[70vw] overflow-hidden rounded-2xl border-[0.8px] shadow-lg"
      style={{ elevation: 6 }}>
      {/* Progress indicators */}
      <View className="absolute left-2 right-2 top-2 z-10 flex-row space-x-1">
        {profile.images.map((_, index) => (
          <Animated.View
            key={index}
            className="h-1 flex-1 rounded-full"
            style={getProgressBarStyle(index)}
          />
        ))}
      </View>

      {/* Card Images */}
      {profile.images.map((imageSource, index) => {
        const imageAnimatedStyle = useAnimatedStyle(() => {
          return {
            opacity: currentImageIndex.value === index ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          };
        });

        return (
          <Animated.View key={index} style={imageAnimatedStyle}>
            <Image
              source={{ uri: imageSource }}
              style={{ flex: 1, width: '100%', height: '100%' }}
            />
          </Animated.View>
        );
      })}

      {/* General dark overlay for the entire image */}
      <View className="absolute inset-0 bg-black/20" />

      {/* Tap zones for navigation - only when there are multiple images */}
      {imageCount > 1 && (
        <View className="absolute inset-0 flex-row" pointerEvents="box-none">
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => {
              runOnJS(navigateToPrevious)();
            }}
          />
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => {
              runOnJS(navigateToNext)();
            }}
          />
        </View>
      )}

      {/* Dark overlay for text contrast */}
      <View className="absolute bottom-0 left-0 right-0 h-1/5 bg-black/50" />

      {/* Text Overlay */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-end justify-between p-5">
        {/* Left side - Common info */}
        <View className="flex-1">
          <Text className="mb-1 text-2xl font-bold text-white">
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text className="text-lg text-white/90">Age: {profile.age}</Text>
        </View>

        {/* Right side - View detail trigger */}
        <TouchableOpacity
          className="ml-4 rounded-full bg-white/20 p-3"
          activeOpacity={0.7}
          onPress={() => {
            console.log('View details for:', profile.firstName);
          }}>
          <Text className="font-semibold text-white">ℹ️</Text>
        </TouchableOpacity>
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
