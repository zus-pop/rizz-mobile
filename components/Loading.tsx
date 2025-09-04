import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface LoadingProps {
  scale?: number;
}

const Loading = ({ scale = 1 }: LoadingProps) => {
  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
      <LottieView
        style={{ width: '100%', height: '100%', transform: [{ scale }] }}
        autoPlay
        loop
        source={require('@/assets/lottie/loading.zip')}
      />
    </Animated.View>
  );
};

export default Loading;
