import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
/* Uncomment these imports if you want to use custom keyboard:
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
*/
import { Text } from './ui/text';

interface VerificationCodeSectionProps {
  onBack: () => void;
}

export default function VerificationCodeSection({ onBack }: VerificationCodeSectionProps) {
  const [timer, setTimer] = useState(42);
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus first field on mount
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];

    // Handle paste - if user pastes full OTP
    if (text.length > 1) {
      const pastedCode = text.slice(0, 4).split('');
      pastedCode.forEach((digit, i) => {
        if (index + i < 4) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);
      return;
    }

    // Handle single character input
    newCode[index] = text;
    setCode(newCode);

    // Only auto-focus if text was added and not at last field
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      if (code[index]) {
        // If current field has content, clear it
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // If current field is empty, go to previous and clear it
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  /*
  ===============================
  CUSTOM KEYBOARD FUNCTIONS (COMMENTED OUT)
  ===============================
  Uncomment these if you want to use custom keyboard

  const handleNumberPress = (number: string) => {
    const firstEmptyIndex = code.findIndex((digit) => digit === '');
    if (firstEmptyIndex !== -1) {
      const newCode = [...code];
      newCode[firstEmptyIndex] = number;
      setCode(newCode);
    }
  };

  const handleDelete = () => {
    const lastFilledIndex = code
      .map((digit, index) => (digit !== '' ? index : -1))
      .filter((index) => index !== -1)
      .pop();
    if (lastFilledIndex !== undefined) {
      const newCode = [...code];
      newCode[lastFilledIndex] = '';
      setCode(newCode);
    }
  };

  const NumberButton: React.FC<{ number: string }> = ({ number }) => (
    <Pressable
      onPress={() => handleNumberPress(number)}
      className="h-[60px] w-[117px] items-center justify-center">
      {({ pressed }) => (
        <Animated.View
          className={`h-full w-full items-center justify-center rounded-[15px] transition-all ${
            pressed ? 'bg-[#FA5EFF]/20' : 'bg-white'
          }`}>
          <Text className="text-[24px] font-bold" style={{ fontFamily: 'Roboto' }}>
            {number}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
  */

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white">
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

      {/* OTP Input Boxes */}
      <View className="mb-8 flex-row justify-center px-10" style={{ gap: 9 }}>
        {code.map((digit, index) => {
          const isFilled = digit !== '';
          const isActive = !isFilled && code.slice(0, index).every((d) => d !== '');

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              className={`h-[70px] w-[67px] rounded-[15px] text-center text-[34px] font-bold ${
                isFilled
                  ? 'bg-[#FA5EFF] text-white'
                  : isActive
                    ? 'border-2 border-[#FA5EFF] bg-white text-[#FA5EFF]'
                    : 'border border-[#E8E6EA] bg-white text-[#E8E6EA]'
              }`}
              style={{ fontFamily: 'Roboto' }}
              keyboardType="number-pad"
              maxLength={1}
              textContentType="oneTimeCode" // iOS SMS autocomplete
              autoComplete="sms-otp" // Android SMS autocomplete
              placeholder="0"
              placeholderTextColor="#E8E6EA"
              caretHidden
            />
          );
        })}
      </View>

      {/*
      ===============================
      CUSTOM KEYBOARD (COMMENTED OUT)
      ===============================
      Uncomment this section if you want to use custom keyboard instead of native keyboard

      <View className="mt-auto bg-white">
        <View
          className="bg-white px-6 pb-4 pt-4"
          style={{
            backdropFilter: 'blur(54.36563491821289px)',
          }}>
          <View className="mb-4 flex-row justify-between">
            <NumberButton number="1" />
            <NumberButton number="2" />
            <NumberButton number="3" />
          </View>
          <View className="mb-4 flex-row justify-between">
            <NumberButton number="4" />
            <NumberButton number="5" />
            <NumberButton number="6" />
          </View>
          <View className="mb-4 flex-row justify-between">
            <NumberButton number="7" />
            <NumberButton number="8" />
            <NumberButton number="9" />
          </View>
          <View className="mb-4 flex-row items-center justify-between">
            <View className="w-[117px]" />
            <NumberButton number="0" />
            <TouchableOpacity
              onPress={handleDelete}
              className="h-[60px] w-[117px] items-center justify-center">
              <Ionicons name="backspace-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      */}

      {/* Send Again Button */}
      <View className="mt-auto items-center pb-16">
        <TouchableOpacity>
          <Text className="text-[16px] font-bold text-[#FA5EFF]" style={{ fontFamily: 'Roboto' }}>
            Send again
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
