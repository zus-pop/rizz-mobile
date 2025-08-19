import { Stack, router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  // Hàm xử lý việc reset và quay lại màn hình chào mừng
  const handleResetWelcomeScreen = async () => {
    try {
      // Xóa ghi chú đã lưu trong bộ nhớ
      await AsyncStorage.removeItem('@hasSeenWelcomeScreen');
      
      // Điều hướng người dùng quay trở lại màn hình welcome
      // Dùng 'replace' để ngăn người dùng quay lại màn hình Home bằng nút back
      router.replace('/welcome');
    } catch (e) {
      console.error("Lỗi khi reset màn hình chào mừng.", e);
      Alert.alert("Lỗi", "Không thể thực hiện thao tác này.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Tab Một</Text>
        <Text style={styles.subtitle}>Đây là màn hình chính của ứng dụng.</Text>

        {/* Nút Reset Welcome Screen */}
        <TouchableOpacity
          onPress={handleResetWelcomeScreen}
          className="mx-10 mt-10 h-14 items-center justify-center rounded-[15px] bg-gray-500" // Thay đổi màu sắc để phân biệt
          style={styles.buttonShadow}
        >
          <Text className="font-roboto text-base font-bold text-white">Xem lại Màn hình Chào mừng</Text>
        </TouchableOpacity>
        
        {/* Nút Login cũ của bạn (để tham khảo) */}
        <TouchableOpacity
          onPress={() => router.push('/signin')}
          className="mx-10 mt-6 h-14 items-center justify-center rounded-[15px] bg-[#FA5EFF]"
          style={styles.buttonShadow}
        >
          <Text className="font-roboto text-base font-bold text-white">Tới trang Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center', // Căn giữa nội dung
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});
