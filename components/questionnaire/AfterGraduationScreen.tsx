import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import { afterGraduation } from '@/constants/input';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';
import { QuestionType } from '@/types/profile';

interface AfterGraduationScreenProps {
  onNext: (selection: string, type: QuestionType) => void;
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

  return (
    <QuestionnaireLayout
      title="After graduation"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption, "details")}>
      <View className="space-y-4">
        <LegendList
          key={selectedOption}
          data={afterGraduation}
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
