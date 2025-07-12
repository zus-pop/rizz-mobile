import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { Text, View } from 'react-native';
import InterestChip from './InterestChip';
import QuestionnaireLayout from './QuestionnaireLayout';

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

const interests = [
    { 
      id: 'photography', 
      name: 'Photography', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <Ionicons name="camera" size={size} color={color} />
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome name="shopping-bag" size={size} color={color} />
    },
    { 
      id: 'karaoke', 
      name: 'Karaoke', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome size={size} name="microphone" color={color} />
    },
    { 
      id: 'yoga', 
      name: 'Yoga', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <MaterialCommunityIcons name="yoga" size={size} color={color} />
    },
    { 
      id: 'cooking', 
      name: 'Cooking', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <MaterialCommunityIcons name="food" size={size} color={color} />
    },
    { 
      id: 'tennis', 
      name: 'Tennis', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <MaterialCommunityIcons name="table-tennis" size={size} color={color} />
    },
    { 
      id: 'run', 
      name: 'Run', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <MaterialCommunityIcons name="run-fast" size={size} color={color} />
    },
    { 
      id: 'swimming', 
      name: 'Swimming', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <MaterialCommunityIcons name="swim" size={size} color={color} />
    },
    { 
      id: 'art', 
      name: 'Art', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <Ionicons name="color-palette" size={size} color={color} />
    },
    { 
      id: 'traveling', 
      name: 'Traveling', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome name="plane" size={size} color={color} />
    },
    { 
      id: 'extreme', 
      name: 'Extreme', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome6 name="parachute-box" size={size} color={color} />
    },
    { 
      id: 'music', 
      name: 'Music', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome name="music" size={size} color={color} />
    },
    { 
      id: 'drink', 
      name: 'Drink', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome5 name="cocktail" size={size} color={color} />
    },
    { 
      id: 'video-games', 
      name: 'Video games', 
      icon: ({ color, size = 20 }: { color: string; size?: number }) => <FontAwesome name="gamepad" size={size} color={color} />
    },
];

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
          <View className="max-w-[48%] flex-1">
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
