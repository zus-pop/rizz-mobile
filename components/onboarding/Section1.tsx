import React, { useEffect } from 'react';
// ***FIX: Dọn dẹp import, loại bỏ Dimensions***
import { View, StyleSheet, Image, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// --- COMPONENT CHÍNH ---
function Section1() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.05, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    width: '100%',
    height: '100%',
  }));

  return (
    <View style={styles.container}>
      {/* Phần hình ảnh */}
      <View style={styles.sectionContainer}>
        <Animated.View style={animatedStyle}>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets%2Fa6d8f61ef1c341c4b68d179406063e5d%2F0a096c75abd84b6baa9d60a16a874837',
            }}
            style={styles.section1Image}
            resizeMode="cover"
          />
        </Animated.View>
      </View>

      {/* Phần tiêu đề ở trên top */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleRizz}>Rizz</Text>
      </View>

      {/* Phần nội dung ở dưới bottom */}
      <View style={styles.bottomContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Users going through a vetting process to ensure you never match with bots.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  section1Image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1,
  },
  titleRizz: {
    fontFamily: 'LobsterTwo',
    fontSize: 64,
    color: '#FA5EFF',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
});

export default Section1;

