import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import VerificationCodeSection from '../components/code-verification';
import PhoneInputSection from '../components/phone-input';

const PhoneRegister = () => {
  const [currentSection, setCurrentSection] = useState<'phone' | 'verification'>('phone');

  const handleContinue = () => {
    setCurrentSection('verification');
  };

  const handleBack = () => {
    setCurrentSection('phone');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1">
        {currentSection === 'phone' ? (
          <PhoneInputSection onContinue={handleContinue} />
        ) : (
          <VerificationCodeSection onBack={handleBack} />
        )}
      </View>
    </>
  );
};

export default PhoneRegister;
