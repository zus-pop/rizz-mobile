import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  StyleProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface FlipCardProps {
  isFlipped: SharedValue<boolean>;
  cardStyle: StyleProps;
  direction?: 'x' | 'y';
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
}

export default function FlipCard({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}: FlipCardProps) {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    const zIndex = isFlipped.value ? 1 : 2;
    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
      zIndex: zIndex,
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    const zIndex = isFlipped.value ? 2 : 1;
    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
      zIndex: zIndex,
    };
  });

  return (
    <View>
      <Animated.View style={[flipCardStyles.regularCard, cardStyle, regularCardAnimatedStyle]}>
        {RegularContent}
      </Animated.View>
      <Animated.View style={[flipCardStyles.flippedCard, cardStyle, flippedCardAnimatedStyle]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
}

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
  },
  flippedCard: {},
});
