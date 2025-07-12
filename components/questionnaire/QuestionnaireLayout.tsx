import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BackButton from './BackButton';
import NextButton from './NextButton';

interface QuestionnaireLayoutProps {
  title: string;
  subtitle?: string;
  subtitleComponent?: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextButtonText?: string;
  children: React.ReactNode;
  showProgress?: boolean;
  disabledNext?: boolean;
}

export default function QuestionnaireLayout({
  title,
  subtitle,
  subtitleComponent,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextButtonText = 'Next',
  children,
  showProgress = true,
  disabledNext = false,
}: QuestionnaireLayoutProps) {
  return (
    <View className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-10 pb-4 pt-11">
        <BackButton onPress={onBack} absolute={false} />
        <View className="flex-1" />
      </View>

      {/* Title Section */}
      <View className="mb-8 px-10 pb-12">
        <Text className="font-roboto text-[34px] font-bold leading-[51px] text-black">{title}</Text>
        {subtitle && (
          <Text className="text-14 mt-2 font-roboto font-normal text-black opacity-70">
            {subtitle}
          </Text>
        )}
      </View>

      {/* Fixed Subtitle Component (doesn't scroll) */}
      {subtitleComponent && <View className="px-10 pb-6">{subtitleComponent}</View>}

      {/* Scrollable Content Area */}
      <ScrollView
        className="mb-4 flex-1 px-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {children}
      </ScrollView>

      {/* Bottom Section with Progress and Next Button */}
      <View className="mb-8 px-10">
        {/* Progress */}
        {showProgress && (
          <View className="mb-4">
            <Text className="text-14 font-roboto font-normal text-black opacity-70">
              {currentStep}/{totalSteps}
            </Text>
          </View>
        )}

        {/* Next Button */}
        <NextButton
          disable={disabledNext}
          onPress={onNext}
          text={nextButtonText}
          absolute={false}
        />
      </View>
    </View>
  );
}
