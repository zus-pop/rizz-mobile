import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface CustomBackdropProps extends BottomSheetBackdropProps {
  onPress?: () => void;
}

const CustomBackdrop = ({ animatedIndex, style, onPress }: CustomBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

export default CustomBackdrop;
