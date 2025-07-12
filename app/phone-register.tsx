import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import PhoneInputSection from '../components/ui/phone/phone-input';
import VerificationCodeSection from '../components/ui/phone/code-verification';

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
      <View className="flex-1 bg-white">
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
