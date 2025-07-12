import React, { useState } from 'react';
import { View } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';

interface LookingForScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function LookingForScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: LookingForScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    { id: 'long-term-relationship', name: 'Long-term relationship' },
    { id: 'new-friends', name: 'New friends' },
    { id: 'something-casual', name: 'Something casual' },
    { id: 'not-sure-yet', name: 'Not sure yet' },
  ];

  return (
    <QuestionnaireLayout
      title="Looking for"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption)}>
      <View className="space-y-4">
        <LegendList
          data={options}
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OptionButton
              key={item.id}
              text={item.name}
              isSelected={selectedOption === item.id}
              onPress={() => setSelectedOption(item.id)}
            />
          )}
        />
      </View>
    </QuestionnaireLayout>
  );
}
