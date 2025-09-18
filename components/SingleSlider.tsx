import React from 'react';
import { View, Text, LayoutRectangle, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  clamp,
  withTiming,
} from 'react-native-reanimated';

type SingleSliderProps = {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
};

export default function SingleSlider({ min, max, value, onValueChange }: SingleSliderProps) {
  // Define the accent color
  const ACCENT_COLOR = '#fa5eff';
  const THUMB_SIZE = 24;

  // Track layout information
  const [trackLayout, setTrackLayout] = React.useState<LayoutRectangle | null>(null);

  // For displaying current value
  const [currentValue, setCurrentValue] = React.useState(value);
  const [isDragging, setIsDragging] = React.useState(false);

  // Initialize position based on percentage
  const percentage = useSharedValue((value - min) / (max - min));
  const startPosition = useSharedValue(0);

  // Update when external value changes
  React.useEffect(() => {
    percentage.value = withTiming((value - min) / (max - min), { duration: 100 });
    setCurrentValue(value);
  }, [value, min, max]);

  const calculateValue = (percent: number): number => {
    return Math.round(min + percent * (max - min));
  };

  const updateValue = (percent: number) => {
    const newPercent = clamp(percent, 0, 1);
    const newValue = calculateValue(newPercent);
    setCurrentValue(newValue);
    onValueChange(newValue);
  };

  const updateDisplayValue = (percent: number) => {
    const newPercent = clamp(percent, 0, 1);
    const newValue = calculateValue(newPercent);
    setCurrentValue(newValue);
  };

  const onTrackLayout = (event: LayoutChangeEvent) => {
    setTrackLayout(event.nativeEvent.layout);
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startPosition.value = percentage.value;
      runOnJS(setIsDragging)(true);
    })
    .onUpdate((event) => {
      if (!trackLayout) return;

      // Calculate new percentage based on the gesture
      const newPercentage = clamp(
        startPosition.value + event.translationX / trackLayout.width,
        0,
        1
      );

      percentage.value = newPercentage;
      runOnJS(updateDisplayValue)(newPercentage);
    })
    .onEnd(() => {
      if (!trackLayout) return;
      runOnJS(updateValue)(percentage.value);
      runOnJS(setIsDragging)(false);
    });

  const thumbStyle = useAnimatedStyle(() => {
    if (!trackLayout) return {};
    const translateX = percentage.value * trackLayout.width;
    return {
      transform: [{ translateX }],
    };
  });

  const activeTrackStyle = useAnimatedStyle(() => {
    if (!trackLayout) return { width: 0 };
    return {
      width: percentage.value * trackLayout.width,
    };
  });

  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-gray-600">{min} km</Text>
        <Text className="text-gray-600">{max} km</Text>
      </View>

      {/* Current value indicator */}
      <View style={{ alignSelf: 'center', marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: ACCENT_COLOR,
            opacity: isDragging ? 1 : 0.7,
          }}>
          {currentValue} km
        </Text>
      </View>

      {/* Slider container */}
      <View style={{ height: 40, width: '100%', alignSelf: 'center' }}>
        {/* Track background - this is what we measure */}
        <View
          onLayout={onTrackLayout}
          style={{
            position: 'absolute',
            top: 19,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: '#e5e7eb',
            borderRadius: 1,
          }}
        />

        {/* Active track */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 19,
              left: 0,
              height: 2,
              backgroundColor: '#fa5eff',
              borderRadius: 1,
            },
            activeTrackStyle,
          ]}
        />

        {/* Thumb */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 9,
                left: -THUMB_SIZE / 2,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                backgroundColor: '#fa5eff',
                borderRadius: THUMB_SIZE / 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              thumbStyle,
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}
