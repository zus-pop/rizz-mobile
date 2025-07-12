import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { Text } from '../ui/text';

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  showCheckIcon?: boolean;
  showArrowIcon?: boolean;
}

export default function OptionButton({
  text,
  isSelected,
  onPress,
  showCheckIcon = false,
  showArrowIcon = false,
}: OptionButtonProps) {
  const CheckIcon = ({ color = '#ADAFBB' }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16667 9.99992L8.33334 14.1666L16.6667 5.83325"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const ArrowRightIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.32741 4.41083C7.65284 4.08539 8.18048 4.08539 8.50592 4.41083L13.5059 9.41083C13.8314 9.73626 13.8314 10.2639 13.5059 10.5893L8.50592 15.5893C8.18048 15.9148 7.65284 15.9148 7.32741 15.5893C7.00197 15.2639 7.00197 14.7363 7.32741 14.4108L11.7382 10.0001L7.32741 5.58934C7.00197 5.2639 7.00197 4.73626 7.32741 4.41083Z"
        fill="#ADAFBB"
      />
    </Svg>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-[58px] w-full rounded-2xl border ${
        isSelected
          ? 'border-[#E8E6EA] bg-[#FA5EFF]'
          : showArrowIcon
            ? 'border-[#E8E6EA] bg-white'
            : 'border-primary-0 bg-white'
      } flex-row items-center justify-between px-5`}
      style={{ borderRadius: 15 }}>
      <Text
        size="lg"
        className={`font-roboto ${isSelected ? 'font-bold text-white' : 'font-normal text-black'}`}>
        {text}
      </Text>
      {showCheckIcon && <CheckIcon color={isSelected ? 'white' : '#ADAFBB'} />}
      {showArrowIcon && <ArrowRightIcon />}
    </TouchableOpacity>
  );
}
