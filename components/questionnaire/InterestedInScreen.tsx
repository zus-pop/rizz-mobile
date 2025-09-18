import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { toGender } from '../../constants/input';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';

interface InterestedInScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function InterestedInScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: InterestedInScreenProps) {
  const [selectedGender, setSelectedGender] = useState<string>('');

  return (
    <QuestionnaireLayout
      title="Which gender do you interested in?"
      subtitle="You can also change this option later"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedGender}
      onBack={onBack}
      onNext={() => onNext(selectedGender)}>
      <LegendList
        data={toGender}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OptionButton
            text={item.text}
            isSelected={selectedGender === item.value}
            onPress={() => setSelectedGender(item.value)}
            showCheckIcon={item.showCheckIcon}
            showArrowIcon={item.showArrowIcon}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </QuestionnaireLayout>
  );
}
