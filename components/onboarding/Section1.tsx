import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

function Section1() {
  const scale = useSharedValue(1);

  useEffect(() => {
      scale.value = withRepeat(withTiming(1.05, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.sectionContainer}>
        <Animated.View style={animatedStyle}>
            <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/630f9fab99a7a312cbbaa6b8172ac9becf4499dd?width=1760' }}
                style={styles.section1Image}
                resizeMode="contain"
            />
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  section1Image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
  },
});

export default Section1;

