import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  Platform,
} from 'react-native';

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
  <TouchableOpacity style={screenStyles.activityItem}>
    <Image source={{ uri: item.avatar }} style={screenStyles.activityAvatar} />
    <Text style={screenStyles.activityName}>{item.name}</Text>
  </TouchableOpacity>
);

const MessageItem = ({ item }: { item: MessageItemProps }) => {
  const messagePreview = item.lastMessageFromYou ? `You: ${item.lastMessage}` : item.lastMessage;
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
  const flatListRef = useRef<FlatList<any>>(null);

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
          <FlatList
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
      <Animated.FlatList
        ref={flatListRef}
        data={filteredMessages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader}
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

// --- StyleSheet cho màn hình ---
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