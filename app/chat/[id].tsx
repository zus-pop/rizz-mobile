// app/chat/[id].tsx
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Cần cài đặt expo vector icons

// Data mẫu cho tin nhắn
const CHAT_MESSAGES = [
  { id: '1', text: "Hi Jake, how are you? I saw on the app that we've crossed paths several times this week 😉", time: "2:55 PM", sender: "other" },
  { id: '2', text: "Haha truly! Nice to meet you Grace! What about a cup of coffee today evening? ☕", time: "3:02 PM", sender: "me", delivered: true },
  { id: '3', text: "Sure, let's do it! 😉", time: "3:10 PM", sender: "other" },
  { id: '4', text: "Great I will write later the exact time and place. See you soon!", time: "3:12 PM", sender: "me", delivered: true },
];

// Component cho tin nhắn gửi đi
const MyMessage = ({ message }) => (
  <View style={chatStyles.myMessageContainer}>
    <View style={chatStyles.myMessageBubble}>
      <Text style={chatStyles.myMessageText}>{message.text}</Text>
      <View style={chatStyles.myMessageFooter}>
        <Text style={chatStyles.myMessageTime}>{message.time}</Text>
        {message.delivered && <Ionicons name="checkmark-done" size={14} color="#555" style={{ marginLeft: 5 }} />}
      </View>
    </View>
  </View>
);

// Component cho tin nhắn nhận được
const OtherMessage = ({ message }) => (
  <View style={chatStyles.otherMessageContainer}>
    <View style={chatStyles.otherMessageBubble}>
      <Text style={chatStyles.otherMessageText}>{message.text}</Text>
      <Text style={chatStyles.otherMessageTime}>{message.time}</Text>
    </View>
  </View>
);

const ChatDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messageInput, setMessageInput] = useState('');

  // Data người dùng mẫu (thay bằng data thực tế từ id)
  const recipient = {
    name: "Grace",
    status: "Online",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg", // Thay bằng avatar thực
  };

  return (
    <SafeAreaView style={chatStyles.container}>
      <Stack.Screen options={{
        headerShown: false, // Ẩn header mặc định
      }} />

      {/* Custom Header */}
      <View style={chatStyles.header}>
        <TouchableOpacity onPress={() => router.back()} style={chatStyles.headerButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <View style={chatStyles.headerContent}>
          <Image source={{ uri: recipient.avatar }} style={chatStyles.headerAvatar} />
          <View style={chatStyles.headerInfo}>
            <Text style={chatStyles.headerName}>{recipient.name}</Text>
            <View style={chatStyles.headerStatusContainer}>
              <View style={chatStyles.onlineDot} />
              <Text style={chatStyles.headerStatus}>{recipient.status}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={chatStyles.headerButton}>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Điều chỉnh offset nếu cần
      >
        <ScrollView contentContainerStyle={chatStyles.messagesList}>
          {CHAT_MESSAGES.map((msg) =>
            msg.sender === "me" ? (
              <MyMessage key={msg.id} message={msg} />
            ) : (
              <OtherMessage key={msg.id} message={msg} />
            )
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={chatStyles.inputContainer}>
          <TextInput
            style={chatStyles.textInput}
            placeholder="Your message"
            placeholderTextColor="#999"
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <TouchableOpacity style={chatStyles.inputButton}>
            <MaterialCommunityIcons name="timer-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={chatStyles.microphoneButton}>
            <MaterialCommunityIcons name="microphone" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Nền tổng thể
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30, // Bo tròn góc dưới bên trái
    borderBottomRightRadius: 30, // Bo tròn góc dưới bên phải
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FF69B4', // Màu hồng cho border avatar
    marginRight: 10,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  headerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF7F', // Màu xanh lá cây cho trạng thái online
    marginRight: 5,
  },
  headerStatus: {
    fontSize: 14,
    color: '#666',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  // My Message Styles
  myMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  myMessageBubble: {
    backgroundColor: '#FFF2CC', // Màu vàng nhạt cho tin nhắn của tôi
    borderRadius: 16,
    borderBottomRightRadius: 4, // Góc nhỏ ở dưới bên phải
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: '80%',
  },
  myMessageText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  myMessageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  myMessageTime: {
    fontSize: 12,
    color: '#555',
  },
  // Other Message Styles
  otherMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  otherMessageBubble: {
    backgroundColor: '#F5E0F5', // Màu hồng nhạt cho tin nhắn của người khác
    borderRadius: 16,
    borderBottomLeftRadius: 4, // Góc nhỏ ở dưới bên trái
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: '80%',
  },
  otherMessageText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  otherMessageTime: {
    fontSize: 12,
    color: '#555',
    alignSelf: 'flex-start',
  },
  // Input Container Styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  inputButton: {
    padding: 8,
    borderRadius: 20,
    // backgroundColor: '#eee', // Optional background
  },
  microphoneButton: {
    backgroundColor: '#FF69B4', // Màu hồng cho nút micro
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default ChatDetailScreen;