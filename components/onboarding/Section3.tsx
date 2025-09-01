import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

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
      transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.sectionContainer}>
        <Animated.View style={animatedStyle}>
            <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ffceb197d576fcb9709758d4455cfe9ea6e10e18?width=836' }}
                style={styles.section3Image}
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
  section3Image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});

export default Section3;
