import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LegendList } from '@legendapp/list';

// --- Import data and types (Đảm bảo đường dẫn chính xác) ---
import {
  MESSAGES_DATA,
  ACTIVITIES_DATA,
  MessageItemProps,
  ActivityItemProps,
} from '../../assets/data/inbox/data'; // <-- SỬA ĐƯỜNG DẪN NẾU CẦN

// --- Import Header and constants (Đảm bảo đường dẫn chính xác) ---
import Header, { HEADER_MAX_HEIGHT, ANIMATION_DURATION } from '~/components/ui/rizz/header/Header'; // <-- SỬA ĐƯỜNG DẪN NẾU CẦN

const TRIGGER_THRESHOLD = HEADER_MAX_HEIGHT / 2;

// --- Sub-components ---
const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours}h`;
};

// SỬA ĐỔI: ActivityItem giờ sẽ sử dụng useTranslation
const ActivityItem = ({ item }: { item: ActivityItemProps }) => {
  const { t } = useTranslation();
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.92, duration: 150, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };
  
  // Dịch tên nếu id là 'you', ngược lại giữ nguyên tên
  const displayName = item.id === 'you' ? t('you') : item.name;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View style={[screenStyles.activityItem, { transform: [{ scale: animatedScale }] }]}>
        <View style={screenStyles.activityAvatarWrapper}>
            <View style={screenStyles.activityGradientBorder}>
                <Image source={{ uri: item.avatar }} style={screenStyles.activityAvatar} />
            </View>
            <View style={screenStyles.activityOnline} />
        </View>
        <Text style={screenStyles.activityName} numberOfLines={1}>{displayName}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const MessageItem = ({ item, index }: { item: MessageItemProps; index: number }) => {
  const { t } = useTranslation();
  const messagePreview = item.lastMessageFromYou ? `${t('you')}: ${item.lastMessage}` : item.lastMessage;
  const isTyping = item.status === 'typing';
  const isOnline = (item as any).isOnline || item.status === 'typing';
  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 50, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, delay: index * 50, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[screenStyles.messageContainer, { transform: [{ translateX: slideAnim }], opacity: opacityAnim }]}>
      <TouchableOpacity style={screenStyles.messageRow} activeOpacity={0.7}>
        <View style={screenStyles.messageAvatarContainer}><View style={screenStyles.avatarBorder}><Image source={{ uri: item.avatar }} style={screenStyles.messageAvatar} /></View>{isOnline && <View style={screenStyles.onlineIndicator} />}</View>
        <View style={screenStyles.messageContent}>
          <View style={screenStyles.messageHeader}><Text style={screenStyles.messageSender} numberOfLines={1}>{item.sender}</Text><Text style={screenStyles.messageTimestamp}>{formatRelativeTime(item.timestamp)}</Text></View>
          <View style={screenStyles.messagePreviewContainer}>{isTyping && <View style={screenStyles.typingIndicatorContainer}><View style={screenStyles.typingDot} /><View style={[screenStyles.typingDot, { animationDelay: '0.2s' }]} /><View style={[screenStyles.typingDot, { animationDelay: '0.4s' }]} /></View>}<Text numberOfLines={2} style={[screenStyles.messagePreview, isTyping && screenStyles.typingText]}>{isTyping ? t('typing') : messagePreview}</Text></View>
        </View>
        <View style={screenStyles.messageRight}>{item.unreadCount > 0 && <View style={screenStyles.unreadBadge}><Text style={screenStyles.unreadCount}>{item.unreadCount > 99 ? '99+' : item.unreadCount}</Text></View>}</View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Main Component ---
const MessagesScreen = () => {
  const { t, i18n } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const animation = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const isHeaderCollapsed = useRef(false);
  const flatListRef = useRef<React.ElementRef<typeof LegendList>>(null);

  const filteredMessages = MESSAGES_DATA.filter(item =>
    item.sender.toLowerCase().includes(searchText.toLowerCase()) ||
    item.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleHeader = (collapse: boolean) => {
    if (isHeaderCollapsed.current === collapse) return;
    isHeaderCollapsed.current = collapse;
    Animated.timing(animation, {
      toValue: collapse ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleLanguageToggle = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      toggleHeader(value > TRIGGER_THRESHOLD);
    });
    return () => scrollY.removeListener(listenerId);
  }, []);

  const renderListHeader = () => (
    <View style={screenStyles.activitiesSection}>
      <View style={screenStyles.sectionHeader}>
        <Text style={screenStyles.sectionTitle}>{t('recentActivity')}</Text>
        <TouchableOpacity style={screenStyles.seeAllButton}>
          <Text style={screenStyles.seeAllText}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
      <LegendList<ActivityItemProps>
        data={ACTIVITIES_DATA}
        renderItem={({ item }) => <ActivityItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={screenStyles.activitiesContainer}
      />
    </View>
  );

  return (
    <SafeAreaView style={screenStyles.container}>
      <Header
        animation={animation} 
        title={t('messagesTitle')}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onFilterPress={() => Alert.alert('Filter Pressed!')}
        onTitlePress={scrollToTop}
        onLanguageToggle={handleLanguageToggle}
      />
      <LegendList<MessageItemProps>
        ref={flatListRef}
        data={filteredMessages}
        renderItem={({ item, index }) => <MessageItem item={item} index={index} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ItemSeparatorComponent={() => <View style={screenStyles.separator} />}
      />
    </SafeAreaView>
  );
};

// --- Styles ---
const screenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF5' },
  activitiesSection: { paddingVertical: 24, backgroundColor: '#FFFFFF', marginBottom: 12, borderRadius: 24, marginHorizontal: 16, marginTop: 16, ...Platform.select({ ios: { shadowColor: '#FF1493', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16 }, android: { elevation: 8 } }) },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#FF1493', letterSpacing: -0.5 },
  seeAllButton: { backgroundColor: '#FFE4E1', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 2, borderColor: '#FF69B4' },
  seeAllText: { fontSize: 14, color: '#FF1493', fontWeight: '700' },
  activitiesContainer: { paddingHorizontal: 16 },
  activityItem: { alignItems: 'center', marginHorizontal: 8, width: 80, paddingVertical: 8 },
  activityAvatarWrapper: { position: 'relative', marginBottom: 12 },
  activityGradientBorder: { width: 68, height: 68, borderRadius: 34, padding: 3, backgroundColor: '#FF1493' },
  activityAvatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#FFF' },
  activityOnline: { position: 'absolute', bottom: 4, right: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#00FF7F', borderWidth: 3, borderColor: '#FFFFFF' },
  activityName: { fontSize: 12, fontWeight: '600', color: '#333333', textAlign: 'center' },
  messageContainer: { paddingHorizontal: 16, paddingVertical: 4 },
  messageRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 16, minHeight: 80, ...Platform.select({ ios: { shadowColor: '#FF1493', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 }, android: { elevation: 4 } }) },
  messageAvatarContainer: { position: 'relative', marginRight: 16 },
  avatarBorder: { width: 56, height: 56, borderRadius: 28, padding: 2, backgroundColor: '#FF69B4' },
  messageAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#FFF' },
  onlineIndicator: { position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#00FF7F', borderWidth: 2, borderColor: '#FFFFFF' },
  messageContent: { flex: 1, justifyContent: 'center' },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  messageSender: { fontSize: 16, fontWeight: '700', color: '#2D2D2D', letterSpacing: -0.2, flex: 1 },
  messageTimestamp: { fontSize: 12, color: '#999999', fontWeight: '500' },
  messagePreviewContainer: { flexDirection: 'row', alignItems: 'center' },
  messagePreview: { fontSize: 14, color: '#666666', lineHeight: 20, letterSpacing: -0.1, flex: 1 },
  typingText: { color: '#FF1493', fontWeight: '600', fontStyle: 'italic' },
  typingIndicatorContainer: { flexDirection: 'row', marginRight: 8 },
  typingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF1493', marginHorizontal: 1 },
  messageRight: { alignItems: 'center', justifyContent: 'center' },
  unreadBadge: { backgroundColor: '#FF1493', borderRadius: 16, minWidth: 24, height: 24, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, marginBottom: 8, borderWidth: 2, borderColor: '#FFFFFF', ...Platform.select({ ios: { shadowColor: '#FF1493', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }, android: { elevation: 6 } }) },
  unreadCount: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', textAlign: 'center' },
  separator: { height: 8, backgroundColor: 'transparent' },
});

export default MessagesScreen;
