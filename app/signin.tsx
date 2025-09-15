import GoogleSignInButton from '@/components/GoogleSignInButton';
import PhoneSignInButton from '@/components/PhoneSignInButton';
import { Button, ButtonText } from '@/components/ui/button';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function SignIn() {
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const handleTermsOfUse = () => {
    // Handle terms of use link
    console.log('Terms of use pressed');
  };

  const handlePrivacyPolicy = () => {
    // Handle privacy policy link
    console.log('Privacy policy pressed');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#FEC5D7', 'rgba(255, 229, 0, 0.55)']}
        locations={[0.5288, 1]}
        className="h-full w-full flex-1 items-center">
        <View className="mt-40">
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3bdaee751696200e21c46079fa739799f1a195d1?width=222',
            }}
            className="h-[111px] w-[111px] rounded-[21px]"
            resizeMode="cover"
          />
        </View>

        {/* Rizz Title */}
        <View className="mt-10">
          <Text className="text-center font-lobster-two text-[64px] font-normal leading-[96px] text-[#FA5EFF]">
            Rizz
          </Text>
        </View>

        {/* Sign In Section */}
        <View className="mt-8 flex gap-5">
          {/* Sign In Title */}
          <View className="">
            <Text className="text-center text-[30px] font-bold leading-[45px] text-black">
              Sign In
            </Text>
          </View>

          {/* Continue with Email Button */}
          <GoogleSignInButton isInProgress={isInProgress} setIsInProgress={setIsInProgress} />

          {/* Use Phone Number Button */}
          <PhoneSignInButton />
        </View>

        <View className="mt-24 flex flex-row gap-10">
          {/* Terms of Use */}
          <Button onPress={handleTermsOfUse} variant="link">
            <ButtonText className="text-center text-[18px] font-normal leading-[28px] text-[#FA5EFF]">
              Terms of use
            </ButtonText>
          </Button>

          {/* Privacy Policy */}
          <Button onPress={handlePrivacyPolicy} variant="link">
            <ButtonText className="text-center text-[18px] font-normal leading-[28px] text-[#FA5EFF]">
              Privacy Policy
            </ButtonText>
          </Button>
        </View>
      </LinearGradient>
    </>
  );
}
