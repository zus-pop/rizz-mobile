import React, { useState } from 'react';
import { View } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';

interface WeekendHabitScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function WeekendHabitScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: WeekendHabitScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    { id: 'netflix-and-chill', name: 'Netflix and chill' },
    { id: 'party-hard', name: 'Party hard' },
    { id: 'explore-the-city', name: 'Explore the city' },
    { id: 'catch-up-on-sleep', name: 'Catch up on the sleep' },
  ];

  return (
    <QuestionnaireLayout
      title="On weekends, I ..."
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption)}>
      <View className="space-y-4">
        <LegendList
          data={options}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <OptionButton
              key={item.id}
              text={item.name}
              isSelected={selectedOption === item.name}
              onPress={() => setSelectedOption(item.name)}
            />
          )}
        />
      </View>
    </QuestionnaireLayout>
  );
}
