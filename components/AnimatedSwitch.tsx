import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';

interface AnimatedSwitchProps {
  value: SharedValue<boolean>;
  onPress: () => void;
  style?: ViewStyle;
  duration?: number;
  trackColors: { on: string; off: string };
}

export default function AnimatedSwitch({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: '#82cab2', off: '#fa7f7c' },
}: AnimatedSwitchProps) {
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const animatedValue = useSharedValue(0); // Start with 0, let useAnimatedReaction handle initial value

  // React to value changes and animate accordingly
  useAnimatedReaction(
    () => value.value,
    (newValue, prevValue) => {
      // On first run (prevValue is null), set immediately without animation
      if (prevValue === null) {
        animatedValue.value = newValue ? 1 : 0;
      } else {
        animatedValue.value = withTiming(newValue ? 1 : 0, { duration });
      }
    },
    [duration] // Add dependencies to avoid stale closures
  );

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(animatedValue.value, [0, 1], [trackColors.off, trackColors.on]);
    const radius = height.value > 0 ? height.value / 2 : 20; // Fallback radius

    return {
      backgroundColor: color,
      borderRadius: radius,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(animatedValue.value, [0, 1], [0, width.value - height.value]);
    const radius = height.value > 0 ? height.value / 2 : 20; // Fallback radius

    return {
      transform: [{ translateX: moveValue }],
      borderRadius: radius,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}>
        <Animated.View style={[switchStyles.thumb, thumbAnimatedStyle]}></Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const switchStyles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    width: 80,
    height: 40,
    padding: 5,
    borderRadius: 20, // Add initial borderRadius to prevent glitch
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 20, // Add initial borderRadius to prevent glitch
  },
});
