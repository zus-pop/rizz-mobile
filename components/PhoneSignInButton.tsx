import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button, ButtonIcon, ButtonText } from './ui/button';
const PhoneIcon = () => <FontAwesome name="phone" size={30} color={'#FA5EFF'} />;
const PhoneSignInButton = () => {
  const handleUsePhoneNumber = () => {
    router.push('/phone-register');
  };
  return (
    <Button
      onPress={handleUsePhoneNumber}
      variant="solid"
      size="lg"
      className="flex h-[56px] w-[295px] flex-row items-center justify-center gap-8 rounded-[28px] bg-white shadow-lg shadow-black/25">
      <ButtonIcon as={PhoneIcon} />
      <ButtonText className="text-[#FA5EFF]">Use phone number</ButtonText>
    </Button>
  );
};

export default PhoneSignInButton;
