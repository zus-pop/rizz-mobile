import React, { useState } from 'react';
import { View } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';

interface AfterGraduationScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function AfterGraduationScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: AfterGraduationScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    { id: 'grad-school-bound', slug: 'grad-school-bound', name: 'Grad school bound' },
    { id: 'career-focused', slug: 'career-focused', name: 'Career focused' },
    { id: 'travel-the-world', slug: 'travel-the-world', name: 'Travel the world' },
    { id: 'start-a-business', slug: 'start-a-business', name: 'Start a business' },
    { id: 'still-figuring-it-out', slug: 'still-figuring-it-out', name: 'Still figuring it out' },
  ];

  return (
    <QuestionnaireLayout
      title="After graduation"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption)}>
      <View className="space-y-4">
        <LegendList
          data={options}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <OptionButton
              key={item.id}
              text={item.name}
              isSelected={selectedOption === item.name}
              onPress={() => setSelectedOption(item.name)}
            />
          )}
          keyExtractor={(item) => item.id}
          className="space-y-4"
        />
      </View>
    </QuestionnaireLayout>
  );
}
