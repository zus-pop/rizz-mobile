import {
  AfterGraduationScreen,
  CampusLifeScreen,
  DealBreakerScreen,
  IAmScreen,
  InterestedInScreen,
  LookingForScreen,
  PassionsScreen,
  PreferringScreen,
  StudyStyleScreen,
  WeekendHabitScreen,
} from '@/components/questionnaire';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { usePagerView } from 'react-native-pager-view';
import { QuestionType } from '../types/profile';
import { UploadImageScreen } from '../components/profile';

const Questionnaire = () => {
  const { AnimatedPagerView, ref } = usePagerView();

  const questionnaireData: {
    id: string;
    component: React.ComponentType<{
      currentStep: number;
      totalSteps: number;
      onBack: () => void;
      onSkip?: () => void;
      onNext: (option: string | string[], type: QuestionType) => void;
    }>;
  }[] = [
    {
      id: 'i-am-screen',
      component: IAmScreen,
    },
    {
      id: 'interested-in-screen',
      component: InterestedInScreen,
    },
    {
      id: 'looking-for-screen',
      component: LookingForScreen,
    },
    {
      id: 'study-style-screen',
      component: StudyStyleScreen,
    },
    {
      id: 'weekend-habit-screen',
      component: WeekendHabitScreen,
    },
    {
      id: 'passions-screen',
      component: PassionsScreen,
    },
    {
      id: 'after-graduation',
      component: AfterGraduationScreen,
    },
    {
      id: 'campus-life-screen',
      component: CampusLifeScreen,
    },
    {
      id: 'preferring-screen',
      component: PreferringScreen,
    },
    {
      id: 'deals-breaker-screen',
      component: DealBreakerScreen,
    },
  ];
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AnimatedPagerView scrollEnabled={true} ref={ref} style={{ flex: 1 }} initialPage={0}>
        {questionnaireData.map((item, index) => {
          const Component = item.component;
          return (
            <View key={item.id} className="flex-1">
              <Component
                currentStep={index + 1}
                totalSteps={questionnaireData.length}
                onBack={() => {
                  if (index > 0) {
                    ref.current?.setPage(index - 1);
                  }
                }}
                onNext={(option, type) => {
                  if (index < questionnaireData.length - 1) {
                    console.log('Selected option:', option);
                    console.log('Type: ', type);
                    ref.current?.setPage(index + 1);
                  } else {
                    console.log('end');
                    router.push('/profile-details');
                  }
                }}
              />
            </View>
          );
        })}
      </AnimatedPagerView>
    </>
  );
};

export default Questionnaire;
