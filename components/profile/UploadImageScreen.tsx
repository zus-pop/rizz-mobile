import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface UploadImageScreenProps {
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export default function UploadImageScreen({ onNext, onBack, onSkip }: UploadImageScreenProps) {
  const [uploadedPhotos, setUploadedPhotos] = useState<number[]>([]);

  const CameraIcon = () => (
    <Svg width="49" height="49" viewBox="0 0 49 49" fill="none">
      <Path
        d="M29.6043 8.1665H19.396L14.2918 14.2915H8.16683C7.08386 14.2915 6.04525 14.7217 5.27948 15.4875C4.5137 16.2533 4.0835 17.2919 4.0835 18.3748V36.7498C4.0835 37.8328 4.5137 38.8714 5.27948 39.6372C6.04525 40.403 7.08386 40.8332 8.16683 40.8332H40.8335C41.9165 40.8332 42.9551 40.403 43.7209 39.6372C44.4866 38.8714 44.9168 37.8328 44.9168 36.7498V18.3748C44.9168 17.2919 44.4866 16.2533 43.7209 15.4875C42.9551 14.7217 41.9165 14.2915 40.8335 14.2915H34.7085L29.6043 8.1665Z"
        stroke="#D348EC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.5 32.6665C27.8827 32.6665 30.625 29.9242 30.625 26.5415C30.625 23.1588 27.8827 20.4165 24.5 20.4165C21.1173 20.4165 18.375 23.1588 18.375 26.5415C18.375 29.9242 21.1173 32.6665 24.5 32.6665Z"
        stroke="#D348EC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const UploadIcon = () => (
    <Svg width="18" height="17" viewBox="0 0 18 17" fill="none">
      <Path
        d="M15.0585 10.1978V12.912C15.0585 13.272 14.9155 13.6172 14.661 13.8717C14.4065 14.1262 14.0613 14.2692 13.7014 14.2692H4.20138C3.84144 14.2692 3.49625 14.1262 3.24174 13.8717C2.98722 13.6172 2.84424 13.272 2.84424 12.912V10.1978"
        stroke="#9CA3AF"
        strokeWidth="1.35714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.3443 5.44779L8.95145 2.05493L5.55859 5.44779"
        stroke="#9CA3AF"
        strokeWidth="1.35714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.95117 2.05493V10.1978"
        stroke="#9CA3AF"
        strokeWidth="1.35714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const addPhoto = (index: number) => {
    setUploadedPhotos((prev) => [...prev, index]);
  };

  const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071Z"
        fill="#FA5EFF"
      />
    </Svg>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header with Back and Skip buttons */}
      <View className="flex-row items-center justify-between px-6 pb-4 pt-14">
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            className="h-13 w-13 rounded-15 items-center justify-center border border-[#E8E6EA] bg-white"
            style={{ width: 52, height: 52, borderRadius: 15 }}>
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 52 }} />
        )}

        {onSkip ? (
          <TouchableOpacity onPress={onSkip}>
            <Text className="text-16 font-roboto font-bold text-[#FA5EFF]">Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Header Section */}
        <View className="mb-8 items-center">
          <Text className="mb-4 text-center font-roboto text-[34px] font-bold leading-[51px] text-black">
            Add photos
          </Text>

          {/* Camera Icon */}
          <View
            className="mb-8 h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FBE7FC]"
            style={{ borderRadius: 71 / 2 }}>
            <CameraIcon />
          </View>

          {/* Title */}
          <Text className="font-geist text-24 mb-4 text-center font-bold leading-[28px] text-[#111827]">
            Upload Your Best Photos
          </Text>

          {/* Subtitle */}
          <Text className="font-geist text-16 mb-8 px-4 text-center font-normal leading-[20px] text-[#4B5563]">
            Add at least 2 photos to get started. More photos help you get better matches!
          </Text>
        </View>

        {/* Photo Grid */}
        <View className="mb-8 w-full max-w-[280px]">
          <View className="flex-row flex-wrap justify-between">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => addPhoto(index)}
                className="mb-4 h-20 w-20 items-center justify-center rounded-md border border-dashed border-[#D1D5DB]"
                style={{
                  borderRadius: 5.429,
                  borderWidth: 0.679,
                  width: '30%',
                }}>
                <UploadIcon />
                <Text className="font-geist mt-1 text-center text-[8px] font-normal text-[#6B7280]">
                  Add Photo
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={onNext}
          className="rounded-15 h-14 w-full max-w-[320px] items-center justify-center bg-[#FA5EFF]"
          style={{
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}>
          <Text className="text-16 font-roboto font-bold text-white">
            Continue ({uploadedPhotos.length}/2 minimum)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
