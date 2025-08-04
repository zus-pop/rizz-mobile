import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Or use react-native-vector-icons/Ionicons
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/text';

const DiscoverHeader = () => {
  return (
    <View className="h-14 w-full flex-row items-center justify-between px-4">
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 6,
          overflow: 'hidden',
        }}>
        <Ionicons name="game-controller" size={30} color="#FA5EFF" />
      </TouchableOpacity>
      <Text size="3xl" className="font-bold text-black">
        Discover
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 6,
          overflow: 'hidden',
        }}>
        <MaterialCommunityIcons name="air-filter" size={30} color="#FA5EFF" />
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverHeader;
