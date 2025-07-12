import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

interface BackButtonProps {
  onPress: () => void;
  top?: number;
  left?: number;
  absolute?: boolean;
}

export default function BackButton({
  onPress,
  top = 44,
  left = 40,
  absolute = true,
}: BackButtonProps) {
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

  const positionStyle = absolute ? { top, left, position: 'absolute' as const } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-13 h-13 rounded-15 items-center justify-center border border-[#E8E6EA] bg-white ${absolute ? 'absolute z-10' : ''}`}
      style={{
        width: 52,
        height: 52,
        borderRadius: 15,
        ...positionStyle,
      }}>
      <BackIcon />
    </TouchableOpacity>
  );
}
