import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Canvas,
  Blur,
  BackdropFilter,
  Fill,
  rrect,
  rect,
  Path,
  Skia,
} from '@shopify/react-native-skia';

export interface GlassContainerProps {
  children: React.ReactNode;
  borderRadius?: number;
  blurAmount?: number;
  style?: StyleProp<ViewStyle>;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  borderRadius = 30,
  blurAmount = 8,
  style,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const containerStyle = StyleSheet.flatten(style) || {};
  const width = (containerStyle.width as number) || 280;
  const height = (containerStyle.height as number) || 70;

  // Màu sắc được tinh chỉnh cho hiệu ứng Uiverse
  const overlayColor = isDarkMode ? 'rgba(40, 40, 40, 0.35)' : 'rgba(255, 255, 255, 0.15)';
  const strokeColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.25)';

  const clipRRect = rrect(rect(0, 0, width, height), borderRadius, borderRadius);
  const clipPath = Skia.Path.Make();
  clipPath.addRRect(clipRRect);

  return (
    <View style={style}>
      <Canvas style={styles.canvas}>
        {/* BackdropFilter sẽ lấy nền và áp dụng bộ lọc mờ */}
        <BackdropFilter filter={<Blur blur={blurAmount} />} clip={clipPath}>
          {/* Lớp phủ màu nền cho kính */}
          <Fill color={overlayColor} />
        </BackdropFilter>

        {/* Vẽ một đường viền ngoài cùng sắc nét */}
        <Path
          path={clipPath}
          style="stroke"
          strokeWidth={1}
          color={strokeColor}
        />
      </Canvas>

      {/* Nội dung được đặt phía trên Canvas */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
});

export default GlassContainer;
