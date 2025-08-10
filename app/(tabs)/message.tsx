import 'react-native-gesture-handler'; 
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'; 
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  MESSAGES_DATA,
  ACTIVITIES_DATA,
  MessageItemProps,
  ActivityItemProps,
} from '../../assets/data/inbox/data';
import Header, { HEADER_MAX_HEIGHT } from '~/components/ui/rizz/header/Header';
const AnimatedLegendList = Animated.createAnimatedComponent(LegendList);

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

const ActivityItem = ({ item }: { item: ActivityItemProps }) => {
  const { t } = useTranslation();
  const displayName = item.id === 'you' ? t('you') : item.name;
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={screenStyles.activityItem}>
        <View style={screenStyles.activityAvatarWrapper}>
          <View style={screenStyles.activityGradientBorder}>
            <Image source={{ uri: item.avatar }} style={screenStyles.activityAvatar} />
          </View>
          <View style={screenStyles.activityOnline} />
        </View>
        <Text style={screenStyles.activityName} numberOfLines={1}>{displayName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MessageItem = ({ item, index }: { item: MessageItemProps; index: number }) => {
  const { t } = useTranslation();
  const messagePreview = item.lastMessageFromYou ? `${t('you')}: ${item.lastMessage}` : item.lastMessage;
  const isTyping = item.status === 'typing';
  const isOnline = (item as any).isOnline || item.status === 'typing';
  
  const animProgress = useSharedValue(0);

  useEffect(() => {
    animProgress.value = withDelay(index * 50, withTiming(1, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animProgress.value,
      transform: [{ translateX: (1 - animProgress.value) * 30 }],
    };
  });

  return (
    <Animated.View style={[screenStyles.messageContainer, animatedStyle]}>
      <TouchableOpacity style={screenStyles.messageRow} activeOpacity={0.7}>
        <View style={screenStyles.messageAvatarContainer}>
          <View style={screenStyles.avatarBorder}>
            <Image source={{ uri: item.avatar }} style={screenStyles.messageAvatar} />
          </View>
          {isOnline && <View style={screenStyles.onlineIndicator} />}
        </View>
        <View style={screenStyles.messageContent}>
          <View style={screenStyles.messageHeader}>
            <Text style={screenStyles.messageSender} numberOfLines={1}>{item.sender}</Text>
          </View>
          <View style={screenStyles.messagePreviewContainer}>
            {isTyping && <View style={screenStyles.typingIndicatorContainer}><View style={screenStyles.typingDot} /><View style={[screenStyles.typingDot, { animationDelay: '0.2s' }]} /><View style={[screenStyles.typingDot, { animationDelay: '0.4s' }]} /></View>}
            <Text numberOfLines={2} style={[screenStyles.messagePreview, isTyping && screenStyles.typingText]}>
              {isTyping ? t('typing') : messagePreview}
            </Text>
          </View>
        </View>
        <View style={screenStyles.messageInfoContainer}>
          <Text style={screenStyles.messageTimestamp}>{formatRelativeTime(item.timestamp)}</Text>
          {item.unreadCount > 0 && (
            <View style={screenStyles.unreadBadge}>
              <Text style={screenStyles.unreadCount}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const MessagesScreen = () => {
  const { t, i18n } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef<React.ElementRef<typeof LegendList>>(null);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const filteredMessages = MESSAGES_DATA.filter(item =>
    item.sender.toLowerCase().includes(searchText.toLowerCase()) ||
    item.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleLanguageToggle = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  const renderListHeader = () => (
    <View style={screenStyles.activitiesSection}>
      <View style={screenStyles.sectionHeader}>
        <Text style={screenStyles.sectionTitle}>{t('recentActivity')}</Text>
        <TouchableOpacity style={screenStyles.seeAllButton}>
          <Text style={screenStyles.seeAllText}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>
      <LegendList
        data={ACTIVITIES_DATA}
        renderItem={({ item }: LegendListRenderItemProps<ActivityItemProps>) => <ActivityItem item={item} />}
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
        scrollY={scrollY} 
        title={t('messagesTitle')}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onFilterPress={() => Alert.alert('Filter Pressed!')}
        onTitlePress={scrollToTop}
        onLanguageToggle={handleLanguageToggle}
      />
      <AnimatedLegendList
        ref={flatListRef}
        data={filteredMessages}
        renderItem={({ item, index }: LegendListRenderItemProps<unknown>) => {
          const messageItem = item as MessageItemProps;
          return <MessageItem item={messageItem} index={index} />;
        }}
        keyExtractor={(item: unknown) => (item as MessageItemProps).id}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={scrollHandler} 
        ItemSeparatorComponent={() => <View style={screenStyles.separator} />}
      />
    </SafeAreaView>
  );
};

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
  messageHeader: { marginBottom: 6 },
  messageSender: { fontSize: 16, fontWeight: '700', color: '#2D2D2D', letterSpacing: -0.2, flex: 1 },
  messageTimestamp: { fontSize: 12, color: '#999999', fontWeight: '500', marginBottom: 8 },
  messagePreviewContainer: { flexDirection: 'row', alignItems: 'center' },
  messagePreview: { fontSize: 14, color: '#666666', lineHeight: 20, letterSpacing: -0.1, flex: 1 },
  typingText: { color: '#FF1493', fontWeight: '600', fontStyle: 'italic' },
  typingIndicatorContainer: { flexDirection: 'row', marginRight: 8 },
  typingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF1493', marginHorizontal: 1 },
  messageInfoContainer: { alignItems: 'flex-end', justifyContent: 'center', marginLeft: 8 },
  unreadBadge: { backgroundColor: '#FF1493', borderRadius: 16, minWidth: 24, height: 24, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, borderWidth: 2, borderColor: '#FFFFFF' },
  unreadCount: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', textAlign: 'center' },
  separator: { height: 8, backgroundColor: 'transparent' },
});

export default MessagesScreen;
