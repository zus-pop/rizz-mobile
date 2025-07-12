import React, { useState } from 'react';
import { View } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';

interface CampusLifeScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function CampusLifeScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: CampusLifeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    { id: 'greek-life-member', name: 'Greek life member' },
    { id: 'club-president', name: 'Club president' },
    { id: 'sports-team', name: 'Sports team' },
    { id: 'academic-societies', name: 'Academic societies' },
    { id: 'not-involved', name: 'Not involved' },
    { id: 'student-leader', name: 'Student leader' },
  ];

  return (
    <QuestionnaireLayout
      title="Campus life"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      disabledNext={!selectedOption}
      onNext={() => onNext(selectedOption)}>
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
    </QuestionnaireLayout>
  );
}
