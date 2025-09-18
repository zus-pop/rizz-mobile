import React from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  clamp,
} from 'react-native-reanimated';

type RangeSliderProps = {
  min: number;
  max: number;
  values: [number, number];
  onValuesChange: (values: [number, number]) => void;
};

export default function RangeSlider({ min, max, values, onValuesChange }: RangeSliderProps) {
  // Define the accent color
  const ACCENT_COLOR = '#fa5eff';
  const SLIDER_WIDTH = 280;
  const THUMB_SIZE = 20;

  // Add a ref for the slider container
  const sliderContainerRef = React.useRef<View>(null);
  const [containerX, setContainerX] = React.useState(0);

  // For displaying current values
  const [currentValues, setCurrentValues] = React.useState<[number, number]>(values);
  const [isDragging, setIsDragging] = React.useState(false);

  const leftThumb = useSharedValue(((values[0] - min) / (max - min)) * SLIDER_WIDTH);
  const rightThumb = useSharedValue(((values[1] - min) / (max - min)) * SLIDER_WIDTH);

  // Measure the container position when mounted - reduced delay for faster startup
  React.useEffect(() => {
    setTimeout(() => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
          setContainerX(pageX);
        });
      }
    }, 100); // Reduced delay for faster initial render
  }, []);

  // Update thumb positions when values change from outside
  React.useEffect(() => {
    const leftPosition = ((values[0] - min) / (max - min)) * SLIDER_WIDTH;
    const rightPosition = ((values[1] - min) / (max - min)) * SLIDER_WIDTH;
    leftThumb.value = leftPosition;
    rightThumb.value = rightPosition;
    setCurrentValues(values);
  }, [values, min, max]);

  const updateValues = () => {
    const leftValue = Math.round(min + (leftThumb.value / SLIDER_WIDTH) * (max - min));
    const rightValue = Math.round(min + (rightThumb.value / SLIDER_WIDTH) * (max - min));
    setCurrentValues([leftValue, rightValue]);
    onValuesChange([leftValue, rightValue]);
  };

  // This function updates the display values during dragging without triggering the actual value change
  const updateDisplayValues = () => {
    const leftValue = Math.round(min + (leftThumb.value / SLIDER_WIDTH) * (max - min));
    const rightValue = Math.round(min + (rightThumb.value / SLIDER_WIDTH) * (max - min));
    setCurrentValues([leftValue, rightValue]);
  };

  const measureContainer = () => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setContainerX(pageX);
      });
    }
  };

  const leftGesture = Gesture.Pan()
    .onBegin(() => {
      // Remeasure container position on each gesture start to ensure accuracy
      runOnJS(measureContainer)();
      runOnJS(setIsDragging)(true);
    })
    .onUpdate((event) => {
      // Calculate relative position within the slider
      const relativeX = event.absoluteX - containerX;
      leftThumb.value = clamp(relativeX, 0, rightThumb.value - THUMB_SIZE);
      runOnJS(updateDisplayValues)();
    })
    .onEnd(() => {
      runOnJS(updateValues)();
      runOnJS(setIsDragging)(false);
    });

  const rightGesture = Gesture.Pan()
    .onBegin(() => {
      // Remeasure container position on each gesture start to ensure accuracy
      runOnJS(measureContainer)();
      runOnJS(setIsDragging)(true);
    })
    .onUpdate((event) => {
      // Calculate relative position within the slider
      const relativeX = event.absoluteX - containerX;
      rightThumb.value = clamp(relativeX, leftThumb.value + THUMB_SIZE, SLIDER_WIDTH);
      runOnJS(updateDisplayValues)();
    })
    .onEnd(() => {
      runOnJS(updateValues)();
      runOnJS(setIsDragging)(false);
    });

  const trackStyle = useAnimatedStyle(() => ({
    left: leftThumb.value,
    width: rightThumb.value - leftThumb.value,
  }));

  const leftThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftThumb.value - THUMB_SIZE / 2 }],
  }));

  const rightThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightThumb.value - THUMB_SIZE / 2 }],
  }));

  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg text-gray-600">{min}</Text>
        <Text className="text-lg text-gray-600">{max}</Text>
      </View>

      {/* Current values indicator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ACCENT_COLOR,
            opacity: isDragging ? 1 : 0.7,
          }}>
          {currentValues[0]} - {currentValues[1]}
        </Text>
      </View>

      <View
        ref={sliderContainerRef}
        style={{ height: 40, width: SLIDER_WIDTH, alignSelf: 'center' }}>
        {/* Track background */}
        <View
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
              height: 2,
              backgroundColor: ACCENT_COLOR,
              borderRadius: 1,
            },
            trackStyle,
          ]}
        />

        {/* Left thumb */}
        <GestureDetector gesture={leftGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 10,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                backgroundColor: ACCENT_COLOR,
                borderRadius: THUMB_SIZE / 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              leftThumbStyle,
            ]}
          />
        </GestureDetector>

        {/* Right thumb */}
        <GestureDetector gesture={rightGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 10,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                backgroundColor: ACCENT_COLOR,
                borderRadius: THUMB_SIZE / 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              rightThumbStyle,
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}
