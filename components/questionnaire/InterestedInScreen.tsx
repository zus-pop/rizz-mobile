import { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';
import { LegendList } from '@legendapp/list';

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
  const genderOptions = [
    { id: 'Woman', text: 'Woman', value: 'Woman', showCheckIcon: true },
    { id: 'Man', text: 'Man', value: 'Man', showCheckIcon: true },
    { id: 'Other', text: 'Choose another', value: 'Other', showArrowIcon: true },
  ];
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
        data={genderOptions}
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
