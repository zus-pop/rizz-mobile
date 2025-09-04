import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

// Tối ưu hóa: Yêu cầu ảnh có kích thước nhỏ hơn từ Unsplash
const smallImage = (url: string) => `${url}&w=400&h=600&fit=crop`;

// Dữ liệu ảnh đã được tối ưu
const matchImagesCol1 = [ smallImage('https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80'), smallImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80'), smallImage('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80'), smallImage('https://images.unsplash.com/photo-1755278338952-39f52d8e6eab?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ];
const matchImagesCol2 = [ smallImage('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80'), smallImage('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80'), smallImage('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80'), smallImage('https://images.unsplash.com/photo-1706816997334-c51bcd0f52e0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ];
const matchImagesCol3 = [ smallImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80'), smallImage('https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80'), smallImage('https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80'), smallImage('https://images.unsplash.com/photo-1708370309928-a3cab380f5a7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ];
const matchImagesCol4 = [ smallImage('https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80'), smallImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80'), smallImage('https://images.unsplash.com/photo-1722110390393-fa9fa0b0d685?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), smallImage('https://images.unsplash.com/photo-1756749477606-5d8939dbfb8b?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ];
const IMAGE_HEIGHT = 200;
const DURATION = 18000;
const GAP = 8;

const MarqueeColumn = React.memo(({ images, reverse = false, isActive }: { images: string[], reverse?: boolean, isActive: boolean }) => {
    const translateY = useSharedValue(0);
    
    useEffect(() => {
        if (isActive) {
            const totalHeight = images.length * (IMAGE_HEIGHT + GAP);
            const fromValue = reverse ? -totalHeight : 0;
            const toValue = reverse ? 0 : -totalHeight;
            translateY.value = fromValue;
            translateY.value = withRepeat(withTiming(toValue, { duration: DURATION, easing: Easing.linear }), -1);
        } else {
            cancelAnimation(translateY);
        }
        return () => cancelAnimation(translateY);
    }, [isActive, images, reverse]); // ***FIX: Đơn giản hóa dependency array***

    const animatedStyle = useAnimatedStyle(() => ({ 
        transform: [{ translateY: translateY.value }] 
    }));

    return (
        <View style={styles.column}>
            <Animated.View style={animatedStyle}>
                {[...images, ...images].map((uri, index) => ( 
                    // ***FIX: Sửa lại key cho đúng cú pháp template literal***
                    <Image key={`marquee-item-${index}-${uri}`} source={{ uri }} style={styles.columnImage} /> 
                ))}
            </Animated.View>
        </View>
    );
});

const Section2 = React.memo(({ isActive }: { isActive: boolean }) => {
  return (
    <View style={styles.sectionContainer}>
        <View style={styles.marqueeGrid}>
            <MarqueeColumn images={matchImagesCol1} isActive={isActive} />
            <MarqueeColumn images={matchImagesCol2} reverse={true} isActive={isActive} />
            <MarqueeColumn images={matchImagesCol3} isActive={isActive} />
            <MarqueeColumn images={matchImagesCol4} reverse={true} isActive={isActive} />
        </View>
        <View style={styles.textOverlay}>
            <Text style={styles.title}>Matches</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>We match you with people that have a large array of similar interests.</Text>
            </View>
        </View>
    </View>
  );
});

const styles = StyleSheet.create({
  sectionContainer: { flex: 1, width: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEC5D7' },
  marqueeGrid: { width: '120%', height: '100%', flexDirection: 'row' },
  column: { flex: 1, height: '180%', marginHorizontal: GAP / 2 },
  columnImage: { width: '100%', height: IMAGE_HEIGHT, borderRadius: 16, marginBottom: GAP },
  textOverlay: { position: 'absolute', bottom: '25%', left: 40, right: 40, alignItems: 'center' },
  title: { fontSize: 42, fontWeight: 'bold', color: '#FA5EFF', textAlign: 'center' },
  descriptionContainer: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20, marginTop: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)' },
  description: { fontSize: 16, color: '#374151', textAlign: 'center' },
});

export default Section2;

