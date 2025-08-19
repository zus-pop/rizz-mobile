import { router } from 'expo-router';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, TouchableOpacity, View, Text as RNText, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, interpolate, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// --- PLACEHOLDER CHO COMPONENT TEXT TÙY CHỈNH ---
const Text = (props: any) => <RNText {...props} />;

// --- DỮ LIỆU CHO CÁC SLIDE ---
const data = [
  { id: 'section-1', component: <Section1 /> },
  { id: 'section-2', component: <Section2 /> },
  { id: 'section-3', component: <Section3 /> },
];

const matchImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop',
];

// --- COMPONENT CHÍNH CHO MÀN HÌNH ONBOARDING ---
const OnBoarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  
  // Dùng Animated thay vì Reanimated cho performance tốt hơn trên máy ảo
  const backButtonAnim = useRef(new Animated.Value(0)).current;
  const mainButtonAnim = useRef(new Animated.Value(0)).current;

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
    // Animation mượt mà hơn với Animated API
    const showBackButton = currentPage > 0;
    
    // Animation cho nút back với elastic effect
    Animated.parallel([
      Animated.spring(backButtonAnim, {
        toValue: showBackButton ? 1 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
        delay: showBackButton ? 100 : 0, // Delay khi hiện
      }),
      Animated.spring(mainButtonAnim, {
        toValue: showBackButton ? 1 : 0,
        useNativeDriver: true,
        tension: 80,
        friction: 7,
        delay: showBackButton ? 50 : 0, // Delay khác nhau để tạo hiệu ứng sóng
      })
    ]).start();
  }, [currentPage]);

  // Transform styles cho nút back
  const backButtonTransform = backButtonAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [120, 60, 0], // Tách từ từ
  });

  const backButtonScale = backButtonAnim.interpolate({
    inputRange: [0, 0.4, 0.8, 1],
    outputRange: [0, 1.3, 0.9, 1], // Hiệu ứng giọt nước
  });

  const backButtonRotate = backButtonAnim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ['0deg', '-8deg', '4deg', '0deg'], // Rung nhẹ
  });

  // Transform styles cho nút chính
  const mainButtonTransform = mainButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], // Giảm translateX để không bị đẩy quá xa
  });

  // Không dùng squeeze effect nữa để tránh conflict
  const mainButtonScale = 1;

  // Scale để thu nhỏ nút chính khi nút back xuất hiện  
  const mainButtonWidthScale = mainButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7], // Thu nhỏ xuống 70% thay vì 65%
  });

  return (
    <LinearGradient
      colors={['#FEC5D7', 'rgba(255, 229, 0, 0.55)']}
      locations={[0.4, 1]}
      style={styles.flex1}>
      <Carousel
        ref={ref}
        loop={false}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height * 0.65}
        autoPlay={false}
        data={data}
        onProgressChange={progress}
        onSnapToItem={(index) => setCurrentPage(index)}
        renderItem={({ item }) => item.component}
      />

      <View style={styles.bottomContainer}>
        <Text style={[styles.title, currentPage === 0 && styles.titleRizz]}>
          {currentPage === 0 && 'Rizz'}
          {currentPage === 1 && 'Matches'}
          {currentPage === 2 && 'Premium'}
        </Text>

        <Text style={styles.description}>
          {currentPage === 0 && 'Users going through a vetting process to ensure you never match with bots.'}
          {currentPage === 1 && 'We match you with people that have a large array of similar interests.'}
          {currentPage === 2 && 'Sign up today and try premium for free on 3 days'}
        </Text>

        <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.paginationContainer}
        />

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
                      <RNText style={styles.buttonText}>
                        {currentPage === data.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
                      </RNText>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

// --- CÁC SECTION RIÊNG BIỆT VỚI HIỆU ỨNG ĐỘNG ---
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

function Section2() {
  const ref = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;

  const Sprocket = () => <View style={styles.sprocket} />;

  return (
    <View style={styles.sectionContainer}>
        <View style={styles.filmStripContainer}>
            <View style={styles.sprocketRow}>
                {[...Array(10)].map((_, i) => <Sprocket key={`top-${i}`} />)}
            </View>
            <Carousel
                loop
                ref={ref}
                width={width * 0.75}
                height={width * 0.9}
                autoPlay={true}
                autoPlayInterval={2500}
                data={matchImages}
                scrollAnimationDuration={1200}
                renderItem={({ item }) => (
                    <View style={styles.filmFrame}>
                        <Image
                            source={{ uri: item }}
                            style={styles.matchImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />
            <View style={styles.sprocketRow}>
                {[...Array(10)].map((_, i) => <Sprocket key={`bottom-${i}`} />)}
            </View>
        </View>
    </View>
  );
}

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

// --- STYLES ---
const styles = StyleSheet.create({
    flex1: { flex: 1 },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height * 0.45,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 50, // Thêm padding bottom để nút không sát đáy
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#323755',
        textAlign: 'center',
    },
    titleRizz: {
        fontFamily: 'LobsterTwo',
        fontSize: 64,
        color: '#FA5EFF',
    },
    description: {
        fontSize: 16,
        color: '#323755',
        textAlign: 'center',
        marginTop: 16,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
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
        bottom: 0,
        left: 40,
        right: 40,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Thay đổi từ center thành space-between
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
        justifyContent: 'center', // Thay đổi từ flex-end thành center
        flexDirection: 'row',
    },
    buttonWrapper: {
        height: 56,
        width: '100%', // Fixed width, sẽ dùng scaleX để thu nhỏ
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
        marginLeft: 0, // Đảm bảo không có margin
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
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
    filmStripContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 10,
        borderRadius: 5,
    },
    sprocketRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    sprocket: {
        width: 10,
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 2,
    },
    filmFrame: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    matchImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    section3Image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    }
});

export default OnBoarding;