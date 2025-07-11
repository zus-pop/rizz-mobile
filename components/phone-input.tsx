import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import { Divider } from './ui/divider';
import { Heading } from './ui/heading';
import { Text } from './ui/text';

interface PhoneInputSectionProps {
  onContinue: () => void;
}

export default function PhoneInputSection({ onContinue }: PhoneInputSectionProps) {
  const phoneRef = useRef<PhoneInput>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [countryCode, setCountryCode] = useState('VN'); // Default to Vietnam
  const [validationMessage, setValidationMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (number: string) => {
    if (!phoneRef.current) return;

    setPhoneNumber(number);

    // Get the current country name for better validation message
    const currentCountry = phoneRef.current.getCountryCode();
    const isValid = phoneRef.current.isValidNumber();

    console.log('Phone number changed:', { number, isValid, country: currentCountry });
    setIsValidPhone(isValid);

    if (!isValid && number.length > 0) {
      const countryName = getCountryName(currentCountry);
      setValidationMessage(`Please enter a valid ${countryName} phone number`);
    } else {
      setValidationMessage('');
    }
  };

  const getCountryName = (countryCode: string) => {
    const countryNames: { [key: string]: string } = {
      vn: 'Vietnam',
      us: 'US',
      gb: 'UK',
      fr: 'France',
      de: 'Germany',
      jp: 'Japan',
      kr: 'South Korea',
      cn: 'China',
      in: 'India',
      au: 'Australia',
      ca: 'Canada',
    };
    return countryNames[countryCode?.toLowerCase()] || 'selected country';
  };

  const isButtonDisabled = !isValidPhone || phoneNumber.length === 0;

  const handleContinuePress = () => {
    if (!phoneRef.current || isButtonDisabled) return;

    const formattedNumber = phoneRef.current.getValue();
    const phoneNumber = phoneRef.current.getISOCode() ? formattedNumber : '';

    if (isValidPhone && phoneNumber.length > 0) {
      console.log('Formatted number for server:', formattedNumber);
      onContinue();
    }
  };

  // Auto focus phone input on mount
  useEffect(() => {
    setTimeout(() => {
      phoneRef.current?.focus();
    }, 300);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingTop: '25%' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="px-10">
          {/* Header */}
          <View className="mb-16">
            <Heading className="mb-3 text-[34px] font-bold leading-[51px] text-black">
              My mobile
            </Heading>
            <Text className="text-[14px] leading-[21px] text-black/70">
              Please enter your valid phone number. We will send you a 4-digit code to verify your
              account.
            </Text>
          </View>

          {/* Phone Input Container */}
          <View className="mb-16">
            <View className="relative h-[58px] rounded-[15px] border-2 border-[#D1D5DB] bg-white">
              <PhoneInput
                ref={phoneRef}
                initialCountry="vn"
                onChangePhoneNumber={handlePhoneChange}
                style={{
                  height: 58,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 15,
                }}
                textStyle={{
                  fontSize: 14,
                  color: isValidPhone ? '#000' : '#ef4444',
                  fontFamily: 'Roboto',
                }}
                textProps={{
                  placeholder: 'Enter phone number',
                  placeholderTextColor: '#9CA3AF',
                  onSubmitEditing: handleContinuePress,
                  returnKeyType: 'done',
                }}
                renderFlag={({ imageSource }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => setShowCountryPicker(true)}>
                      <Image
                        source={imageSource}
                        style={{
                          width: 28,
                          height: 20,
                          marginRight: 8,
                          borderRadius: 2,
                        }}
                      />
                      <FontAwesome name="chevron-down" size={12} color="#9CA3AF" />
                      <Divider orientation="vertical" className="ml-2 h-5 w-[2px] bg-gray-300" />
                    </TouchableOpacity>
                  );
                }}
                offset={10}
                autoFormat={true}
                allowZeroAfterCountryCode={false}
              />
            </View>

            {/* Validation Message */}
            {validationMessage ? (
              <Text className="ml-1 mt-1 text-[12px] text-red-500" style={{ fontFamily: 'Roboto' }}>
                {validationMessage}
              </Text>
            ) : null}
          </View>

          {/* Country Picker Modal */}
          <CountryPicker
            visible={showCountryPicker}
            onClose={() => setShowCountryPicker(false)}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setShowCountryPicker(false);
              if (phoneRef.current) {
                phoneRef.current.selectCountry(country.cca2.toLowerCase());
                // Re-validate after country change
                setTimeout(() => {
                  if (phoneNumber.length > 0) {
                    handlePhoneChange(phoneNumber);
                  }
                }, 100);
              }
            }}
            renderFlagButton={() => <></>}
            countryCode={countryCode as any}
            withFilter
            withFlag
            withCallingCode
            withEmoji
          />

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinuePress}
            className={`h-[56px] items-center justify-center rounded-[15px] shadow-lg ${
              !isButtonDisabled ? 'bg-[#FA5EFF]' : 'bg-gray-400'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
            disabled={isButtonDisabled}>
            <Text className="text-[16px] font-bold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
