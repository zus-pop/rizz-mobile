import Feather from '@expo/vector-icons/Feather';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRIMARY_COLOR = '#090026';
const SECONDARY_COLOR = '#FA5EFF';

const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
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
  return (
    <Animated.View entering={bottomTabAnimation} style={styles.container}>
      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedPressable
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : 'transparent' },
            ]}>
            {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECONDARY_COLOR)}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}>
                {label as string}
              </Animated.Text>
            )}
          </AnimatedPressable>
        );
      })}
    </Animated.View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    const ICON_SIZE = 28;
    switch (routeName) {
      case 'discover':
        return <Feather name="home" size={ICON_SIZE} color={color} />;
      case 'liked':
        return <Feather name="heart" size={ICON_SIZE} color={color} />;
      case 'chat':
        return <Feather name="message-circle" size={ICON_SIZE} color={color} />;
      default:
        return <Feather name="home" size={ICON_SIZE} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: '60%',
    alignSelf: 'center',
    bottom: 5,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 13,
    borderRadius: 30,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: '800',
  },
});

export default MyTabBar;
