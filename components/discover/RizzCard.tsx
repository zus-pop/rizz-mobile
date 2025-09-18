import { WINDOW } from '@/constants/sizes';
import { Profile } from '@/types/profile';
import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';
import { snapPoint } from 'react-native-redash';
import FlipCard from '../FlipCard';
import BackCard from './BackCard';
import FrontCard from './FrontCard';

const { width, height } = WINDOW;
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = height * 0.55;
const SIDE = (width + CARD_WIDTH + 80) / 2;
const DURATION = 100;
const LEFT_SWIPE_THRESH_HOLD = -SIDE;
const RIGHT_SWIPE_THRESH_HOLD = SIDE;
const SNAP_POINTS = [LEFT_SWIPE_THRESH_HOLD, 0, RIGHT_SWIPE_THRESH_HOLD];

const SPRING_CONFIG: SpringConfig = {
  damping: 25,
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
  const isFlipped = useSharedValue(false);

  // Simplified constants
  const perspective = useMemo(() => 888, []);
  const damping = useMemo(() => 30, []);
  const theta = useMemo(() => Math.random() * 20 - 10, []);
  const xValue = useMemo(() => 20, []);
  const isPanning = useSharedValue<boolean>(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height - 300);
  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);
  const rotateX = useSharedValue(30);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  // Simplified opacity calculation
  const opacity = useDerivedValue(() =>
    index >= currentIndex.value && index < currentIndex.value + maxVisible
      ? withTiming(1, { easing: Easing.inOut(Easing.ease) })
      : withTiming(0, { easing: Easing.inOut(Easing.ease) })
  );

  useDerivedValue(() => {
    'worklet';
    if (!isPanning.value) {
      rotateZ.value = withSpring(0, SPRING_CONFIG);
    }
    if (currentIndex.value === index && initialDone.value) {
      scale.value = withSpring(1.32, SPRING_CONFIG);
      rotateX.value = withSpring(0, SPRING_CONFIG);
    } else {
      rotateX.value = withSpring(xValue, SPRING_CONFIG); // Lying down
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
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            runOnJS(onSwipeLeft)();
            swipeDirection.value = 'idle';
            isFlipped.value = false;
          } else {
            // Ensure non-current cards remain lying down
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
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
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            runOnJS(onSwipeRight)();
            swipeDirection.value = 'idle';
            isFlipped.value = false;
          } else {
            // Ensure non-current cards remain lying down
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          break;
        case 'undo':
          if (currentIndex.value === index) {
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            isFlipped.value = false;
          }
          if (currentIndex.value - 1 === index) {
            translateX.value = withSpring(0, { velocity, ...SPRING_CONFIG });
            scale.value = withTiming(1, TIMING_CONFIG);
            rotateZ.value = withTiming(Math.random() * 20 - 10, TIMING_CONFIG);
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            runOnJS(onUndoSwipe)();
            isFlipped.value = false;
          }
          // Ensure non-current cards remain lying down during undo
          if (currentIndex.value !== index && currentIndex.value - 1 !== index) {
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          if (index === length - 1) swipeDirection.value = 'idle';
          break;
        case 'idle':
          // Ensure non-current cards remain in lying down state when idle
          if (currentIndex.value !== index) {
            rotateX.value = withTiming(xValue, TIMING_CONFIG);
            scale.value = withTiming(1, TIMING_CONFIG);
          }
          break;
      }
    }
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(() => {
      isPanning.value = true;
      if (currentIndex.value === index) {
        prevX.value = translateX.value;
        prevY.value = translateY.value;
        // scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
        // rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      }
    })
    .onUpdate(({ translationX, translationY, velocityX }) => {
      if (currentIndex.value === index) {
        translateX.value = prevX.value + translationX;
        translateY.value = prevY.value + translationY;
        // Smooth rotateZ animation based on translation distance
        const progress = translationX / 200; // Adjust divisor for sensitivity
        const clampedProgress = Math.max(-1, Math.min(1, progress)); // Clamp between -1 and 1

        // Interpolate between -20 and +20 degrees based on progress
        rotateZ.value = clampedProgress * 15;
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

        if (dest === LEFT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeLeft)();
          if (isFlipped.value) isFlipped.value = false;
        } else if (dest === RIGHT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeRight)();
          if (isFlipped.value) isFlipped.value = false;
        }
      }
      isPanning.value = false;
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
    isFlipped.value = !isFlipped.value;
  };

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-0 -bottom-20 flex-1 items-center justify-center"
      style={{ zIndex: reverse ? index : length - index }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedCardStyle, cardStyles.cardContainer]}>
          <FlipCard
            isFlipped={isFlipped}
            cardStyle={styles.flipCard}
            RegularContent={<FrontCard profile={profile} />}
            FlippedContent={
              <BackCard
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                profile={profile}
                currentIndex={currentIndex}
                index={index}
              />
            }
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  flipCard: {
    backfaceVisibility: 'hidden',
  },
});
export default RizzCard;
