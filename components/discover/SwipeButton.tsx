import { ViewProps } from 'react-native';
import { Button } from '../ui/button';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface SwipeButtonProps extends ViewProps {
  icon: React.ReactNode;
  onPress: () => void;
}

const SwipeButton = ({ icon, onPress, ...props }: SwipeButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(1000, withSpring(1));
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));
  return (
    <Animated.View style={[animatedButtonStyle]}>
      <Button
        onPress={onPress}
        size="lg"
        className={`items-center justify-center rounded-full p-0 ${props.className ?? ''}`}>
        {icon}
      </Button>
    </Animated.View>
  );
};

export default SwipeButton;
