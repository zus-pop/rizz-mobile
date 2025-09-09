/* eslint-disable @typescript-eslint/no-var-requires */
import { useFont, Text } from '@shopify/react-native-skia';
import React from 'react';
import { useWindowDimensions } from 'react-native';

const typeface = require('@/assets/fonts/MarckScript-Regular.ttf');
const subTypeface = require('@/assets/fonts/Raleway-Medium.ttf');

interface TitleProps {
  title: string;
  subtitle?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
  titleOpacity?: number;
  subtitleOpacity?: number;
  bottomOffset?: number;
  spacing?: number;
}

export const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  titleFontSize = 81,
  subtitleFontSize = 24,
  titleOpacity = 0.8,
  subtitleOpacity = 0.5,
  bottomOffset = 150,
  spacing = 50,
}) => {
  const { width, height } = useWindowDimensions();
  const font = useFont(typeface, titleFontSize);
  const subFont = useFont(subtitle ? subTypeface : null, subtitleFontSize);

  if (!font) {
    return null;
  }

  const x1 = (width - font.getTextWidth(title)) / 2;

  return (
    <>
      <Text
        font={font}
        x={x1}
        y={height - bottomOffset}
        text={title}
        color="white"
        opacity={titleOpacity}
      />
      {subtitle && subFont && (
        <Text
          font={subFont}
          x={(width - subFont.getTextWidth(subtitle.toUpperCase())) / 2}
          y={height - bottomOffset + spacing}
          text={subtitle.toUpperCase()}
          color="white"
          opacity={subtitleOpacity}
        />
      )}
    </>
  );
};
