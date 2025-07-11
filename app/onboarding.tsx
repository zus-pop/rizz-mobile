import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const OnBoarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Match images data
  const matchImages = [
    'https://cdn.builder.io/api/v1/image/assets/TEMP/6aa270fe09382d4314733d886b1a8124655a8a84?width=400',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/eb91facca97c5b42a780220d800b7b7242e54cd6?width=470',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/d50fd443d2629ca8bd590e3e2cbdfc2979c2486d?width=400',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/6aa270fe09382d4314733d886b1a8124655a8a84?width=400',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/eb91facca97c5b42a780220d800b7b7242e54cd6?width=470',
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const page = Math.round(scrollX / screenWidth);
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    router.replace('/signin');
  };

  // Auto-slide main sections every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % 3;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPage]);

  // Auto-slide match images every 2 seconds when on matches section with smooth animation
  useEffect(() => {
    if (currentPage === 1) {
      const interval = setInterval(() => {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Change images
          setCurrentMatchIndex((prev) => (prev + 1) % matchImages.length);
          // Fade in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentPage, matchImages.length, fadeAnim]);

  const PaginationDots = () => (
    <View className="mt-4 flex-row items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === currentPage ? 'bg-[#FA5EFF] shadow-lg' : 'bg-black opacity-10'
          }`}
        />
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#FEC5D7', 'rgba(255, 229, 0, 0.55)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={currentPage === 0 ? [0.4381, 0.9998] : [0, 1]}
      className="flex-1">
      {/* Scrollable Images Section */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1">
        {/* Section 1 - Rizz Image */}
        <View className="relative w-screen">
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/630f9fab99a7a312cbbaa6b8172ac9becf4499dd?width=1760',
            }}
            className="top-[44px] h-[400px] w-full"
            resizeMode="cover"
          />
        </View>

        {/* Section 2 - Matches Images */}
        <View className="relative w-screen" style={{ overflow: 'hidden' }}>
          <Animated.View
            className="absolute -left-[154px] top-[76px] h-[360px] w-[683px]"
            style={{ opacity: fadeAnim }}>
            <Image
              source={{ uri: matchImages[currentMatchIndex % matchImages.length] }}
              className="absolute left-0 top-[30px] h-[300px] w-[200px] rounded-2xl"
              resizeMode="cover"
            />
            <Image
              source={{ uri: matchImages[(currentMatchIndex + 1) % matchImages.length] }}
              className="absolute left-[224px] top-0 h-[360px] w-[235px] rounded-2xl"
              resizeMode="cover"
            />
            <Image
              source={{ uri: matchImages[(currentMatchIndex + 2) % matchImages.length] }}
              className="absolute left-[483px] top-[30px] h-[300px] w-[200px] rounded-2xl"
              resizeMode="cover"
            />
          </Animated.View>
        </View>

        {/* Section 3 - Premium Image */}
        <View className="relative w-screen">
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ffceb197d576fcb9709758d4455cfe9ea6e10e18?width=836',
            }}
            className="absolute left-[-20px] top-[80px] h-[418px] w-[418px]"
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Fixed Content Section at Bottom */}
      <View className="absolute bottom-[170px] left-0 right-0">
        {/* Centered Title */}
        <View className="mb-4 items-center">
          <Text
            className={`font-roboto text-center text-[#FA5EFF] ${
              currentPage === 0
                ? 'font-lobster-two text-5xl font-normal leading-[72px]'
                : 'text-2xl font-bold leading-9'
            }`}>
            {currentPage === 0 && 'Rizz'}
            {currentPage === 1 && 'Matches'}
            {currentPage === 2 && 'Premium'}
          </Text>
        </View>

        {/* Description Text */}
        <View className="px-10">
          <Text className="font-roboto mb-4 text-center text-sm font-normal leading-5 text-[#323755]">
            {currentPage === 0 &&
              'Users going through a vetting process to ensure you never match with bots.'}
            {currentPage === 1 &&
              'We match you with people that have a large array of similar interests.'}
            {currentPage === 2 && 'Sign up today and try premium for free on 3 days'}
          </Text>
        </View>

        <PaginationDots />
      </View>

      {/* Getting Started Button */}
      <View className="absolute bottom-[70px] left-[40px] right-[40px]">
        <TouchableOpacity
          onPress={handleGetStarted}
          className="mx-auto h-14 w-[295px] items-center justify-center rounded-2xl bg-[#FA5EFF]">
          <Text className="font-roboto text-center text-base font-bold leading-6 text-white">
            Getting start
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default OnBoarding;
