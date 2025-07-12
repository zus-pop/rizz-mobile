import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomInput } from '~/components/ui/CustomInput';
import { DatePickerInput } from '~/components/ui/DatePickerInput';
import { UniversitySelect } from '~/components/ui/UniversitySelect';

export default function ProfileDetailsScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState(''); // Changed to value instead of label
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleConfirm = () => {
    // Handle form submission
    console.log('Profile details confirmed:', {
      firstName,
      lastName,
      university,
      selectedDate,
    });
    // Navigate to next screen or update profile
    router.back();
  };

  const handleSkip = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="flex-row justify-end px-10 pt-20">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="font-roboto text-base font-bold text-[#FA5EFF]">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="px-10 pt-20">
        <Text className="font-roboto text-[34px] font-bold leading-[51px] text-black">
          Profile details
        </Text>
      </View>

      {/* Form */}
      <View className="gap-4 space-y-6 px-9 pt-12">
        <CustomInput label="First name" value={firstName} onChangeText={setFirstName} />

        <CustomInput label="Last name" value={lastName} onChangeText={setLastName} />

        <DatePickerInput value={selectedDate} onPress={openDatePicker} />

        <UniversitySelect value={university} onValueChange={setUniversity} />
      </View>

      {/* Confirm Button */}
      <View className="absolute bottom-16 left-10 right-10">
        <TouchableOpacity
          onPress={handleConfirm}
          className="h-14 items-center justify-center rounded-[15px] bg-[#FA5EFF]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
          }}>
          <Text className="font-roboto text-base font-bold text-white">Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date(1995, 6, 11)}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </SafeAreaView>
  );
}
