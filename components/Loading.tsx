import LottieView from 'lottie-react-native';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface LoadingProps {
  scale?: number;
  containerStyle?: StyleProp<ViewStyle>;
  animationStyle?: StyleProp<ViewStyle>;
  duration?: number; // Animation duration in ms
  backgroundColor?: string;
}

const Loading = ({
  scale = 1,
  containerStyle,
  animationStyle,
  duration = 300,
  backgroundColor,
}: LoadingProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(duration)}
      style={[styles.container, backgroundColor ? { backgroundColor } : undefined, containerStyle]}>
      <LottieView
        style={[styles.animation, { transform: [{ scale }] }, animationStyle]}
        autoPlay
        loop
        source={require('@/assets/lottie/loading.zip')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default Loading;
