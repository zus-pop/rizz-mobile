import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';


export const HEADER_MAX_HEIGHT = 110;
export const HEADER_MIN_HEIGHT = 50; 
export const ANIMATION_DURATION = 350;

const COLORS = {
  hotPink: '#FF1493',
  lightPink: '#FF69B4',
  softPink: '#FFB6C1',
  pinkBlush: '#FFE4E1',
  warmWhite: '#FFFBF5',
  darkText: '#333333',
};

const windowWidth = Dimensions.get('window').width;

interface GlassButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
}

const GlassButton: React.FC<GlassButtonProps> = ({ onPress, children, style }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 300 });
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.glassButtonWrapper, style, animatedStyle]}>
        <View style={styles.glassButtonBorder}>
          <View style={styles.glassButtonInner}>{children}</View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

interface MessagesHeaderProps {
  scrollY: Animated.SharedValue<number>; 
  title: string;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onFilterPress: () => void;
  onTitlePress: () => void;
  onLanguageToggle: () => void;
}

const Header: React.FC<MessagesHeaderProps> = ({
  scrollY,
  title,
  searchText,
  onSearchTextChange,
  onFilterPress,
  onTitlePress,
  onLanguageToggle,
}) => {
  const { t, i18n } = useTranslation();
  const searchInputRef = useRef<TextInput>(null);
  const searchActive = useSharedValue(0); 

  const toggleSearch = (active: boolean) => {
    searchActive.value = withTiming(active ? 1 : 0, { duration: 300 });
    if (active) {
      searchInputRef.current?.focus();
    } else {
      searchInputRef.current?.blur();
    }
  };

  const animatedHeaderHeight = useAnimatedStyle(() => {
    if (!scrollY) {
      return { height: HEADER_MAX_HEIGHT };
    }
    const height = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );
    return { height };
  });

  const animatedLargeHeaderOpacity = useAnimatedStyle(() => {
    if (!scrollY) {
      return { opacity: 1 };
    }
    const opacity = interpolate(
      scrollY.value,
      [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const animatedSmallHeaderOpacity = useAnimatedStyle(() => {
    if (!scrollY) {
      return { opacity: 0 };
    }
    const opacity = interpolate(
      scrollY.value,
      [(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });
  
  const animatedPillsContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(searchActive.value, [0, 0.5], [1, 0]),
    transform: [{
      translateX: withTiming(searchActive.value === 1 ? -50 : 0)
    }]
  }));
  
  const animatedSmallSearchStyle = useAnimatedStyle(() => ({
    opacity: searchActive.value,
    width: interpolate(
      searchActive.value,
      [0, 1],
      [44, windowWidth - 32 - 80] 
    ),
  }));

  const animatedCancelButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(searchActive.value, [0.5, 1], [0, 1]),
  }));

  const LanguageButton = () => (
    <GlassButton onPress={onLanguageToggle} style={{ width: 50, marginLeft: 8 }}>
      <Text style={styles.langButtonText}>{i18n.language.toUpperCase()}</Text>
    </GlassButton>
  );

  return (
    <Animated.View style={[styles.headerContainer, animatedHeaderHeight]}>
      {Platform.OS === 'ios' ? <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={15} /> : <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 251, 245, 0.85)' }]} />}
      
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.smallHeader, animatedSmallHeaderOpacity]}>
          <Animated.View style={[styles.pillsContainer, animatedPillsContainerStyle]}>
            <View style={styles.smallHeaderLeft}>
              <GlassButton onPress={() => toggleSearch(true)}>
                <Ionicons name="search" size={22} color={COLORS.lightPink} />
              </GlassButton>
            </View>
            <TouchableOpacity onPress={onTitlePress}>
              <Text style={styles.smallHeaderTitle}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.smallHeaderRight}>
              <GlassButton onPress={onFilterPress}>
                <Ionicons name="ellipsis-horizontal" size={22} color={COLORS.lightPink} />
              </GlassButton>
              <LanguageButton />
            </View>
          </Animated.View>

          <View style={styles.smallSearchWrapper}>
            <Animated.View style={[styles.searchContainer, animatedSmallSearchStyle]}>
              <Ionicons name="search" size={18} color={COLORS.lightPink} style={styles.searchIcon} />
              <TextInput ref={searchInputRef} style={styles.searchInput} placeholder={t('search')} placeholderTextColor={COLORS.softPink} />
            </Animated.View>
            <Animated.View style={animatedCancelButtonStyle}>
              <TouchableOpacity onPress={() => toggleSearch(false)}>
                <Text style={styles.cancelButton}>{t('cancel')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.largeHeader, animatedLargeHeaderOpacity]}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.largeHeaderRight}>
              <GlassButton onPress={onFilterPress}>
                <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.lightPink} />
              </GlassButton>
              <LanguageButton />
            </View>
          </View>
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color={COLORS.lightPink} style={styles.searchIcon} />
              <TextInput style={styles.searchInput} placeholder={t('search')} placeholderTextColor={COLORS.softPink} value={searchText} onChangeText={onSearchTextChange} />
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, overflow: 'hidden' },
  contentContainer: { flex: 1, paddingTop: Platform.OS === 'ios' ? 44 : 10, justifyContent: 'flex-end' },
  smallHeader: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
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
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 228, 225, 0.6)', borderRadius: 10, height: 36, paddingHorizontal: 8, flex: 1 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 17, color: COLORS.darkText },
  glassButtonWrapper: { width: 44, height: 44, borderRadius: 22, shadowColor: COLORS.softPink, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4 },
  glassButtonBorder: { flex: 1, borderRadius: 22, borderWidth: 1.5, borderColor: 'rgba(255, 20, 147, 0.3)', justifyContent: 'center', alignItems: 'center' },
  glassButtonInner: { flex: 1, width: '100%', backgroundColor: 'rgba(255, 228, 225, 0.7)', borderRadius: 21, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  langButtonText: { color: COLORS.hotPink, fontWeight: '700', fontSize: 14 },
});

export default Header;
