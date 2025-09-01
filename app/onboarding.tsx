import { router } from 'expo-router';
import React, { type JSX, useEffect, useRef, useState, type RefObject } from 'react';
import { Animated, Dimensions, TouchableOpacity, View, Text as RNText, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

// Import các section components
import Section1 from '../components/onboarding/Section1';
import Section2 from '../components/onboarding/Section2';
import Section3 from '../components/onboarding/Section3';

// --- PLACEHOLDER CHO COMPONENT TEXT TÙY CHỈNH ---
const Text = (props: any) => <RNText {...props} />;

// --- DỮ LIỆU CHO CÁC SLIDE ---
const data = [
  { id: 'section-1', component: <Section1 /> },
  { id: 'section-2', component: <Section2 /> },
  { id: 'section-3', component: <Section3 /> },
];

// --- COMPONENT CHÍNH CHO MÀN HÌNH ONBOARDING ---
const OnBoarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const [fontsLoaded, fontError] = useFonts({
    'LobsterTwo': require('../assets/font/LobsterTwo-Regular.ttf'),
  });
  
  const backButtonAnim = useRef(new Animated.Value(0)).current;
  const mainButtonAnim = useRef(new Animated.Value(0)).current;
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@hasSeenWelcomeScreen', 'true');
      router.replace('/(tabs)');
    } catch (e) {
      console.error("Lỗi khi lưu trạng thái màn hình chào mừng.", e);
      router.replace('/(tabs)');
    }
  };
  
  const handleNextPress = () => {
    if (currentPage < data.length - 1) {
      ref.current?.next();
    } else {
      finishOnboarding();
    }
  };

  const handleBackPress = () => {
    ref.current?.prev();
  };

  useEffect(() => {
    const showBackButton = currentPage > 0;
    
    Animated.parallel([
      Animated.spring(backButtonAnim, {
        toValue: showBackButton ? 1 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(mainButtonAnim, {
        toValue: showBackButton ? 1 : 0,
        useNativeDriver: true,
        tension: 80,
        friction: 7,
      })
    ]).start();
  }, [currentPage]);

  const backButtonTransform = backButtonAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [120, 60, 0],
  });

  const backButtonScale = backButtonAnim.interpolate({
    inputRange: [0, 0.4, 0.8, 1],
    outputRange: [0, 1.3, 0.9, 1],
  });

  const backButtonRotate = backButtonAnim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ['0deg', '-8deg', '4deg', '0deg'],
  });

  const mainButtonTransform = mainButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });
  
  const mainButtonWidthScale = mainButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  const textScale = mainButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1 / 0.7],
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#FEC5D7', 'rgba(255, 229, 0, 0.55)']}
      locations={[0.4, 1]}
      style={styles.flex1}>
      
      <Carousel
        ref={ref}
        loop={false}
        width={windowWidth}
        height={windowHeight}
        autoPlay={false}
        data={data}
        onProgressChange={progress}
        onSnapToItem={(index) => setCurrentPage(index)}
        renderItem={({ item }) => item.component}
      />

      {/* Các nút điều khiển và pagination */}
      <View style={styles.bottomContainer}>
        {/* Nút bấm */}
        <View style={styles.buttonRow}>
          <Animated.View style={[
            styles.backButtonContainer, 
            {
              transform: [
                { translateX: backButtonTransform },
                { scale: backButtonScale },
                { rotate: backButtonRotate }
              ],
              opacity: backButtonAnim
            }
          ]}>
            {currentPage > 0 && (
              <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={20} color="#323755" />
              </TouchableOpacity>
            )}
          </Animated.View>
          
          <Animated.View style={[
            styles.mainButtonContainer, 
            {
              transform: [{ translateX: mainButtonTransform }]
            }
          ]}>
            <Animated.View style={[
              styles.buttonWrapper,
              {
                transform: [{ scaleX: mainButtonWidthScale }]
              }
            ]}>
              <TouchableOpacity onPress={handleNextPress} style={styles.button}>
                <Animated.Text style={[styles.buttonText, { transform: [{ scaleX: textScale }]}]}>
                  {currentPage === data.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
        
        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
    zIndex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FA5EFF',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 35,
    left: 40,
    right: 40,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    height: 56,
    width: 85,
    zIndex: 1,
  },
  mainButtonContainer: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonWrapper: { 
    height: 56,
    width: '100%',
  },
  backButton: {
    height: 56,
    width: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#FA5EFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginLeft: 0,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoarding;