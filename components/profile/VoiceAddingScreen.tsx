import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

interface VoiceAddingScreenProps {
  onStartRecording: () => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export default function VoiceAddingScreen({
  onStartRecording,
  onSkip,
  onBack,
}: VoiceAddingScreenProps) {
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

  return (
    <View className="flex-1 bg-white">
      {/* Header with Back and Skip buttons */}
      <View className="flex-row items-center justify-between px-6 pb-4 pt-14">
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            className="h-13 w-13 rounded-15 items-center justify-center border border-[#E8E6EA] bg-white"
            style={{ width: 52, height: 52, borderRadius: 15 }}>
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 52 }} />
        )}

        {onSkip ? (
          <TouchableOpacity onPress={onSkip}>
            <Text className="text-16 font-roboto font-bold text-[#FA5EFF]">Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {/* Header Section */}
        <View className="mb-8 items-center">
          <Text className="mb-2 text-center font-roboto text-[34px] font-bold leading-[51px] text-black">
            Voice introduction
          </Text>
          <Text className="text-14 font-roboto font-normal text-black opacity-70">
            Let your voice shine
          </Text>
        </View>

        {/* Description */}
        <Text className="text-14 mb-12 px-8 text-center font-roboto font-normal leading-[21px] text-black opacity-70">
          Record a 30-seconds voice message to help others get to know the real you
        </Text>

        {/* Voice Recording Button */}
        <View className="mb-8 items-center">
          <TouchableOpacity onPress={onStartRecording} activeOpacity={0.8} className="mb-4">
            <VoiceIcon />
          </TouchableOpacity>
          <Text className="text-14 font-roboto font-normal text-black opacity-70">
            Tap to start recording
          </Text>
        </View>

        {/* Suggested Prompt */}
        <View
          className="rounded-15 mx-6 mb-8 border border-[#E8E6EA] bg-white p-5"
          style={{ borderRadius: 15 }}>
          <Text className="text-16 mb-2 font-roboto font-bold text-black">Suggested Prompt:</Text>
          <Text className="text-16 font-roboto font-normal leading-[24px] text-black">
            "What's something you're passionate about studying?"
          </Text>
        </View>

        {/* Complete Setup Button (Disabled) */}
        <TouchableOpacity
          disabled
          className="rounded-15 mb-4 h-14 w-full max-w-[320px] items-center justify-center bg-[#FA5EFF] opacity-50"
          style={{ borderRadius: 15 }}>
          <Text className="text-19 font-roboto font-bold text-white">Complete setup</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={onSkip}
          className="rounded-15 h-14 w-full max-w-[320px] items-center justify-center bg-white"
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
    </View>
  );
}
