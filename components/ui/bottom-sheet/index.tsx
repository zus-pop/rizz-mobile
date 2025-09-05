import type { BottomSheetModal as BSModalType } from '@gorhom/bottom-sheet';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetHandle as BSHandle,
  BottomSheetModal as BSModal,
  BottomSheetScrollView as BSScrollView,
  BottomSheetView as BSView,
} from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';
import React, { forwardRef, Fragment, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BottomSheetProps, BSHandleProps, CustomBackdropProps } from './types';

const BottomSheetTrigger = Fragment;

type BottomSheetModalType = BSModalType;

const BottomSheetModalType = forwardRef<
  BSModal,
  BottomSheetProps & { children: React.ReactNode; isOpen?: boolean }
>(({ children, ...rest }: BottomSheetProps, ref) => {
  return (
    <BSModal ref={ref} {...rest}>
      {children}
    </BSModal>
  );
});

const BottomSheetView = cssInterop(BSView, {
  className: 'style',
});

const BottomSheetScrollView = cssInterop(BSScrollView, {
  className: 'style',
  contentContainerclassName: 'contentContainerStyle',
});

const BottomSheetHandle: React.FC<BSHandleProps> = BSHandle;

const CustomBackdrop = ({ animatedIndex, style, onPress }: CustomBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

export {
  BottomSheet,
  BottomSheetHandle,
  BottomSheetModalType as BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTrigger,
  BottomSheetView,
  CustomBackdrop,
};
