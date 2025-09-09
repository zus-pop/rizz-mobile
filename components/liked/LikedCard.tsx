import { Profile } from '@/types/profile';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image, TouchableOpacity, View } from 'react-native';
import { Divider } from '../ui/divider';
import { Text } from '../ui/text';
interface LikeCardProps {
  profile: Partial<Profile>;
  isBlur?: boolean;
}
const LikedCard = ({ profile }: LikeCardProps) => {
  return (
    <View className="flex-1">
      <View className="relative h-full w-full">
        <Image
          className="aspect-[3/4]"
          style={{
            borderRadius: 16,
          }}
          source={{ uri: profile?.images?.[0] }}
          resizeMode="cover"
          blurRadius={0}
        />
        <View
          className="absolute h-full w-full"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 16 }}></View>
        <View
          className="absolute"
          style={{
            bottom: 50,
            left: 10,
          }}>
          <Text size="xl" bold className="text-white">
            {`${profile.firstName}, ${profile.age}`}
          </Text>
        </View>
        <BlurView
          tint="dark"
          intensity={22}
          blurReductionFactor={2.2}
          experimentalBlurMethod="dimezisBlurView"
          style={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
          className="absolute bottom-0 h-1/5 w-full flex-row items-center justify-center overflow-hidden">
          <TouchableOpacity className="flex-1 items-center p-2">
            <FontAwesome5 name="heart-broken" color={'white'} size={20} />
          </TouchableOpacity>
          <Divider orientation="vertical" className="bg-white" />
          <TouchableOpacity className="flex-1 items-center p-2">
            <AntDesign name="heart" color={'white'} size={20} />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

export default LikedCard;
