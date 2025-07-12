import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Button, ButtonText } from '../ui/button';

interface NextButtonProps {
  onPress: () => void;
  text?: string;
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  absolute?: boolean;
  disable?: boolean;
}

export default function NextButton({
  onPress,
  text = 'Next',
  bottom = 104,
  left = 40,
  right = 40,
  top,
  absolute = true,
  disable = false,
}: NextButtonProps) {
  const NextArrowIcon = ({ color }: { color: string }) => (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
      <Path
        d="M4.83333 14.5H24.1667M24.1667 14.5L16.9167 7.25M24.1667 14.5L16.9167 21.75"
        stroke={color}
        strokeWidth="1.8913"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const positionStyle = absolute ? { bottom, left, right, top, position: 'absolute' as const } : {};

  return (
    <Button
      onPress={onPress}
      disabled={disable}
      className={`rounded-15 h-14 flex-row items-center justify-center ${disable ? 'bg-gray-400' : 'bg-[#FA5EFF]'} ${absolute ? 'absolute' : ''}`}
      style={{
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: disable ? 0.1 : 0.25,
        shadowRadius: 4,
        elevation: disable ? 1 : 4,
        opacity: disable ? 0.6 : 1,
        ...positionStyle,
      }}>
      <ButtonText
        size="xl"
        className={`mr-2 font-roboto font-bold ${disable ? 'text-gray-600' : 'text-white'}`}>
        {text}
      </ButtonText>
      <NextArrowIcon color={disable ? 'black' : 'white'} />
    </Button>
  );
}
