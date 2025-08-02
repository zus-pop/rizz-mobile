import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';

// --- Các hằng số cho Animation ---
export const HEADER_MAX_HEIGHT = 140; 
export const HEADER_MIN_HEIGHT = 90; 
export const ANIMATION_DURATION = 350;

// SỬA ĐỔI: Thêm interface cho props của GlassButton
interface GlassButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

// SỬA ĐỔI: Component GlassButton mới
const GlassButton: React.FC<GlassButtonProps> = ({ onPress, children }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.95],
        }),
      },
      {
        rotateX: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '15deg'],
        }),
      },
    ],
  };

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View style={[styles.glassButtonWrapper, animatedStyle]}>
        <View style={styles.glassButtonBorder}>
          <View style={styles.glassButtonInner}>
            {children}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};


// Props giờ sẽ nhận vào một giá trị Animated mới
interface MessagesHeaderProps {
  animation: Animated.Value; 
  title: string;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onFilterPress: () => void;
  onSearchIconPress: () => void;
}

const Header: React.FC<MessagesHeaderProps> = ({
  animation,
  title,
  searchText,
  onSearchTextChange,
  onFilterPress,
  onSearchIconPress,
}) => {
  const headerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const largeHeaderOpacity = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const smallHeaderOpacity = animation.interpolate({
    inputRange: [0.4, 0.8],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const sidePillsTranslateX = animation.interpolate({
    inputRange: [0.6, 1],
    outputRange: [0, 155], 
    extrapolate: 'clamp',
  });

  const sidePillsOpacity = animation.interpolate({
    inputRange: [0.5, 0.7],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const bridgeScaleX = animation.interpolate({
    inputRange: [0.6, 0.8],
    outputRange: [1, 0], 
    extrapolate: 'clamp',
  });
  
  const smallDropletsOpacity = animation.interpolate({
    inputRange: [0.78, 0.85, 1],
    outputRange: [0, 1, 0], 
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
      {Platform.OS === 'ios' ? (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light" // SỬA: Chuyển sang "light" mode
          blurAmount={10}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.8)' }]} /> // SỬA: Nền sáng cho Android
      )}
      <View style={styles.contentContainer}>
        {/* Header thu nhỏ (hiện ra khi cuộn) */}
        <Animated.View style={[styles.smallHeader, { opacity: smallHeaderOpacity }]}>
          
          <View style={styles.pillWrapper}>
             <Text style={styles.smallHeaderTitle}>{title}</Text>
          </View>

          <Animated.View style={[
            styles.sidePillContainer, 
            { 
              opacity: sidePillsOpacity, 
              transform: [{ translateX: Animated.multiply(sidePillsTranslateX, -1) }] 
            }
          ]}>
             <GlassButton onPress={onSearchIconPress}>
                <Ionicons name="search" size={22} color="#333" />
             </GlassButton>
          </Animated.View>

          <Animated.View style={[
            styles.sidePillContainer, 
            { 
              opacity: sidePillsOpacity, 
              transform: [{ translateX: sidePillsTranslateX }] 
            }
          ]}>
             <GlassButton onPress={onFilterPress}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#333" />
             </GlassButton>
          </Animated.View>
          
          <Animated.View style={[styles.bridge, {right: '50%', marginRight: 60, transform: [{scaleX: bridgeScaleX}]}]} />
          <Animated.View style={[styles.bridge, {left: '50%', marginLeft: 60, transform: [{scaleX: bridgeScaleX}]}]} />
          
          <Animated.View style={[styles.droplet, {right: '50%', marginRight: 40, opacity: smallDropletsOpacity}]} />
          <Animated.View style={[styles.droplet, {left: '50%', marginLeft: 40, opacity: smallDropletsOpacity}]} />

        </Animated.View>

        {/* Header lớn (ẩn đi khi cuộn) */}
        <Animated.View style={[styles.largeHeader, { opacity: largeHeaderOpacity }]}>
          <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>{title}</Text>
              <GlassButton onPress={onFilterPress}>
                 <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
              </GlassButton>
          </View>
          <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="#8E8E93"
                  value={searchText}
                  onChangeText={onSearchTextChange}
                />
              </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 10,
    justifyContent: 'flex-end',
  },
  // --- Small Header Styles ---
  smallHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, 
  },
  sidePillContainer: {
    position: 'absolute',
    zIndex: 10, 
  },
  smallHeaderTitle: {
    fontSize: 17,
    fontWeight: '600',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#000000', // SỬA: Màu chữ tối
  },
  bridge: {
    position: 'absolute',
    height: 30,
    width: 50,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // SỬA: Màu sáng mờ
    borderRadius: 15,
    zIndex: 1, 
  },
  droplet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // SỬA: Màu sáng mờ
    zIndex: 1,
  },
  // --- Large Header Styles ---
  largeHeader: {
    // Không cần thay đổi
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000', // SỬA: Màu chữ tối
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)', // SỬA: Màu nền search bar kiểu iOS Light
    borderRadius: 10,
    height: 36,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#000000', // SỬA: Màu chữ tối
  },
  // SỬA ĐỔI: Styles cho GlassButton (Light Mode)
  glassButtonWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  glassButtonBorder: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(60, 60, 67, 0.2)', // SỬA: Viền xám tối trên nền sáng
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassButtonInner: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // SỬA: Nền trong mờ sáng
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;