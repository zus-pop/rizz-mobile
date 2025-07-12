import React, { useState } from 'react';
import { View } from 'react-native';
import QuestionnaireLayout from './QuestionnaireLayout';
import OptionButton from './OptionButton';
import { LegendList } from '@legendapp/list';
interface IAmScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function IAmScreen({ onNext, onBack, currentStep, totalSteps }: IAmScreenProps) {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const options = [
    { id: 'Woman', text: 'Woman', value: 'Woman', showCheckIcon: true },
    { id: 'Man', text: 'Man', value: 'Man', showCheckIcon: true },
    { id: 'Other', text: 'Choose another', value: 'Other', showArrowIcon: true },
  ];

  return (
    <QuestionnaireLayout
      title="I am a"
      disabledNext={!selectedGender}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={() => onNext(selectedGender)}>
      <View className="space-y-4">
        <LegendList
          data={options}
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
          ItemSeparatorComponent={() => <View className="h-2" />}
          scrollEnabled={false}
        />
      </View>
    </QuestionnaireLayout>
  );
}
