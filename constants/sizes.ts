import { Dimensions, Platform, ScaledSize } from 'react-native';

export const HEADER_HEIGHT = 100;

export const ElementsText = {
  AUTOPLAY: 'AutoPlay',
};

const IS_WEB = Platform.OS === 'web';

export const MAX_WIDTH = 430;

export const WINDOW: ScaledSize = IS_WEB
  ? { width: MAX_WIDTH, height: 800, scale: 1, fontScale: 1 }
  : Dimensions.get('screen');
