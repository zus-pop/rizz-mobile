import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import Animated from 'react-native-reanimated';

interface VerificationCodeSectionProps {
  onBack: () => void;
}

export default function VerificationCodeSection({ onBack }: VerificationCodeSectionProps) {
  const inputRef = useRef<TextInput>(null);
  const [timer, setTimer] = useState(42);
  const [code, setCode] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (text: string) => {
    // Only allow numeric input and limit to 4 characters
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 4);
    setCode(numericText);
    if (numericText.length === 4) {
      inputRef.current?.blur(); // Blur the input when 4 digits are entered
    }
  };

  // Split the code into 4 digits for display
  const getDisplayDigits = () => {
    const digits = code.split('');
    const displayDigits = [];
    for (let i = 0; i < 4; i++) {
      displayDigits.push(digits[i] || '');
    }
    return displayDigits;
  };

  return (
    <Animated.ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-transparent">
      {/* Back Button */}
      <View className="px-10 pt-11">
        <TouchableOpacity
          onPress={onBack}
          className="h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-[#E8E6EA] bg-white">
          <Ionicons name="chevron-back" size={24} color="#FA5EFF" />
        </TouchableOpacity>
      </View>

      {/* Timer and Description */}
      <View className="mb-8 mt-8 items-center px-20">
        <Text
          className="mb-2 text-[34px] font-bold leading-[51px] text-black"
          style={{ fontFamily: 'Roboto' }}>
          {formatTime(timer)}
        </Text>
        <Text
          className="text-center text-[18px] leading-[27px] text-black/70"
          style={{ fontFamily: 'Roboto' }}>
          Type the verification code{'\n'}we've sent you
        </Text>
      </View>

      {/* Hidden TextInput for actual input */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="number-pad"
        maxLength={4}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        className="absolute -z-10 h-0 w-0 opacity-0"
        autoFocus
      />

      {/* Visual OTP Display Boxes */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          inputRef.current?.focus();
        }}
        className="mb-8 flex-row justify-center px-10"
        style={{ gap: 9 }}>
        {getDisplayDigits().map((digit, index) => {
          const isFilled = digit !== '';
          const isActive = index === code.length && code.length < 4;

          return (
            <View
              key={index}
              className={`h-[70px] w-[67px] items-center justify-center rounded-[15px] ${
                isFilled
                  ? 'bg-[#FA5EFF]'
                  : isActive
                    ? 'border-2 border-[#FA5EFF] bg-white'
                    : 'border border-[#E8E6EA] bg-white'
              }`}>
              <Text
                className={`text-[34px] font-bold ${
                  isFilled ? 'text-white' : isActive ? 'text-[#FA5EFF]' : 'text-[#E8E6EA]'
                }`}
                style={{ fontFamily: 'Roboto' }}>
                {digit || '0'}
              </Text>
            </View>
          );
        })}
      </TouchableOpacity>

      {/* Send Again Button */}
      <View className="mt-auto items-center pb-16">
        <TouchableOpacity>
          <Text className="text-[16px] font-bold text-[#FA5EFF]" style={{ fontFamily: 'Roboto' }}>
            Send again
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
}
