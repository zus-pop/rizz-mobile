import { Text } from '@/components/ui/text';
import { useAudio } from '@/hooks/useAudio';
import { Profile } from '@/types/profile';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AudioModal from '../ui/AudioModal';

interface FrontCardProps {
  profile: Profile;
}

export default function FrontCard(props: FrontCardProps) {
  const { profile } = props;

  // Initialize audio hook for this card
  const { play, pause, playerStatus, setAudioSource } = useAudio();

  // Modal state
  const [audioModalVisible, setAudioModalVisible] = useState(false);

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

  const handleAudioPress = () => {
    if (profile.audioUrl) {
      // Open modal and start playing
      setAudioModalVisible(true);
      setAudioSource(profile.audioUrl);
      play();
    }
  };

  // Pause and close modal
  const handlePause = () => {
    pause();
  };
  const handleClose = () => {
    pause();
    setAudioModalVisible(false);
    setAudioSource(null);
  };

  return (
    <>
      <Animated.View
        className="h-full w-full overflow-hidden rounded-2xl "
        style={{ elevation: 6 }}>
        {/* Audio Icon - Always show */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 30, // Adjusted to account for safe area
              right: 16,
              zIndex: 50,
            },
          ]}>
          <Pressable
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: playerStatus?.playing ? '#ff8aff' : '#fa5eff',
            }}
            onPress={handleAudioPress}
            disabled={!profile.audioUrl}>
            {profile.audioUrl ? (
              <Ionicons
                name={playerStatus?.playing ? 'pause' : 'headset'}
                size={28}
                color={
                  profile.audioUrl ? (playerStatus?.playing ? '#ff8aff' : '#fa5eff') : '#8a8a8a'
                }
              />
            ) : (
              <MaterialIcons
                name="headset-off"
                size={28}
                color={
                  profile.audioUrl ? (playerStatus?.playing ? '#ff8aff' : '#fa5eff') : '#8a8a8a'
                }
              />
            )}
          </Pressable>
        </Animated.View>

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
        <View
          style={{
            bottom: 5,
            left: 0,
            right: 0,
          }}
          className="absolute z-10 flex-row items-end justify-between p-5">
          {/* Left side - Common info */}
          <View className="flex-1">
            <Text className="mb-2 text-2xl font-bold text-white">
              {`${profile.firstName} ${profile.lastName}`}
            </Text>
            <Text className="text-lg text-white/90">Age: {profile.age}</Text>
          </View>
        </View>
      </Animated.View>
      {/* Audio Modal */}
      <AudioModal
        visible={audioModalVisible && playerStatus?.playing}
        onClose={handleClose}
        onPause={handlePause}
        isPlaying={!!playerStatus?.playing}
        profileName={`${profile.firstName} ${profile.lastName}`}
      />
    </>
  );
}
