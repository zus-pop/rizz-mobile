import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  ...textInputProps
}) => {
  return (
    <View className="relative h-[67px]">
      {/* Container */}
      <View className="absolute top-[9px] h-[58px] w-full rounded-[15px] border border-primary-0 bg-white" />

      {/* White line for label */}
      <View className="absolute left-5 top-[9px] h-[1px] w-[73px] bg-white" />

      {/* Label */}
      <Text className="absolute left-7 top-0 font-roboto text-[12px] font-normal leading-[18px] text-black/40">
        {label}
      </Text>

      {/* Input - centered vertically within the container */}
      <TextInput
        className="absolute left-5 right-5 top-[19px] h-[38px] font-roboto text-[14px] font-normal leading-[21px] text-black"
        style={{ textAlignVertical: 'center' }}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        {...textInputProps}
      />
    </View>
  );
};
