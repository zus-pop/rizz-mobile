import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

interface RecordingScreenProps {
  onStopRecording: () => void;
  onSkip: () => void;
  onBack: () => void;
  recordingTime: string;
}

export default function RecordingScreen({
  onStopRecording,
  onSkip,
  onBack,
  recordingTime = '00:18',
}: RecordingScreenProps) {
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

  const RecordingIcon = () => (
    <Svg width="75" height="75" viewBox="0 0 75 75" fill="none">
      <Circle cx="37.5" cy="37.5" r="37.5" fill="#FA5EFF" />
      <Path
        d="M45.691 38.1528V23.7535C45.691 22.7353 45.4905 21.727 45.1008 20.7863C44.7112 19.8457 44.1401 18.9909 43.4201 18.2709C42.7001 17.551 41.8454 16.9798 40.9047 16.5902C39.964 16.2005 38.9558 16 37.9376 16C36.9194 16 35.9111 16.2005 34.9704 16.5902C34.0297 16.9798 33.175 17.551 32.455 18.2709C31.735 18.9909 31.1639 19.8457 30.7743 20.7863C30.3846 21.727 30.1841 22.7353 30.1841 23.7535V38.1528C30.1841 39.171 30.3846 40.1792 30.7743 41.1199C31.1639 42.0606 31.735 42.9153 32.455 43.6353C33.175 44.3553 34.0297 44.9264 34.9704 45.3161C35.9111 45.7057 36.9194 45.9062 37.9376 45.9062C38.9558 45.9062 39.964 45.7057 40.9047 45.3161C41.8454 44.9264 42.7001 44.3553 43.4201 43.6353C44.1401 42.9153 44.7112 42.0606 45.1008 41.1199C45.4905 40.1792 45.691 39.171 45.691 38.1528Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M21.3229 37.0449C21.3229 46.2206 28.7618 53.6595 37.9375 53.6595M37.9375 53.6595C39.8792 53.6595 41.7433 53.3272 43.4757 52.7147M37.9375 53.6595V60.3054M54.5521 37.0449C54.5552 39.3319 54.0845 41.5947 53.1697 43.6908M57.875 58.0901L18 18.2151"
        stroke="white"
        strokeWidth="2"
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

      {/* Recording Icon */}
      <TouchableOpacity
        onPress={onStopRecording}
        className="absolute left-[167px] top-[294px]"
        activeOpacity={0.8}>
        <RecordingIcon />
      </TouchableOpacity>

      {/* Recording Status */}
      <View className="absolute left-[126px] top-[363px]">
        <Text className="text-14 font-roboto font-normal text-black opacity-70">
          Recording... {recordingTime}
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
