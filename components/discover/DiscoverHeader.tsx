import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Or use react-native-vector-icons/Ionicons
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/text';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface DiscoverHeaderProps {
  onFilterPress?: () => void;
  title: string;
}

const AnimatedTouchOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const DiscoverHeader = ({ onFilterPress, title }: DiscoverHeaderProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      className="h-28 w-full flex-row items-center justify-between bg-transparent px-4"
      pointerEvents="box-none">
      <AnimatedTouchOpacity
        onPress={() => console.log('Game controller pressed')}
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 6,
          overflow: 'hidden',
        }}>
        <Ionicons name="game-controller" size={35} color="#FA5EFF" />
      </AnimatedTouchOpacity>
      <AnimatedTouchOpacity onPress={() => console.log('Text pressed')}>
        <Text size="3xl" className="font-bold text-black">
          {title}
        </Text>
      </AnimatedTouchOpacity>
      <AnimatedTouchOpacity
        onPress={onFilterPress}
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 6,
          overflow: 'hidden',
        }}>
        <MaterialCommunityIcons name="air-filter" size={35} color="#FA5EFF" />
      </AnimatedTouchOpacity>
    </Animated.View>
  );
};

export default DiscoverHeader;
