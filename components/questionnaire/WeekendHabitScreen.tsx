import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import { weekendHabit } from '@/constants/input';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';
import { QuestionType } from '@/types/profile';

interface WeekendHabitScreenProps {
  onNext: (selection: string, type: QuestionType) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function WeekendHabitScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: WeekendHabitScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <QuestionnaireLayout
      title="On weekends, I ..."
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={!selectedOption}
      onBack={onBack}
      onNext={() => onNext(selectedOption, 'details')}>
      <View className="space-y-4">
        <LegendList
          key={selectedOption}
          data={weekendHabit}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <OptionButton
              key={item.id}
              text={item.name}
              isSelected={selectedOption === item.name}
              onPress={() => setSelectedOption(item.name)}
            />
          )}
        />
      </View>
    </QuestionnaireLayout>
  );
}
