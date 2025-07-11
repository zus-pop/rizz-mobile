import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button, ButtonIcon, ButtonText } from '../components/ui/button';

const GoogleIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Path
      d="M9.75402 0.920933C6.95639 1.89146 4.54371 3.73355 2.87038 6.17663C1.19704 8.6197 0.351251 11.535 0.457238 14.4943C0.563224 17.4536 1.6154 20.3009 3.45922 22.618C5.30304 24.9351 7.84131 26.5999 10.7012 27.3678C13.0198 27.9661 15.449 27.9924 17.78 27.4444C19.8916 26.9701 21.8439 25.9555 23.4456 24.5C25.1126 22.9389 26.3227 20.9529 26.9456 18.7556C27.6227 16.3661 27.7431 13.8533 27.2978 11.41H14.2778V16.8109H21.8181C21.6674 17.6723 21.3444 18.4945 20.8686 19.2282C20.3927 19.9619 19.7738 20.592 19.0487 21.0809C18.1279 21.69 17.09 22.0998 16.0015 22.2841C14.9098 22.4871 13.7901 22.4871 12.6984 22.2841C11.5919 22.0553 10.5452 21.5986 9.62496 20.9431C8.14653 19.8966 7.03644 18.4098 6.45308 16.695C5.85986 14.948 5.85986 13.0541 6.45308 11.3072C6.86833 10.0827 7.55478 8.96773 8.46121 8.04562C9.4985 6.971 10.8117 6.20286 12.2569 5.82548C13.702 5.44809 15.2231 5.47603 16.6534 5.90625C17.7707 6.24923 18.7924 6.84848 19.6371 7.65625C20.4874 6.81041 21.3361 5.96239 22.1834 5.11218C22.6209 4.655 23.0978 4.21968 23.5287 3.75156C22.2393 2.55166 20.7258 1.618 19.075 1.00406C16.0687 -0.0875264 12.7793 -0.116862 9.75402 0.920933Z"
      fill="white"
    />
    <Path
      d="M9.75407 0.920928C12.7791 -0.117572 16.0685 -0.0890089 19.075 1.00187C20.7262 1.61997 22.239 2.55814 23.5266 3.76249C23.0891 4.23062 22.6275 4.66812 22.1813 5.12312C21.3325 5.97041 20.4845 6.81478 19.6372 7.65624C18.7925 6.84848 17.7708 6.24922 16.6534 5.90624C15.2236 5.47452 13.7025 5.44496 12.2571 5.8208C10.8116 6.19665 9.4975 6.96338 8.45907 8.03687C7.55265 8.95897 6.86619 10.0739 6.45095 11.2984L1.91626 7.78749C3.5394 4.56872 6.34977 2.10661 9.75407 0.920928Z"
      fill="#E33629"
    />
    <Path
      d="M0.713138 11.2656C0.956872 10.0577 1.36152 8.88788 1.91626 7.78751L6.45095 11.3072C5.85773 13.0541 5.85773 14.9481 6.45095 16.695C4.94012 17.8617 3.42856 19.0342 1.91626 20.2125C0.52753 17.4482 0.103991 14.2986 0.713138 11.2656Z"
      fill="#F8BD00"
    />
    <Path
      d="M14.2778 11.4078H27.2978C27.7432 13.8511 27.6227 16.364 26.9456 18.7535C26.3227 20.9508 25.1127 22.9367 23.4456 24.4978C21.9822 23.356 20.5122 22.2228 19.0488 21.081C19.7743 20.5916 20.3936 19.9607 20.8694 19.2263C21.3453 18.4918 21.668 17.6688 21.8181 16.8066H14.2778C14.2756 15.0085 14.2778 13.2081 14.2778 11.4078Z"
      fill="#587DBD"
    />
    <Path
      d="M1.91406 20.2125C3.42635 19.0458 4.93792 17.8733 6.44875 16.695C7.03327 18.4104 8.14495 19.8973 9.625 20.9431C10.5481 21.5956 11.5971 22.0485 12.705 22.2731C13.7967 22.4761 14.9164 22.4761 16.0081 22.2731C17.0966 22.0889 18.1346 21.6791 19.0553 21.07C20.5187 22.2119 21.9888 23.345 23.4522 24.4869C21.8507 25.9432 19.8984 26.9585 17.7866 27.4334C15.4556 27.9814 13.0264 27.9552 10.7078 27.3569C8.87404 26.8673 7.16116 26.0041 5.67656 24.8216C4.1052 23.574 2.82178 22.0018 1.91406 20.2125Z"
      fill="#319F43"
    />
  </Svg>
);

const PhoneIcon = () => <FontAwesome name="phone" size={30} color={'pink'} />;

const SignIn = () => {
  const handleContinueWithEmail = () => {
    // Handle email sign in
    console.log('Continue with email pressed');
  };

  const handleUsePhoneNumber = () => {
    // Handle phone number sign in
    console.log('Use phone number pressed');
  };

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
          <Text className="font-lobster-two text-center text-[64px] font-normal leading-[96px] text-[#FA5EFF]">
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
          <Button
            onPress={handleContinueWithEmail}
            variant="solid"
            size="lg"
            className="flex h-[56px] w-[295px] flex-row items-center justify-center gap-8 rounded-[28px] bg-white shadow-lg shadow-black/25">
            <ButtonIcon as={GoogleIcon} />
            <ButtonText className="text-center text-[16px] font-medium text-[#FA5EFF]">
              Continue with email
            </ButtonText>
          </Button>

          {/* Use Phone Number Button */}
          <Button
            onPress={handleUsePhoneNumber}
            variant="solid"
            size="lg"
            className="flex h-[56px] w-[295px] flex-row items-center justify-center gap-8 rounded-[28px] bg-white shadow-lg shadow-black/25">
            <ButtonIcon as={PhoneIcon} />
            <ButtonText className="text-[#FA5EFF]">Use phone number</ButtonText>
          </Button>
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
};
export default SignIn;
