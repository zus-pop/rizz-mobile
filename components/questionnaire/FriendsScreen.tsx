import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FriendsScreenProps {
  onSkip: () => void;
  onAccessContacts: () => void;
}

export default function FriendsScreen({ onSkip, onAccessContacts }: FriendsScreenProps) {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#FEC5D7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1">
      {/* Skip Button */}
      <TouchableOpacity onPress={onSkip} className="absolute right-10 top-14 z-10">
        <Text className="text-16 font-roboto font-bold text-[#FA5EFF]">Skip</Text>
      </TouchableOpacity>

      {/* Image */}
      <View className="absolute left-[-86px] top-32">
        <View
          className="h-[296px] w-[526px] rounded"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}>
          {/* Placeholder for the friends illustration */}
          <View className="h-full w-full rounded bg-pink-200 opacity-80" />
        </View>
      </View>

      {/* Title Section */}
      <View className="absolute left-10 right-10 top-[472px]">
        <Text className="text-24 mb-3 text-center font-roboto font-bold leading-[36px] text-black">
          Search friend's
        </Text>
        <Text className="text-14 text-center font-roboto font-normal leading-[21px] text-black opacity-70">
          You can find friends from your contact lists{'\n'}to connected
        </Text>
      </View>

      {/* Access Contacts Button */}
      <TouchableOpacity
        onPress={onAccessContacts}
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
          Access to a contact list
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
