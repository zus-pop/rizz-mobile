import { Feather } from '@expo/vector-icons';
import { JSX, useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
  isFocused: boolean;
  label: string;
  color: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabBarButton = ({
  color,
  routeName,
  isFocused,
  label,
  onLongPress,
  onPress,
}: TabBarButtonProps) => {
  const iconSize = useMemo(() => 30, []);
  const icons: Record<string, (props: any) => JSX.Element> = useMemo(
    () => ({
      index: (props: any) => <Feather name="home" size={iconSize} {...props} />,
      liked: (props: any) => <Feather name="heart" size={iconSize} {...props} />,
    }),
    []
  );

  const scale = useSharedValue(0);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleIcon = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 12]);

    return {
      transform: [{ scale: scaleIcon }],
      top,
    };
  });

  useDerivedValue(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  return (
    <AnimatedPressable
      className="flex-1 items-center justify-center"
      key={routeName}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}>
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]
          ? icons[routeName]({
              color: color,
            })
          : null}
      </Animated.View>
      <Animated.Text style={[{ color: color, fontSize: 18 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default TabBarButton;
