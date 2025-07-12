import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NotificationScreenProps {
  onSkip: () => void;
  onEnableNotifications: () => void;
  onNotNow: () => void;
}

export default function NotificationScreen({
  onSkip,
  onEnableNotifications,
  onNotNow,
}: NotificationScreenProps) {
  return (
    <LinearGradient
      colors={['#FFFFFF', 'rgba(255, 229, 0, 0.55)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1">
      {/* Skip Button */}
      <TouchableOpacity onPress={onSkip} className="absolute right-10 top-14 z-10">
        <Text className="text-16 font-roboto font-bold text-[#FA5EFF]">Skip</Text>
      </TouchableOpacity>

      {/* Image */}
      <View className="absolute left-[-241px] top-[154px]">
        <View
          className="h-[415px] w-[738px] rounded"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}>
          {/* Placeholder for the notification illustration */}
          <View className="h-full w-full rounded bg-yellow-200 opacity-80" />
        </View>
      </View>

      {/* Title Section */}
      <View className="absolute left-10 right-10 top-[472px]">
        <Text className="text-24 mb-3 text-center font-roboto font-bold leading-[36px] text-black">
          Enable notification
        </Text>
        <Text className="text-14 text-center font-roboto font-normal leading-[21px] text-black opacity-70">
          Get push-notification when you get the match or receive a message.
        </Text>
      </View>

      {/* Not Now Button */}
      <TouchableOpacity
        onPress={onNotNow}
        className="rounded-15 absolute bottom-[83px] left-10 right-10 h-14 items-center justify-center bg-white"
        style={{
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}>
        <Text className="text-16 text-center font-roboto font-bold text-[#FA5EFF]">Not now</Text>
      </TouchableOpacity>

      {/* Enable Notifications Button */}
      <TouchableOpacity
        onPress={onEnableNotifications}
        className="rounded-15 absolute bottom-16 left-10 right-10 h-14 items-center justify-center bg-[#FA5EFF]"
        style={{
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}>
        <Text className="text-16 text-center font-roboto font-bold text-white">
          I want to be notified
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
