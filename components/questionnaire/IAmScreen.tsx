import { iAm } from '@/constants/input';
import { QuestionType } from '@/types/profile';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './OptionButton';
import QuestionnaireLayout from './QuestionnaireLayout';
interface IAmScreenProps {
  onNext: (selection: string, type: QuestionType) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function IAmScreen({ onNext, onBack, currentStep, totalSteps }: IAmScreenProps) {
  const [selectedGender, setSelectedGender] = useState<string>('');

  return (
    <QuestionnaireLayout
      title="I am a"
      disabledNext={!selectedGender}
      key={selectedGender}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={() => onNext(selectedGender, 'details')}>
      <View className="space-y-4">
        <LegendList
          data={iAm}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OptionButton
              text={item.text}
              isSelected={selectedGender === item.value}
              onPress={() => setSelectedGender(item.value)}
              showCheckIcon={item.showCheckIcon}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
          scrollEnabled={false}
        />
      </View>
    </QuestionnaireLayout>
  );
}
