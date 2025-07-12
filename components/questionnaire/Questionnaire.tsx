import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import BackButton from './BackButton';
import NextButton from './NextButton';

// Import all screen components (content only)
import IAmScreen from './IAmScreen';
import InterestedInScreen from './InterestedInScreen';
import LookingForScreen from './LookingForScreen';
import StudyStyleScreen from './StudyStyleScreen';
import WeekendHabitScreen from './WeekendHabitScreen';
import PassionsScreen from './PassionsScreen';
import CampusLifeScreen from './CampusLifeScreen';
import AfterGraduationScreen from './AfterGraduationScreen';
import PreferingScreen from './PreferringScreen';
import DealBreakerScreen from './DealBreakerScreen';

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
  onExit: () => void;
}

export interface QuestionnaireData {
  gender: string;
  interestedIn: string;
  lookingFor: string;
  studyStyle: string;
  weekendHabit: string;
  interests: string[];
  campusLife: string;
  afterGraduation: string;
  preferring: string;
  dealBreakers: string[];
}

const SCREENS = [
  { component: IAmScreen, title: 'I am a', key: 'gender' },
  {
    component: InterestedInScreen,
    title: 'Which gender do you interested in?',
    key: 'interestedIn',
  },
  { component: LookingForScreen, title: 'Looking for', key: 'lookingFor' },
  { component: StudyStyleScreen, title: 'Your study style', key: 'studyStyle' },
  { component: WeekendHabitScreen, title: 'On weekends, I ...', key: 'weekendHabit' },
  { component: PassionsScreen, title: 'Your interests', key: 'interests' },
  { component: CampusLifeScreen, title: 'Your campus life', key: 'campusLife' },
  { component: AfterGraduationScreen, title: 'After graduation,', key: 'afterGraduation' },
  { component: PreferingScreen, title: 'I prefer to', key: 'preferring' },
  { component: DealBreakerScreen, title: 'Your deal breakers', key: 'dealBreakers' },
];

export default function Questionnaire({ onComplete, onExit }: QuestionnaireProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [questionnaireData, setQuestionnaireData] = useState<Partial<QuestionnaireData>>({});
  const [currentScreenData, setCurrentScreenData] = useState<any>(null);

  const currentScreen = SCREENS[currentScreenIndex];
  const CurrentScreenComponent = currentScreen.component;
  const isLastScreen = currentScreenIndex === SCREENS.length - 1;

  const handleDataUpdate = (data: any) => {
    setCurrentScreenData(data);
  };

  const handleNext = () => {
    if (!currentScreenData) return;

    // Update questionnaire data
    const updatedData = {
      ...questionnaireData,
      [currentScreen.key]: currentScreenData,
    };
    setQuestionnaireData(updatedData);

    if (isLastScreen) {
      // Complete questionnaire
      onComplete(updatedData as QuestionnaireData);
    } else {
      // Go to next screen
      setCurrentScreenIndex(currentScreenIndex + 1);
      setCurrentScreenData(null); // Reset for next screen
    }
  };

  const handleBack = () => {
    if (currentScreenIndex === 0) {
      onExit();
    } else {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Back Button - positioned exactly like Figma */}
      <BackButton onPress={handleBack} top={44} left={40} />

      {/* Title - positioned exactly like Figma */}
      <View className="absolute left-10 right-10 top-32">
        <Text className="font-roboto text-[34px] font-bold leading-[51px] text-black">
          {currentScreen.title}
        </Text>
      </View>

      {/* Content Area - positioned to not overlap with title and bottom */}
      <View className="absolute bottom-32 left-0 right-0 top-48">
        <ScrollView className="flex-1 px-10" showsVerticalScrollIndicator={false}>
          <CurrentScreenComponent
            onDataUpdate={handleDataUpdate}
            currentData={questionnaireData[currentScreen.key]}
          />
        </ScrollView>
      </View>

      {/* Progress - positioned exactly like Figma */}
      <View className="absolute bottom-32 left-10">
        <Text className="text-14 font-roboto font-normal text-black opacity-70">
          {currentScreenIndex + 1}/{SCREENS.length}
        </Text>
      </View>

      {/* Next Button - positioned exactly like Figma */}
      <NextButton onPress={handleNext} bottom={64} left={40} right={40} />
    </View>
  );
}
