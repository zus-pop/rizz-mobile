import { deal_breakers } from '@/constants/input';
import { QuestionType } from '@/types/profile';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';

interface DealBreakerScreenProps {
  onNext: (selections: string[], type: QuestionType) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function DealBreakerScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: DealBreakerScreenProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const isSelected = (option: string) => selectedOptions.includes(option);

  return (
    <QuestionnaireLayout
      title="Deal breaker"
      subtitle="Select all that apply"
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={selectedOptions.length === 0}
      onBack={onBack}
      onNext={() => onNext(selectedOptions, 'details')}>
      <LegendList
        key={selectedOptions.length}
        data={deal_breakers}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => (
          <OptionButton
            key={item.id}
            text={item.name}
            isSelected={isSelected(item.name)}
            onPress={() => toggleOption(item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
        className="space-y-4"
      />
    </QuestionnaireLayout>
  );
}
