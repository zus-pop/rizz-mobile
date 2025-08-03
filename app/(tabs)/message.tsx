import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  // FlatList không còn cần thiết
  Platform,
  NativeScrollEvent, // Import NativeScrollEvent để dùng cho onScroll
} from 'react-native';

// --- THAY ĐỔI 1: Import LegendList ---
import { LegendList } from '@legendapp/list';

// --- Import dữ liệu và type (GIỮ NGUYÊN) ---
import {
  MESSAGES_DATA,
  ACTIVITIES_DATA,
  MessageItemProps,
  ActivityItemProps,
} from '../../assets/data/inbox/data';

// --- Import Header và hằng số (GIỮ NGUYÊN ĐƯỜNG DẪN) ---
import Header, { HEADER_MAX_HEIGHT, ANIMATION_DURATION } from '~/components/ui/rizz/header/Header';

const TRIGGER_THRESHOLD = HEADER_MAX_HEIGHT / 2;

// --- Các sub-component cho danh sách (Không thay đổi) ---
const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} giây`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours} giờ`;
};

const ActivityItem = ({ item }: { item: ActivityItemProps }) => (
  <TouchableOpacity style={screenStyles.activityItem}>
    <Image source={{ uri: item.avatar }} style={screenStyles.activityAvatar} />
    <Text style={screenStyles.activityName}>{item.name}</Text>
  </TouchableOpacity>
);

const MessageItem = ({ item }: { item: MessageItemProps }) => {
  const messagePreview = item.lastMessageFromYou ? `Bạn: ${item.lastMessage}` : item.lastMessage;
  const isTyping = item.status === 'typing';

  return (
    <TouchableOpacity style={screenStyles.messageRow}>
      <Image source={{ uri: item.avatar }} style={screenStyles.messageAvatar} />
      <View style={screenStyles.messageContent}>
        <Text style={screenStyles.messageSender}>{item.sender}</Text>
        <Text
          numberOfLines={1}
          style={[screenStyles.messagePreview, isTyping && screenStyles.typingText]}>
          {messagePreview}
        </Text>
      </View>
      <View style={screenStyles.messageInfo}>
        <Text style={screenStyles.messageTimestamp}>
          {formatRelativeTime(item.timestamp)}
        </Text>
        {item.unreadCount > 0 && (
          <View style={screenStyles.unreadBadge}>
            <Text style={screenStyles.unreadCount}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- Component chính ---
const MessagesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const animation = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const isHeaderCollapsed = useRef(false);

  // --- THAY ĐỔI 2: Cập nhật kiểu cho ref ---
  const flatListRef = useRef<React.ElementRef<typeof LegendList>>(null);

  const filteredMessages = MESSAGES_DATA.filter(
    item =>
      item.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lastMessage.toLowerCase().includes(searchText.toLowerCase()),
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
  
  // Hàm scrollToTop vẫn hoạt động bình thường
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > TRIGGER_THRESHOLD) {
        toggleHeader(true); 
      } else {
        toggleHeader(false); 
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, []);


  const renderListHeader = () => (
      <View style={screenStyles.activitiesSection}>
          <Text style={screenStyles.sectionTitle}>Activities</Text>
          {/* --- THAY ĐỔI 3: Dùng LegendList cho danh sách ngang --- */}
          <LegendList<ActivityItemProps>
              data={ACTIVITIES_DATA}
              renderItem={({ item }) => <ActivityItem item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
          />
      </View>
  );

  return (
    <SafeAreaView style={screenStyles.container}>
      <Header
        animation={animation} 
        title="Messages"
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onFilterPress={() => alert('Filter button pressed!')}
        onTitlePress={scrollToTop}
      />
      {/* --- THAY ĐỔI 4: Dùng LegendList cho danh sách chính và cập nhật props --- */}
      <LegendList<MessageItemProps>
        ref={flatListRef}
        data={filteredMessages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
            scrollY.setValue(nativeEvent.contentOffset.y);
        }}
        // scrollEventThrottle đã được xóa
      />
    </SafeAreaView>
  );
};

// --- StyleSheet cho màn hình (Không thay đổi) ---
const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  activitiesSection: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 15,
    color: '#000000',
  },
  activityItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  activityAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#DDA0DD',
  },
  activityName: {
    marginTop: 8,
    fontSize: 14,
    color: '#000000',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  messagePreview: {
    fontSize: 14,
    color: '#666666',
  },
  typingText: {
    color: '#DDA0DD',
    fontWeight: 'bold',
  },
  messageInfo: {
    alignItems: 'flex-end',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;