import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
    FadeInDown,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import TabBarButton from './TabBarButton';

export default function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const bottomTabAnimation = useMemo(
    () =>
      FadeInDown.springify()
        .damping(8)
        .mass(1)
        .stiffness(30)
        .delay(1500)
        .randomDelay()
        .reduceMotion(ReduceMotion.Never)
        .withInitialValues({ transform: [{ translateY: 312 }] }),
    []
  );
  const [dimensions, setDimensions] = useState({ height: 100, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabBarPositionX = useSharedValue(0);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabBarPositionX.value }],
    };
  });

  return (
    <Animated.View
      entering={bottomTabAnimation}
      style={{
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
      <BlurView
        onLayout={onTabBarLayout}
        className="mx-20 flex-row items-center justify-between overflow-hidden rounded-full py-3 shadow-md shadow-black/50"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
        experimentalBlurMethod="dimezisBlurView"
        tint="systemMaterial"
        blurReductionFactor={88}
        intensity={100}>
        <Animated.View
          style={[
            animatedBackgroundStyle,
            {
              position: 'absolute',
            },
          ]}>
          <BlurView
            style={{
              backgroundColor: 'rgba(0,0,0,1)',
              borderRadius: 30,
              marginHorizontal: 12,
              height: dimensions.height - 15,
              width: buttonWidth - 25,
              overflow: 'hidden',
            }}
          />
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            tabBarPositionX.value = withSpring(buttonWidth * index, { duration: 2500 });

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              color={isFocused ? '#FA5EFF' : colors.text}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              routeName={route.name}
              label={label as string}
            />
          );
        })}
      </BlurView>
    </Animated.View>
  );
}
