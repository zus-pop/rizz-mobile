import { WINDOW } from '@/constants/sizes';
import { Profile } from '@/types/profile';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width, height } = WINDOW;
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = height * 0.55;
const side = (width + CARD_WIDTH + 120) / 2;
const ASPECT_RATIO = 722 / 368;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 100;
const LEFT_SWIPE_THRESH_HOLD = -side;
const RIGHT_SWIPE_THRESH_HOLD = side;
const SNAP_POINTS = [LEFT_SWIPE_THRESH_HOLD, 0, RIGHT_SWIPE_THRESH_HOLD];

interface RizzCardProps {
  index: number;
  length: number;
  profile: Profile;
  currentIndex: number;
  swipeDirection: 'left' | 'right' | 'idle' | 'undo';
  reverse?: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onUndoSwipe: () => void;
  setSwipeDirection: Dispatch<SetStateAction<'left' | 'right' | 'idle' | 'undo'>>;
}

const RizzCard = ({
  index,
  length,
  currentIndex,
  profile,
  swipeDirection,
  reverse,
  onSwipeLeft,
  onSwipeRight,
  onUndoSwipe,
  setSwipeDirection,
}: RizzCardProps) => {
  const perspective = 888;
  const damping = 30;
  const img = profile.images[0];
  const theta = Math.random() * 20 - 10;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height - 300);
  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);
  const rotateX = useSharedValue(30);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const [isCardShowing, setIsCardShowing] = useState<boolean>(false);

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    );
    rotateZ.value = withDelay(
      delay,
      withTiming(theta, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, [index, translateY]);

  useEffect(() => {
    const velocity = 300;
    switch (swipeDirection) {
      case 'left':
        if (currentIndex === index) {
          translateX.value = withSpring(LEFT_SWIPE_THRESH_HOLD, { velocity, damping });
          scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
          rotateZ.value = withTiming(Math.random() * 20 - 10, {
            easing: Easing.inOut(Easing.ease),
          });
          rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });
          onSwipeLeft();
          setSwipeDirection('idle');
        }
        break;
      case 'right':
        if (currentIndex === index) {
          translateX.value = withSpring(RIGHT_SWIPE_THRESH_HOLD, { velocity, damping });
          scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
          rotateZ.value = withTiming(Math.random() * 20 - 10, {
            easing: Easing.inOut(Easing.ease),
          });
          rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });
          onSwipeRight();
          setSwipeDirection('idle');
        }
        break;
      case 'undo':
        if (currentIndex === index && isCardShowing) {
          scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
          rotateZ.value = withTiming(Math.random() * 20 - 10, {
            easing: Easing.inOut(Easing.ease),
          });
          rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });
        }
        if (currentIndex - 1 === index) {
          translateX.value = withSpring(0, { velocity, damping });
          scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
          rotateZ.value = withTiming(Math.random() * 20 - 10, {
            easing: Easing.inOut(Easing.ease),
          });
          rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });
        }
        onUndoSwipe();
        setSwipeDirection('idle');
        break;
      case 'idle':
        break;
    }
    setIsCardShowing(false);
  }, [swipeDirection]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (currentIndex === index) {
        prevX.value = translateX.value;
        prevY.value = translateY.value;
        scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
        rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
        //   rotateX.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      }
    })
    .onUpdate(({ translationX, translationY, velocityX }) => {
      if (currentIndex === index) {
        translateX.value = prevX.value + translationX;
        translateY.value = prevY.value + translationY;
        const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
        if (dest < LEFT_SWIPE_THRESH_HOLD) {
          runOnJS(setSwipeDirection)('left');
        } else if (dest > RIGHT_SWIPE_THRESH_HOLD) {
          runOnJS(setSwipeDirection)('right');
        } else {
          runOnJS(setSwipeDirection)('idle');
        }
      }
    })
    .onEnd(({ velocityX, velocityY }) => {
      if (currentIndex === index) {
        const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
        translateX.value = withSpring(dest, { velocity: velocityX, damping });
        translateY.value = withSpring(0, { velocity: velocityY, damping });
        scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
        rotateZ.value = withTiming(Math.random() * 20 - 10, { easing: Easing.inOut(Easing.ease) });
        //   rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });

        if (dest === LEFT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeLeft)();
        } else if (dest === RIGHT_SWIPE_THRESH_HOLD) {
          runOnJS(onSwipeRight)();
        }
      }
    });

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
    };
  });

  const onPress = () => {
    if (!isCardShowing && currentIndex === index) {
      scale.value = withTiming(1.3, { easing: Easing.inOut(Easing.ease) });
      rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      rotateX.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      setIsCardShowing(!isCardShowing);
      return;
    }

    if (isCardShowing && currentIndex === index) {
      scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
      rotateZ.value = withTiming(Math.random() * 20 - 10, { easing: Easing.inOut(Easing.ease) });
      rotateX.value = withTiming(30, { easing: Easing.inOut(Easing.ease) });
      setIsCardShowing(!isCardShowing);
      return;
    }
  };

  const onLongPress = () => {
    console.log('Long');
  };

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-0 bottom-20 flex-1 items-center justify-center"
      style={{ zIndex: reverse ? index : length - index }} // <-- Add zIndex so first card is on top
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedCardStyle, styles.card]}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: 20,
            }}
            onLongPress={onLongPress}
            onPress={onPress}>
            <Animated.Image
              //   blurRadius={index !== currentIndex ? 80 : 0}
              source={img}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 3.84,
    // elevation: 0.5,
  },
});

export default RizzCard;
