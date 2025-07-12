import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { usePagerView } from 'react-native-pager-view';
import {
  CampusLifeScreen,
  DealBreakerScreen,
  IAmScreen,
  InterestedInScreen,
  LookingForScreen,
  PassionsScreen,
  StudyStyleScreen,
  WeekendHabitScreen,
} from '../components/questionnaire';
import AfterGraduationScreen from '../components/questionnaire/AfterGraduationScreen';
import PreferringScreen from '../components/questionnaire/PreferringScreen';

const Questionnaire = () => {
  const { AnimatedPagerView, ref } = usePagerView();

  const questionnaireData: {
    id: string;
    component: React.ComponentType<{
      currentStep: number;
      totalSteps: number;
      onBack: () => void;
      onNext: (option: string | string[]) => void;
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
                onNext={(option) => {
                  console.log('Selected option:', option);
                  if (index < questionnaireData.length - 1) {
                    ref.current?.setPage(index + 1);
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
