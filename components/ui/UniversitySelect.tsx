import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Svg, Path } from 'react-native-svg';

interface UniversitySelectProps {
    value: string;
    onValueChange: (value: string) => void;
}

const universities = [
    { label: 'Select University', value: '' },
    { label: 'FPT University', value: 'fpt' },
    { label: 'Vietnam National University', value: 'vnu' },
    { label: 'Hanoi University of Science and Technology', value: 'hust' },
    { label: 'Ho Chi Minh City University of Technology', value: 'hcmut' },
    { label: 'University of Economics Ho Chi Minh City', value: 'ueh' },
    { label: 'Can Tho University', value: 'ctu' },
    { label: 'Da Nang University', value: 'dnu' },
    { label: 'Hue University', value: 'hue' },
];

export const UniversitySelect: React.FC<UniversitySelectProps> = ({ value, onValueChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const selectedUniversity = universities.find((u) => u.value === value);
    const displayText = selectedUniversity?.label || 'Select University';

    const handleValueChange = (itemValue: string) => {
        onValueChange(itemValue);
        setShowPicker(false);
    };

    return (
        <>
            <View className="relative h-[67px]">
                {/* Container */}
                <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    className="absolute top-[9px] h-[58px] w-full rounded-[15px] border border-[#E8E6EA] bg-white"
                />

                {/* White line for label */}
                <View className="absolute left-5 top-[9px] h-[1px] w-[73px] bg-white" />

                {/* Label */}
                <Text className="absolute left-7 top-0 font-roboto text-[12px] font-normal leading-[18px] text-black/40">
                    University
                </Text>

                {/* Value and Arrow Container */}
                <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    className="absolute left-5 right-5 top-[27px] flex-row items-center justify-between">
                    <Text className="flex-1 font-roboto text-[14px] font-normal leading-[21px] text-black">
                        {displayText}
                    </Text>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M6 9L12 15L18 9"
                            stroke="#666"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>

            {/* Picker Modal */}
            <Modal
                visible={showPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPicker(false)}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="rounded-t-2xl bg-white">
                        {/* Header */}
                        <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                            <TouchableOpacity onPress={() => setShowPicker(false)}>
                                <Text className="font-roboto text-base font-medium text-[#FA5EFF]">Cancel</Text>
                            </TouchableOpacity>
                            <Text className="font-roboto text-base font-bold text-black">Select University</Text>
                            <TouchableOpacity onPress={() => setShowPicker(false)}>
                                <Text className="font-roboto text-base font-bold text-[#FA5EFF]">Done</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Picker */}
                        <Picker selectedValue={value} onValueChange={handleValueChange} style={{ height: 200 }}>
                            {universities.map((university) => (
                                <Picker.Item
                                    key={university.value}
                                    label={university.label}
                                    value={university.value}
                                    color={university.value === '' ? '#999' : '#000'}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </Modal>
        </>
    );
};
