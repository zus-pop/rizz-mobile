import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface InfoProps {
  scale?: number;
}

const Info = ({ scale = 1 }: InfoProps) => {
  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
      <LottieView
        style={{ width: '100%', height: '100%', transform: [{ scale }] }}
        autoPlay
        loop
        source={require('@/assets/lottie/info.zip')}
      />
    </Animated.View>
  );
};

export default Info;
