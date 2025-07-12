import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

interface VoiceAddingScreenProps {
  onStartRecording: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function VoiceAddingScreen({
  onStartRecording,
  onSkip,
  onBack,
}: VoiceAddingScreenProps) {
  const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071Z"
        fill="#FA5EFF"
      />
    </Svg>
  );

  const VoiceIcon = () => (
    <Svg width="75" height="75" viewBox="0 0 75 75" fill="none">
      <Circle cx="37.5" cy="37.5" r="37.5" fill="#FA5EFF" />
      <Path
        d="M45 26C45 22.134 41.866 19 38 19C34.134 19 31 22.134 31 26V39C31 42.866 34.134 46 38 46C41.866 46 45 42.866 45 39V26Z"
        fill="white"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinejoin="round"
      />
      <Path
        d="M23 38.0002C23 46.2842 29.716 53.0002 38 53.0002M38 53.0002C46.284 53.0002 53 46.2842 53 38.0002M38 53.0002V59.0002"
        stroke="white"
        strokeWidth="2.18182"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        className="w-13 h-13 rounded-15 absolute left-10 top-11 z-10 items-center justify-center border border-[#E8E6EA] bg-white"
        style={{ width: 52, height: 52, borderRadius: 15 }}>
        <BackIcon />
      </TouchableOpacity>

      {/* Header */}
      <View className="absolute left-12 top-[115px]">
        <Text className="font-roboto text-[34px] font-bold leading-[51px] text-black">
          Voice introduction
        </Text>
      </View>

      {/* Subtitle */}
      <View className="absolute left-[126px] top-[177px]">
        <Text className="text-14 font-roboto font-normal text-black opacity-70">
          Let your voice shine
        </Text>
      </View>

      {/* Description */}
      <View className="absolute left-[52px] right-[52px] top-[209px]">
        <Text className="text-14 text-center font-roboto font-normal leading-[21px] text-black opacity-70">
          Record a 30-seconds voice message to help others get to know the real you
        </Text>
      </View>

      {/* Voice Icon */}
      <TouchableOpacity
        onPress={onStartRecording}
        className="absolute left-[162px] top-[286px]"
        activeOpacity={0.8}>
        <VoiceIcon />
      </TouchableOpacity>

      {/* Tap to start recording */}
      <View className="absolute left-[119px] top-[368px]">
        <Text className="text-14 font-roboto font-normal text-black opacity-70">
          Tap to start recording
        </Text>
      </View>

      {/* Suggested Prompt */}
      <View
        className="rounded-15 absolute left-10 right-10 top-[423px] h-[126px] border border-[#E8E6EA] bg-white p-5"
        style={{ borderRadius: 15 }}>
        <Text className="text-16 mb-2 font-roboto font-bold text-black">Suggested Prompt:</Text>
        <Text className="text-16 font-roboto font-normal leading-[24px] text-black">
          "What's something you're passionate about studying?"
        </Text>
      </View>

      {/* Complete Setup Button (Disabled) */}
      <TouchableOpacity
        disabled
        className="rounded-15 opacity-47 absolute bottom-[83px] left-10 right-10 h-14 items-center justify-center bg-[#FA5EFF]"
        style={{ borderRadius: 15 }}>
        <Text className="text-19 font-roboto font-bold text-white">Complete setup</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={onSkip}
        className="rounded-15 absolute bottom-16 left-10 right-10 h-14 items-center justify-center bg-white"
        style={{
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}>
        <Text className="text-19 font-roboto font-normal text-black">Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}
