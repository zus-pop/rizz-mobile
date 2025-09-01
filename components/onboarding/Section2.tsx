import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

// --- DỮ LIỆU ẢNH MỚI CHO 3 HÀNG ---
const matchImagesCol1 = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto-format&fit=crop',
];

const matchImagesCol2 = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1756475394041-53bd65722fac?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const matchImagesCol3 = [
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1756408263381-ed1488d9b1ea?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1756456386209-2c83bab17506?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const matchImagesCol4 = [
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1756416604444-2cd4acdb7bd9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// --- CÁC HẰNG SỐ CẤU HÌNH ---
const IMAGE_HEIGHT = 200;
const DURATION = 18000;

// --- COMPONENT CON MỚI ĐỂ TẠO CỘT TRƯỢT DỌC ---
const MarqueeColumn = ({ images, reverse = false }: { images: string[], reverse?: boolean }) => {
    const totalHeight = images.length * (IMAGE_HEIGHT + 8); // Cộng thêm margin
    const translateY = useSharedValue(0);

    useEffect(() => {
        const fromValue = reverse ? -totalHeight : 0;
        const toValue = reverse ? 0 : -totalHeight;

        translateY.value = fromValue;
        translateY.value = withRepeat(
            withTiming(toValue, { duration: DURATION, easing: Easing.linear }),
            -1
        );
        return () => cancelAnimation(translateY);
    }, [images, reverse, totalHeight]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <View style={styles.column}>
            <Animated.View style={animatedStyle}>
                {[...images, ...images].map((uri, index) => (
                    <Image key={`marquee-item-${index}-${uri}`} source={{ uri }} style={styles.columnImage} />
                ))}
            </Animated.View>
        </View>
    );
};

// --- COMPONENT SECTION 2 CHÍNH ---
function Section2() {
  return (
    <View style={styles.sectionContainer}>
        <MarqueeColumn images={matchImagesCol1} />
        <MarqueeColumn images={matchImagesCol2} reverse={true} />
        <MarqueeColumn images={matchImagesCol3} />
        <MarqueeColumn images={matchImagesCol4} reverse={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    overflow: 'hidden',
  },
  column: {
      flex: 1,
      height: '150%', // Cho phép ảnh trượt ra ngoài màn hình
      marginHorizontal: 4,
  },
  columnImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    marginBottom: 8,
  },
});

export default Section2;

