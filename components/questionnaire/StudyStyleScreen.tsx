import { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';
import { LegendList } from '@legendapp/list';
import { studyStyle } from '../../constants/input';

interface StudyStyleScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function StudyStyleScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: StudyStyleScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <QuestionnaireLayout
      title="Your study style"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption)}>
      <View className="space-y-4">
        <LegendList
          data={studyStyle}
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
