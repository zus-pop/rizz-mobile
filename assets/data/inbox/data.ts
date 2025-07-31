// data/mockData.ts

// --- Định nghĩa Type ---
// Di chuyển type definitions lên trước để dễ quản lý
export type ActivityItemProps = {
    id: string;
    name: string;
    avatar: string;
  };
  
  export type MessageItemProps = {
    id: string;
    sender: string;
    avatar: string;
    lastMessage: string;
    lastMessageFromYou: boolean;
    status: 'sent' | 'typing' | 'read'; // Kiểu dữ liệu cụ thể
    timestamp: string;
    unreadCount: number;
  };
  
  
  // --- Dữ liệu cho phần hoạt động (Activities) ---
  export const ACTIVITIES_DATA: ActivityItemProps[] = [
    { id: 'you', name: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'emma', name: 'Emma', avatar: 'https://placehold.co/150x150/F2D499/333333?text=E' },
    { id: 'ava', name: 'Ava', avatar: 'https://placehold.co/150x150/E6C6B3/333333?text=A' },
    { id: 'sophia', name: 'Sophia', avatar: 'https://placehold.co/150x150/F2B94B/333333?text=S' },
    { id: 'james', name: 'James', avatar: 'https://placehold.co/150x150/B3E6E6/333333?text=J' },
    { id: 'oliver', name: 'Oliver', avatar: 'https://placehold.co/150x150/D4B3E6/333333?text=O' },
    { id: 'liam', name: 'Liam', avatar: 'https://placehold.co/150x150/FFB6C1/333333?text=L' },
    { id: 'mia', name: 'Mia', avatar: 'https://placehold.co/150x150/ADD8E6/333333?text=M' },
  ];
  
  // --- Dữ liệu cho danh sách tin nhắn ---
  // SỬA LỖI: Khai báo tường minh kiểu dữ liệu cho mảng là MessageItemProps[]
  export const MESSAGES_DATA: MessageItemProps[] = [
      {
          id: '1',
          sender: 'Emelie',
          avatar: 'https://placehold.co/150x150/B3D1E6/333333?text=E',
          lastMessage: 'Sticker 😍',
          lastMessageFromYou: false,
          status: 'sent',
          timestamp: new Date(Date.now() - 23 * 60 * 1000).toISOString(),
          unreadCount: 1,
      },
      {
          id: '2',
          sender: 'Abigail',
          avatar: 'https://placehold.co/150x150/A6A6A6/333333?text=A',
          lastMessage: 'Typing...',
          lastMessageFromYou: false,
          status: 'typing',
          timestamp: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
          unreadCount: 2,
      },
      {
          id: '3',
          sender: 'Elizabeth',
          avatar: 'https://placehold.co/150x150/D4B3E6/333333?text=E',
          lastMessage: 'Ok, see you then.',
          lastMessageFromYou: false,
          status: 'read',
          timestamp: new Date(Date.now() - 33 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '4',
          sender: 'Penelope',
          avatar: 'https://placehold.co/150x150/B3E6E6/333333?text=P',
          lastMessage: "Hey! What's up, long time..",
          lastMessageFromYou: true,
          status: 'read',
          timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '5',
          sender: 'Chloe',
          avatar: 'https://placehold.co/150x150/F2D499/333333?text=C',
          lastMessage: 'Hello how are you?',
          lastMessageFromYou: true,
          status: 'read',
          timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '6',
          sender: 'Grace',
          avatar: 'https://placehold.co/150x150/E6C6B3/333333?text=G',
          lastMessage: 'Great I will write later..',
          lastMessageFromYou: true,
          status: 'read',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '7',
          sender: 'Lucas',
          avatar: 'https://placehold.co/150x150/FFB6C1/333333?text=L',
          lastMessage: 'Can you send me the file?',
          lastMessageFromYou: false,
          status: 'sent',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          unreadCount: 5,
      },
      {
          id: '8',
          sender: 'Harper',
          avatar: 'https://placehold.co/150x150/ADD8E6/333333?text=H',
          lastMessage: 'Perfect, thank you!',
          lastMessageFromYou: true,
          status: 'read',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '9',
          sender: 'Jackson',
          avatar: 'https://placehold.co/150x150/90EE90/333333?text=J',
          lastMessage: 'See you tomorrow at 9 AM.',
          lastMessageFromYou: false,
          status: 'read',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          unreadCount: 0,
      },
      {
          id: '10',
          sender: 'Aria',
          avatar: 'https://placehold.co/150x150/FFDAB9/333333?text=A',
          lastMessage: 'Haha, that\'s hilarious!',
          lastMessageFromYou: false,
          status: 'sent',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          unreadCount: 1,
      },
  ];
  