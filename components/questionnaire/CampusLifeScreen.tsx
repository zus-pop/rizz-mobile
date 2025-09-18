import { campusLife } from '@/constants/input';
import { QuestionType } from '@/types/profile';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';

interface CampusLifeScreenProps {
  onNext: (selection: string, type: QuestionType) => void;
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

  return (
    <QuestionnaireLayout
      title="Campus life"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      disabledNext={!selectedOption}
      onNext={() => onNext(selectedOption, 'details')}>
      <LegendList
        key={selectedOption}
        data={campusLife}
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
