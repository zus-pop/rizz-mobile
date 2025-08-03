import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Platform,
  Pressable,
  TouchableOpacity,
  Dimensions,
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
  onTitlePress: () => void; 
}

const Header: React.FC<MessagesHeaderProps> = ({
  animation,
  title,
  searchText,
  onSearchTextChange,
  onFilterPress,
  onTitlePress,
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSearch = (active: boolean) => {
    setIsSearchActive(active);
    Animated.timing(searchAnimation, {
      toValue: active ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
        if (active) {
            searchInputRef.current?.focus();
        }
    });
  };

  useEffect(() => {
    const listenerId = animation.addListener(({ value }) => {
      setIsCollapsed(value > 0.5);
      if (value < 0.1 && isSearchActive) {
        toggleSearch(false);
      }
    });

    return () => {
      animation.removeListener(listenerId);
    };
  }, [animation, isSearchActive]);


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

  const pillsOpacity = searchAnimation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  
  const smallSearchWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [44, Dimensions.get('window').width - 32 - 80],
    extrapolate: 'clamp',
  });
  
  const smallSearchOpacity = searchAnimation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const cancelOpacity = searchAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
      {Platform.OS === 'ios' ? (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.8)' }]} />
      )}
      <View style={styles.contentContainer}>
        {/* Header thu nhỏ (hiện ra khi cuộn) */}
        <Animated.View 
            style={[styles.smallHeader, { opacity: smallHeaderOpacity }]}
            pointerEvents={isCollapsed ? 'auto' : 'none'}
        >
          
          <Animated.View style={[styles.pillsContainer, { opacity: pillsOpacity, pointerEvents: isSearchActive ? 'none' : 'auto' }]}>
            <GlassButton onPress={() => toggleSearch(true)}>
                <Ionicons name="search" size={22} color="#333" />
            </GlassButton>
            <TouchableOpacity onPress={onTitlePress}>
                <Text style={styles.smallHeaderTitle}>{title}</Text>
            </TouchableOpacity>
            <GlassButton onPress={onFilterPress}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#333" />
            </GlassButton>
          </Animated.View>

          <Animated.View style={[styles.smallSearchWrapper, { opacity: smallSearchOpacity, pointerEvents: isSearchActive ? 'auto' : 'none' }]}>
            <Animated.View style={[styles.searchContainer, { width: smallSearchWidth }]}>
                <Ionicons name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="#8E8E93"
                />
            </Animated.View>
            <Animated.View style={{ opacity: cancelOpacity }}>
              <TouchableOpacity onPress={() => toggleSearch(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

        </Animated.View>

        {/* Header lớn (ẩn đi khi cuộn) */}
        <Animated.View 
            style={[styles.largeHeader, { opacity: largeHeaderOpacity }]}
            pointerEvents={isCollapsed ? 'none' : 'auto'}
        >
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillsContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallHeaderTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  smallSearchWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 17,
    marginLeft: 10,
  },
  // --- Large Header Styles ---
  largeHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
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
    color: '#000000',
  },
  searchSection: {
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 10,
    height: 36,
    paddingHorizontal: 8,
    flex: 1,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
  },
  // Styles cho GlassButton
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
    borderColor: 'rgba(60, 60, 67, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassButtonInner: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;