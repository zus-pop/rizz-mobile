import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated, // 1. Import Animated
  FlatList,
} from 'react-native';

// --- Import dữ liệu và type ---
import {
  MESSAGES_DATA,
  ACTIVITIES_DATA,
  MessageItemProps,
  ActivityItemProps,
} from '../../assets/data/inbox/data'; // <-- Giữ nguyên đường dẫn của bạn

// --- THAY ĐỔI: Import Header của bạn ---
import Header from '~/components/ui/rizz/header/Header';

// --- Các hằng số cho Animation ---
const HEADER_MAX_HEIGHT = 160; // Giả sử chiều cao header của bạn là 160

// --- Các sub-component cho danh sách ---
const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} sec`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours} hour`;
};

const ActivityItem = ({ item }: { item: ActivityItemProps }) => (
  <TouchableOpacity style={styles.activityItem}>
    <Image source={{ uri: item.avatar }} style={styles.activityAvatar} />
    <Text style={styles.activityName}>{item.name}</Text>
  </TouchableOpacity>
);

const MessageItem = ({ item }: { item: MessageItemProps }) => {
  const messagePreview = item.lastMessageFromYou ? `You: ${item.lastMessage}` : item.lastMessage;
  const isTyping = item.status === 'typing';

  return (
    <TouchableOpacity style={styles.messageRow}>
      <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
      <View style={styles.messageContent}>
        <Text style={styles.messageSender}>{item.sender}</Text>
        <Text
          numberOfLines={1}
          style={[styles.messagePreview, isTyping && styles.typingText]}>
          {messagePreview}
        </Text>
      </View>
      <View style={styles.messageInfo}>
        <Text style={styles.messageTimestamp}>
          {formatRelativeTime(item.timestamp)}
        </Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- Component chính ---
const MessagesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredMessages = MESSAGES_DATA.filter(
    item =>
      item.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lastMessage.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderListContent = () => (
      <>
        <View style={styles.activitiesSection}>
            <Text style={styles.sectionTitle}>Activities</Text>
            <FlatList
                data={ACTIVITIES_DATA}
                renderItem={({ item }) => <ActivityItem item={item} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
            />
        </View>
        <Text style={[styles.sectionTitle, styles.messagesTitle]}>Messages</Text>
      </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* THAY ĐỔI: Sử dụng Header của bạn và truyền vào scrollY */}
      {/* Lưu ý: Component Header của bạn cần được thiết kế để nhận prop scrollY và xử lý animation */}
      <Header
        scrollY={scrollY} 
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onFilterPress={() => alert('Filter button pressed!')}
      />
      <Animated.FlatList
        data={filteredMessages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListContent}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Các style cho header đã được xóa vì component Header đã được tách ra
  // --- List Content Styles ---
  activitiesSection: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  messagesTitle: {
      marginTop: 10,
      marginBottom: 10,
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
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
