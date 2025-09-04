import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

// Section3 đã được đơn giản hóa, không còn animation
function Section3() {
  return (
    <View style={styles.sectionContainer}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets%2Fa6d8f61ef1c341c4b68d179406063e5d%2Fbeef0aedf8ed4406866717e22dd44204' }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textOverlay}>
            <Text style={styles.title}>Premium</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>Sign up today and try premium for free on 3 days</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    backgroundColor: '#FEC5D7' 
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  textOverlay: { 
    position: 'absolute', 
    bottom: '25%', 
    left: 40, 
    right: 40, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 42, 
    fontWeight: 'bold', 
    color: '#FA5EFF', 
    textAlign: 'center' 
  },
  descriptionContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    borderRadius: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    marginTop: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.6)' 
  },
  description: { 
    fontSize: 16, 
    color: '#374151', 
    textAlign: 'center' 
  },
});

export default Section3;

