import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { Text } from '../components/ui/text';

const data = [
  {
    id: 'section-1',
    component: <Section1 />,
  },
  {
    id: 'section-2',
    component: <Section2 />,
  },
  {
    id: 'section-3',
    component: <Section3 />,
  },
];

const matchImages = [
  'https://cdn.builder.io/api/v1/image/assets/TEMP/6aa270fe09382d4314733d886b1a8124655a8a84?width=400',
  'https://cdn.builder.io/api/v1/image/assets/TEMP/eb91facca97c5b42a780220d800b7b7242e54cd6?width=470',
  'https://cdn.builder.io/api/v1/image/assets/TEMP/d50fd443d2629ca8bd590e3e2cbdfc2979c2486d?width=400',
  'https://cdn.builder.io/api/v1/image/assets/TEMP/6aa270fe09382d4314733d886b1a8124655a8a84?width=400',
  'https://cdn.builder.io/api/v1/image/assets/TEMP/eb91facca97c5b42a780220d800b7b7242e54cd6?width=470',
];

const OnBoarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const handleGetStarted = () => {
    router.replace('/signin');
  };

  return (
    <LinearGradient
      colors={['#FEC5D7', 'rgba(255, 229, 0, 0.55)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={currentPage === 0 ? [0.4381, 0.9998] : [0, 1]}
      className="flex-1">
      <View>
        <Carousel
          ref={ref}
          loop
          autoPlay
          width={Dimensions.get('window').width}
          onProgressChange={progress}
          snapEnabled
          withAnimation={{
            type: 'timing',
            config: {
              duration: 1500,
            },
          }}
          autoPlayInterval={3000}
          height={Dimensions.get('window').height * 0.8}
          style={{ zIndex: 100 }}
          pagingEnabled
          data={data}
          onSnapToItem={(index) => {
            setCurrentPage(index);
          }}
          renderItem={({ item }) => item.component}
        />
      </View>

      <Pagination.Custom<{ id: string; component: JSX.Element }>
        progress={progress}
        data={data}
        size={10}
        dotStyle={{ backgroundColor: '#ffffff', borderRadius: 16 }}
        activeDotStyle={{
          overflow: 'hidden',
          backgroundColor: '#FA5EFF',
          borderRadius: 8,
          width: 15,
          height: 15,
        }}
        containerStyle={{ gap: 5, marginBottom: 10, alignItems: 'center', height: 10 }}
        horizontal
        onPress={onPressPagination}
        customReanimatedStyle={(progress, index, length) => {
          let val = Math.abs(progress - index);
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length);
          }

          return {
            transform: [
              {
                translateY: interpolate(val, [0, 1], [0, 0], Extrapolation.CLAMP),
              },
            ],
          };
        }}
      />

      {/* Fixed Content Section at Bottom */}
      <View className="absolute bottom-[170px] left-0 right-0">
        {/* Centered Title */}
        <View className="mb-8 items-center">
          <Text
            size="5xl"
            className={`text-center font-roboto font-bold text-[#FA5EFF] ${
              currentPage === 0 ? 'font-lobster-two leading-[72px]' : 'leading-9'
            }`}>
            {currentPage === 0 && 'Rizz'}
            {currentPage === 1 && 'Matches'}
            {currentPage === 2 && 'Premium'}
          </Text>
        </View>

        {/* Description Text */}
        <View className="px-10">
          <Text
            size="lg"
            className="mb-4 text-center font-roboto font-normal leading-5 text-[#323755]">
            {currentPage === 0 &&
              'Users going through a vetting process to ensure you never match with bots.'}
            {currentPage === 1 &&
              'We match you with people that have a large array of similar interests.'}
            {currentPage === 2 && 'Sign up today and try premium for free on 3 days'}
          </Text>
        </View>
      </View>

      {/* Getting Started Button */}
      <View className="absolute bottom-[70px] left-[40px] right-[40px]">
        <TouchableOpacity
          onPress={handleGetStarted}
          className="mx-auto h-14 w-[295px] items-center justify-center rounded-2xl bg-[#FA5EFF]">
          <Text className="text-center font-roboto text-base font-bold leading-6 text-white">
            Getting start
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

function Section1() {
  return (
    <View className="relative w-screen">
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/630f9fab99a7a312cbbaa6b8172ac9becf4499dd?width=1760',
        }}
        className="top-[44px] h-[400px] w-full"
        resizeMode="cover"
      />
    </View>
  );
}

function Section2() {
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useEffect(() => {
    if (ref.current) {
      const interval = setInterval(() => {
        ref.current?.next({ animated: true });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Carousel
      enabled={false}
      snapEnabled={false}
      ref={ref}
      data={matchImages}
      style={{ marginTop: 8, width: width, alignContent: 'center', justifyContent: 'center' }}
      width={width * 0.8}
      height={height * 0.5}
      loop
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      withAnimation={{
        type: 'timing',
        config: {
          duration: 1200,
        },
      }}
      onProgressChange={progress}
      renderItem={({ item }) => (
        <View
          className="flex-1 items-center justify-start"
          style={{
            borderRadius: 10,
          }}>
          <Animated.Image
            source={{ uri: item }}
            className="rounded-2xl"
            style={{
              width: width * 0.7,
              height: height * 0.5,
            }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
}

function Section3() {
  return (
    <View className="relative w-screen">
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ffceb197d576fcb9709758d4455cfe9ea6e10e18?width=836',
        }}
        className="absolute left-[-20px] top-[80px] h-[418px] w-[418px]"
        resizeMode="cover"
      />
    </View>
  );
}
export default OnBoarding;
