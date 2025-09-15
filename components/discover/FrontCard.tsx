import { Text } from '@/components/ui/text';
import { Profile } from '@/types/profile';
import { AntDesign } from '@expo/vector-icons';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface FrontCardProps {
  profile: Profile;
  onPress: () => void;
  index: number;
  currentIndex: SharedValue<number>;
}

export default function FrontCard({ profile, onPress }: FrontCardProps) {
  const currentImageIndex = useSharedValue(0);
  const imageCount = profile.images.length;
  const getProgressBarStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = currentImageIndex.value === index;
      return {
        backgroundColor: withTiming(isActive ? 'white' : 'rgba(255, 255, 255, 0.3)', {
          duration: 300,
        }),
      };
    });
  };

  const navigateToPrevious = () => {
    'worklet';
    if (currentImageIndex.value > 0) {
      currentImageIndex.value = currentImageIndex.value - 1;
    }
  };

  const navigateToNext = () => {
    'worklet';
    if (currentImageIndex.value < imageCount - 1) {
      currentImageIndex.value = currentImageIndex.value + 1;
    }
  };

  return (
    <Animated.View
      className="border-black-800 h-[55vh] w-[70vw] overflow-hidden rounded-2xl border-[0.8px] shadow-lg"
      style={{ elevation: 6 }}>
      {/* Progress indicators */}
      <View className="absolute left-2 right-2 top-2 z-10 flex-row space-x-1">
        {profile.images.map((_, index) => (
          <Animated.View
            key={index}
            className="h-1 flex-1 rounded-full"
            style={getProgressBarStyle(index)}
          />
        ))}
      </View>

      {/* Card Images */}
      {profile.images.map((imageSource, index) => {
        const imageAnimatedStyle = useAnimatedStyle(() => {
          return {
            opacity: currentImageIndex.value === index ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          };
        });

        return (
          <Animated.View key={index} style={imageAnimatedStyle}>
            <Image
              source={{ uri: imageSource }}
              style={{ flex: 1, width: '100%', height: '100%' }}
            />
          </Animated.View>
        );
      })}

      {/* General dark overlay for the entire image */}
      <View className="absolute inset-0 bg-black/20" />

      {/* Tap zones for navigation - only when there are multiple images */}
      {imageCount > 1 && (
        <View className="absolute inset-0 flex-row" pointerEvents="box-none">
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => {
              runOnJS(navigateToPrevious)();
            }}
          />
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => {
              runOnJS(navigateToNext)();
            }}
          />
        </View>
      )}

      {/* Dark overlay for text contrast */}
      <View className="absolute bottom-0 left-0 right-0 h-1/5 bg-black/50" />

      {/* Text Overlay */}
      <Pressable
        onPress={onPress}
        className="absolute bottom-0 left-0 right-0 flex-row items-end justify-between p-5">
        {/* Left side - Common info */}
        <View className="flex-1">
          <Text className="mb-1 text-2xl font-bold text-white">
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text className="text-lg text-white/90">Age: {profile.age}</Text>
        </View>

        {/* Right side - View detail trigger */}
        <TouchableOpacity className="ml-4 rounded-full p-3" activeOpacity={0.7} onPress={onPress}>
          <AntDesign name="retweet" size={24} color="#fa5eff" />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}
