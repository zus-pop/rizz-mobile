import { customToast } from '@/components/CustomToast';
import VerificationCodeSection from '@/components/ui/phone/code-verification';
import PhoneInputSection from '@/components/ui/phone/phone-input';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
const PhoneRegister = () => {
  const [currentSection, setCurrentSection] = useState<'phone' | 'verification'>('phone');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // Handle login
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      console.log(user);
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function handleSignInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(code: string) {
    try {
      if (confirm) {
        const foo = await confirm.confirm(code);
        console.log(foo);
      }
    } catch (error) {
      console.log(error);
      customToast.error('Invalid code.');
    }
  }

  const handleContinue = (phone: string) => {
    setCurrentSection('verification');
    handleSignInWithPhoneNumber(phone);
  };

  const handleBack = () => {
    setCurrentSection('phone');
  };

  const onConfirmCode = (code: string) => {
    confirmCode(code);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white">
        {currentSection === 'phone' ? (
          <PhoneInputSection onContinue={handleContinue} />
        ) : (
          <VerificationCodeSection onConfirmCode={onConfirmCode} onBack={handleBack} />
        )}
      </View>
    </>
  );
};

export default PhoneRegister;
