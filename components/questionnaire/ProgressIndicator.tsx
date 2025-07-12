import React from 'react';
import { View, Text } from 'react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  bottom?: number;
  left?: number;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  bottom = 149,
  left = 40,
}: ProgressIndicatorProps) {
  return (
    <View className="absolute" style={{ bottom, left }}>
      <Text className="text-14 font-roboto font-normal text-black opacity-70">
        {currentStep}/{totalSteps}
      </Text>
    </View>
  );
}
