import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

interface DatePickerInputProps {
  value: Date | null;
  onPress: () => void;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onPress }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Choose birthday date';
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '/');
  };

  return (
    <TouchableOpacity onPress={onPress} className="relative h-[58px]">
      {/* Container with transparent background */}
      <View className="h-[58px] w-full rounded-[15px] bg-[#FA5EFF]/10" />

      {/* Calendar Icon */}
      <View className="absolute left-5 top-[19px]">
        <Svg width={18} height={20} viewBox="0 0 20 22" fill="none">
          <Path
            d="M1.09265 8.4043H18.9166"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.442 12.3097H14.4513"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10.0046 12.3097H10.0139"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.55787 12.3097H5.56713"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.442 16.1962H14.4513"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10.0046 16.1962H10.0139"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.55787 16.1962H5.56713"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.0437 1V4.29078"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5.96545 1V4.29078"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2383 2.57922H5.77096C2.83427 2.57922 1 4.21516 1 7.22225V16.2719C1 19.3263 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22225C19.0092 4.21516 17.1842 2.57922 14.2383 2.57922Z"
            stroke="#FA5EFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* Date Text */}
      <Text className="absolute left-[58px] top-5 font-roboto text-[14px] font-bold text-[#FA5EFF]">
        {formatDate(value)}
      </Text>
    </TouchableOpacity>
  );
};
