import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
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

  const options = [
    { id: 'text-throughout-day', name: 'Text throughout the day' },
    { id: 'long-phone-calls', name: 'Long phone calls' },
    { id: 'video-chats', name: 'Video chats' },
    { id: 'in-person-hangouts', name: 'In-person hangouts' },
  ];

  return (
    <QuestionnaireLayout
      title="I'm preferring"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
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
