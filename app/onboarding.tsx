import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// ***FIX: Thêm lại phần mở rộng file .tsx để đảm bảo trình biên dịch tìm thấy file***
import Section1 from '../components/onboarding/Section1';
import Section2 from '../components/onboarding/Section2';
import Section3 from '../components/onboarding/Section3';

const OnBoarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef<ICarouselInstance>(null);

  // Tối ưu hóa: Chỉ truyền isActive cho component cần nó (Section2)
  const data = [
    { id: 'section-1', component: <Section1 /> },
    { id: 'section-2', component: <Section2 isActive={currentPage === 1} /> },
    { id: 'section-3', component: <Section3 /> },
  ];
  
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
      Animated.spring(backButtonAnim, { toValue: showBackButton ? 1 : 0, useNativeDriver: true, tension: 100, friction: 8 }),
      Animated.spring(mainButtonAnim, { toValue: showBackButton ? 1 : 0, useNativeDriver: true, tension: 80, friction: 7 })
    ]).start();
  }, [currentPage]);

  const backButtonTransform = backButtonAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [120, 60, 0] });
  const backButtonScale = backButtonAnim.interpolate({ inputRange: [0, 0.4, 0.8, 1], outputRange: [0, 1.3, 0.9, 1] });
  const backButtonRotate = backButtonAnim.interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: ['0deg', '-8deg', '4deg', '0deg'] });
  const mainButtonTransform = mainButtonAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 50] });
  const mainButtonWidthScale = mainButtonAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] });
  const textScale = mainButtonAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1 / 0.7] });

  return (
    <View style={styles.flex1}>
      <Carousel
        ref={ref}
        loop={false}
        width={windowWidth}
        height={windowHeight}
        autoPlay={false}
        data={data}
        onSnapToItem={(index) => setCurrentPage(index)}
        renderItem={({ item }) => item.component}
      />

      <View style={styles.controlsOverlay}>
        <View style={styles.buttonRow}>
            <Animated.View style={[ styles.backButtonContainer, { transform: [{ translateX: backButtonTransform }, { scale: backButtonScale }, { rotate: backButtonRotate }], opacity: backButtonAnim } ]}>
                {currentPage > 0 && (
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color="#323755" />
                    </TouchableOpacity>
                )}
            </Animated.View>
            <Animated.View style={[ styles.mainButtonContainer, { transform: [{ translateX: mainButtonTransform }] } ]}>
                <Animated.View style={[ styles.buttonWrapper, { transform: [{ scaleX: mainButtonWidthScale }] } ]}>
                    <TouchableOpacity onPress={handleNextPress} style={styles.button}>
                      <Animated.Text style={[styles.buttonText, { transform: [{ scaleX: textScale }]}]}>
                        {currentPage === data.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
                      </Animated.Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
        
                <View style={styles.paginationContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.bar,
                currentPage === index && styles.activeBar,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    controlsOverlay: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        zIndex: 1,
    },
    paginationContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
bar: {
    height: 4,
    width: 35,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeBar: {
    backgroundColor: '#FFFFFF',
  },
    buttonRow: {
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

