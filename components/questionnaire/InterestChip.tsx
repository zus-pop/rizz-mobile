import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/text';

interface InterestChipProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: ({ color, size }: { color: string; size: number }) => React.ReactNode;
}

export default function InterestChip({ text, isSelected, onPress, icon }: InterestChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-14 flex-row items-center justify-start rounded-2xl border px-4 shadow-sm shadow-primary-200 ${
        isSelected ? 'border-[#FA5EFF] bg-[#FA5EFF] shadow-lg' : 'border-primary-0 bg-white'
      }`}>
      {icon && (
        <View className="mr-3">
          {icon({ color: `${isSelected ? 'white' : '#FA5EFF'}`, size: 25 })}
        </View>
      )}
      <Text
        size="lg"
        className={`text-center font-roboto ${
          isSelected ? 'font-bold text-white' : 'font-normal text-black'
        }`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
