import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import { preferring } from '../../constants/input';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';

interface PreferringScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function PreferringScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: PreferringScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <QuestionnaireLayout
      title="I'm preferring"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption)}>
      <LegendList
        data={preferring}
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
