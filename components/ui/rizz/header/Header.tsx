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
import { useTranslation } from 'react-i18next';

// --- Animation Constants ---
export const HEADER_MAX_HEIGHT = 140; 
export const HEADER_MIN_HEIGHT = 90; 
export const ANIMATION_DURATION = 350;

// --- Color Palette ---
const COLORS = {
  hotPink: '#FF1493',
  lightPink: '#FF69B4',
  softPink: '#FFB6C1',
  pinkBlush: '#FFE4E1',
  warmWhite: '#FFFBF5',
  darkText: '#333333',
};

interface GlassButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: object; // Allow custom styles
}

const GlassButton: React.FC<GlassButtonProps> = ({ onPress, children, style }) => {
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
      <Animated.View style={[styles.glassButtonWrapper, animatedStyle, style]}>
        <View style={styles.glassButtonBorder}>
          <View style={styles.glassButtonInner}>
            {children}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

interface MessagesHeaderProps {
  animation: Animated.Value; 
  title: string;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onFilterPress: () => void;
  onTitlePress: () => void; 
  onLanguageToggle: () => void; // SỬA ĐỔI: Thêm prop mới
}

const Header: React.FC<MessagesHeaderProps> = ({
  animation,
  title,
  searchText,
  onSearchTextChange,
  onFilterPress,
  onTitlePress,
  onLanguageToggle, // SỬA ĐỔI: Nhận prop mới
}) => {
  const { t, i18n } = useTranslation();
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
    return () => animation.removeListener(listenerId);
  }, [animation, isSearchActive]);

  const headerHeight = animation.interpolate({ inputRange: [0, 1], outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], extrapolate: 'clamp' });
  const largeHeaderOpacity = animation.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: 'clamp' });
  const smallHeaderOpacity = animation.interpolate({ inputRange: [0.4, 0.8], outputRange: [0, 1], extrapolate: 'clamp' });
  const pillsOpacity = searchAnimation.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: 'clamp' });
  const smallSearchWidth = searchAnimation.interpolate({ inputRange: [0, 1], outputRange: [44, Dimensions.get('window').width - 32 - 130], extrapolate: 'clamp' });
  const smallSearchOpacity = searchAnimation.interpolate({ inputRange: [0, 0.5], outputRange: [0, 1], extrapolate: 'clamp' });
  const cancelOpacity = searchAnimation.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1], extrapolate: 'clamp' });

  const LanguageButton = () => (
    <GlassButton onPress={onLanguageToggle} style={{ width: 50, marginLeft: 8 }}>
      <Text style={styles.langButtonText}>{i18n.language.toUpperCase()}</Text>
    </GlassButton>
  );

  return (
    <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
      {Platform.OS === 'ios' ? <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={15} /> : <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 251, 245, 0.85)' }]} />}
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.smallHeader, { opacity: smallHeaderOpacity }]} pointerEvents={isCollapsed ? 'auto' : 'none'}>
          <Animated.View style={[styles.pillsContainer, { opacity: pillsOpacity, pointerEvents: isSearchActive ? 'none' : 'auto' }]}>
            <View style={styles.smallHeaderLeft}>
              <GlassButton onPress={() => toggleSearch(true)}>
                <Ionicons name="search" size={22} color={COLORS.lightPink} />
              </GlassButton>
            </View>
            <TouchableOpacity onPress={onTitlePress}><Text style={styles.smallHeaderTitle}>{title}</Text></TouchableOpacity>
            <View style={styles.smallHeaderRight}>
              <GlassButton onPress={onFilterPress}><Ionicons name="ellipsis-horizontal" size={22} color={COLORS.lightPink} /></GlassButton>
              <LanguageButton />
            </View>
          </Animated.View>
          <Animated.View style={[styles.smallSearchWrapper, { opacity: smallSearchOpacity, pointerEvents: isSearchActive ? 'auto' : 'none' }]}>
            <Animated.View style={[styles.searchContainer, { width: smallSearchWidth }]}><Ionicons name="search" size={18} color={COLORS.lightPink} style={styles.searchIcon} /><TextInput ref={searchInputRef} style={styles.searchInput} placeholder={t('search')} placeholderTextColor={COLORS.softPink} /></Animated.View>
            <Animated.View style={{ opacity: cancelOpacity }}><TouchableOpacity onPress={() => toggleSearch(false)}><Text style={styles.cancelButton}>{t('cancel')}</Text></TouchableOpacity></Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.largeHeader, { opacity: largeHeaderOpacity }]} pointerEvents={isCollapsed ? 'none' : 'auto'}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.largeHeaderRight}>
              <GlassButton onPress={onFilterPress}><Ionicons name="ellipsis-horizontal" size={24} color={COLORS.lightPink} /></GlassButton>
              <LanguageButton />
            </View>
          </View>
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}><Ionicons name="search" size={18} color={COLORS.lightPink} style={styles.searchIcon} /><TextInput style={styles.searchInput} placeholder={t('search')} placeholderTextColor={COLORS.softPink} value={searchText} onChangeText={onSearchTextChange} /></View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 },
  contentContainer: { flex: 1, paddingTop: Platform.OS === 'ios' ? 44 : 10, justifyContent: 'flex-end' },
  smallHeader: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pillsContainer: { position: 'absolute', left: 16, right: 16, top: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  smallHeaderRight: { flexDirection: 'row', alignItems: 'center' },
  largeHeaderRight: { flexDirection: 'row', alignItems: 'center' },
  smallHeaderTitle: { fontSize: 17, fontWeight: '600', color: COLORS.hotPink },
  smallSearchWrapper: { position: 'absolute', left: 16, right: 16, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cancelButton: { color: COLORS.lightPink, fontSize: 17, marginLeft: 10, fontWeight: '500' },
  largeHeader: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  headerTitle: { fontSize: 34, fontWeight: 'bold', color: COLORS.hotPink, flex: 1 },
  searchSection: { paddingHorizontal: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 228, 225, 0.6)', borderRadius: 10, height: 36, paddingHorizontal: 8 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 17, color: COLORS.darkText },
  glassButtonWrapper: { width: 44, height: 44, borderRadius: 22, shadowColor: COLORS.softPink, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4 },
  glassButtonBorder: { flex: 1, borderRadius: 22, borderWidth: 1.5, borderColor: 'rgba(255, 20, 147, 0.3)', justifyContent: 'center', alignItems: 'center' },
  glassButtonInner: { flex: 1, width: '100%', backgroundColor: 'rgba(255, 228, 225, 0.7)', borderRadius: 21, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  langButtonText: { color: COLORS.hotPink, fontWeight: '700', fontSize: 14 },
});

export default Header;
