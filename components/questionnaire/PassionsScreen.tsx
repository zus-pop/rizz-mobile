import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { Text, View } from 'react-native';
import InterestChip from './InterestChip';
import QuestionnaireLayout from './QuestionnaireLayout';
import { interests } from '../../constants/input';

interface PassionsScreenProps {
  onNext: (selections: string[]) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function PassionsScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: PassionsScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const isSelected = (interest: string) => selectedInterests.includes(interest);

  return (
    <QuestionnaireLayout
      title="Your passions"
      subtitleComponent={
        <View className="mb-4">
          <Text className="text-14 mb-4 font-roboto font-normal leading-[21px] text-black opacity-70">
            Select at least 3 of your interests and let everyone know what you're passionate about.
          </Text>
          <Text className="text-14 text-center font-roboto font-normal leading-[21px] text-[#FA5EFF]">
            {selectedInterests.length}/3 minimum selected
          </Text>
        </View>
      }
      currentStep={currentStep}
      totalSteps={totalSteps}
      disabledNext={selectedInterests.length < 3}
      onBack={onBack}
      onNext={() => onNext(selectedInterests)}>
      {/* Interests Grid */}
      <LegendList
        data={interests}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 8 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="flex-1">
            <InterestChip
              icon={item.icon}
              text={item.name}
              isSelected={isSelected(item.name)}
              onPress={() => toggleInterest(item.name)}
            />
          </View>
        )}
      />
    </QuestionnaireLayout>
  );
}
