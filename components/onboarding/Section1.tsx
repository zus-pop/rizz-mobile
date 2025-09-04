import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

// Section1 đã được đơn giản hóa, không còn animation
function Section1() {
  return (
    <View style={styles.sectionContainer}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets%2Fa6d8f61ef1c341c4b68d179406063e5d%2Fab5b916127be4af8b71555e3b03734d2',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Rizz</Text>
        <Text style={styles.description}>
          Users going through a vetting process to ensure you never match with bots.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingBottom: '35%',
  },
  title: {
    color: '#FA5EFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'left',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    textAlign: 'left',
  },
});

export default Section1;

