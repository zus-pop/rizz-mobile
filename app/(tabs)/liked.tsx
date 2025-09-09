import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import LikedCard from '../../components/liked/LikedCard';
export default function Liked() {
  const [likedUsers] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      age: 28,
      images: ['https://picsum.photos/1080/1080'],
    },
    {
      id: '2',
      firstName: 'Emma',
      lastName: 'Davis',
      age: 25,
      images: ['https://picsum.photos/1920/1080'],
    },
    {
      id: '3',
      firstName: 'Jessica',
      lastName: 'Wilson',
      age: 30,
      images: ['https://picsum.photos/1080/1920'],
    },
    {
      id: '4',
      firstName: 'Ashley',
      lastName: 'Brown',
      age: 27,
      images: ['https://picsum.photos/1080/1080'],
    },
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: '#efebfc' }}>
      <View className="mt-10 flex-1" style={{ margin: 20 }}>
        <View className="gap-2">
          <Heading size="3xl" className="text-black">
            Liked
          </Heading>
          <Text size="2xl" className="text-black">
            This is a list of people who have liked you.
          </Text>
        </View>

        <View className="mt-6 flex-1">
          <LegendList
            data={likedUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <LikedCard profile={item} />}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-center text-gray-500">No likes yet</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
