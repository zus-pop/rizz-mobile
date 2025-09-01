import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

function Section3() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000 }),
        withTiming(10, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({

    width: '100%',
    height: '100%',
  }));

  return (
    <View style={styles.container}>
      {/* Phần hình ảnh */}
      <View style={styles.sectionContainer}>
        <Animated.View style={animatedStyle}>
          {/* ***FIX: Sử dụng component Image tiêu chuẩn để tăng tính ổn định*** */}
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets%2Fa6d8f61ef1c341c4b68d179406063e5d%2Fbbaf01a15cd742dd96f9846cb553643e',
            }}
            style={styles.section3Image}
            resizeMode="cover"
          />
        </Animated.View>
      </View>

      {/* Phần nội dung text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Premium</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Sign up today and try premium for free on 3 days
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
  section3Image: {
    width: '100%',
    height: '100%',
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
  title: {
    fontSize: 64,
    fontWeight: 'bold',
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

export default Section3;

