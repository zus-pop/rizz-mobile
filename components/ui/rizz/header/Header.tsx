import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated, // 1. Import Animated API
} from 'react-native';

// 2. Định nghĩa các hằng số cho animation
const HEADER_MAX_HEIGHT = 160; // Chiều cao ban đầu của header
const HEADER_MIN_HEIGHT = 60;  // Chiều cao khi cuộn (chiều cao của thanh điều hướng)
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// Props giờ sẽ nhận vào một giá trị Animated
interface MessagesHeaderProps {
  scrollY: Animated.Value;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onFilterPress: () => void;
}

const Header: React.FC<MessagesHeaderProps> = ({
  scrollY,
  searchText,
  onSearchTextChange,
  onFilterPress,
}) => {
  // 3. Dùng interpolate để tính toán các style động dựa trên vị trí cuộn
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // Opacity cho header lớn (sẽ mờ dần khi cuộn)
  const largeHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Opacity cho header nhỏ (sẽ hiện dần ra khi cuộn)
  const smallHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      {/* Header thu nhỏ (hiện ra khi cuộn) */}
      <Animated.View style={[styles.smallHeader, { opacity: smallHeaderOpacity }]}>
        <TouchableOpacity style={styles.smallHeaderButton}>
           <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <Text style={styles.smallHeaderTitle}>Messages</Text>
        <TouchableOpacity style={[styles.smallHeaderButton, styles.filterButtonSmall]} onPress={onFilterPress}>
            <View style={styles.filterIconLine} />
            <View style={styles.filterIconLine} />
        </TouchableOpacity>
      </Animated.View>

      {/* Header lớn (ẩn đi khi cuộn) */}
      <Animated.View style={[styles.largeHeader, { opacity: largeHeaderOpacity }]}>
        <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Messages</Text>
            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
              <View style={styles.filterIconLine} />
              <View style={styles.filterIconLine} />
            </TouchableOpacity>
        </View>
        <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#A0A0A0"
                value={searchText}
                onChangeText={onSearchTextChange}
              />
            </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    zIndex: 1000,
  },
  // --- Small Header Styles ---
  smallHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  smallHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallHeaderButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonSmall: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  // --- Large Header Styles ---
  largeHeader: {
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconLine: {
    width: 18,
    height: 2,
    backgroundColor: '#333',
    marginVertical: 2.5,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default Header;
