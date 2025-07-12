import React, { useState } from 'react';
import { View, Text } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';

interface DealBreakerScreenProps {
  onNext: (selections: string[]) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function DealBreakerScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: DealBreakerScreenProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    { id: 'smoking', name: 'Smoking' },
    { id: 'different-political-views', name: 'Different political views' },
    { id: 'no-ambition', name: 'No ambition' },
    { id: 'heavy-drinking', name: 'Heavy drinking' },
    { id: 'poor-hygiene', name: 'Poor hygiene' },
    { id: 'dishonesty', name: 'Dishonesty' },
  ];

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const isSelected = (option: string) => selectedOptions.includes(option);

  return (
    <QuestionnaireLayout
      title="Deal breaker"
      subtitle="Select all that apply"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={selectedOptions.length === 0}
      onBack={onBack}
      onNext={() => onNext(selectedOptions)}>
      <LegendList
        data={options}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => (
          <OptionButton
            key={item.id}
            text={item.name}
            isSelected={isSelected(item.name)}
            onPress={() => toggleOption(item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
        className="space-y-4"
      />
    </QuestionnaireLayout>
  );
}
