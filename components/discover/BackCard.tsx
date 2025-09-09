import { Text } from '@/components/ui/text';
import { Profile } from '@/types/profile';
import { AntDesign } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

export default function BackCard({
  onPress,
  profile,
  width,
  height,
  index,
  currentIndex,
}: {
  onPress: () => void;
  profile: Profile;
  width?: number;
  height?: number;
  index: number;
  currentIndex: SharedValue<number>;
}) {
  const currentImageIndex = useSharedValue(0);
  const getProgressBarStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = currentImageIndex.value === index;
      return {
        backgroundColor: withTiming(isActive ? 'white' : 'rgba(255, 255, 255, 0.3)', {
          duration: 100,
        }),
      };
    });
  };
  return (
    <View
      style={[
        backCardStyles.card,
        width && height
          ? {
              width,
              height,
            }
          : {},
      ]}>
      <View style={backCardStyles.imageSection}>
        <View style={backCardStyles.progressContainer}>
          {profile.images.map((_, index) => (
            <Animated.View
              className="h-1 flex-1 rounded-full"
              key={index}
              style={getProgressBarStyle(index)}
            />
          ))}
        </View>

        <Carousel
          loop
          autoPlayInterval={3000}
          width={width || 300}
          height={200}
          data={profile.images}
          onSnapToItem={(index) => {
            currentImageIndex.value = index;
          }}
          renderItem={({ item }) => (
            <TouchableOpacity style={backCardStyles.imageContainer} activeOpacity={1}>
              <Image source={{ uri: item }} style={backCardStyles.image} resizeMode="cover" />
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={backCardStyles.closeButton} onPress={onPress}>
          <AntDesign name="retweet" size={24} color="#fa5eff" />
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={backCardStyles.detailsSection}>
        <ScrollView
          style={backCardStyles.scrollContainer}
          contentContainerStyle={backCardStyles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          directionalLockEnabled={true}>
          <Text style={backCardStyles.name}>{`${profile.firstName} ${profile.lastName}`}</Text>

          <View style={backCardStyles.infoRow}>
            <Text style={backCardStyles.label}>Age</Text>
            <Text style={backCardStyles.value}>{profile.age}</Text>
          </View>

          {profile.bio && (
            <View style={backCardStyles.infoRow}>
              <Text style={backCardStyles.label}>About</Text>
              <Text style={backCardStyles.value}>{profile.bio}</Text>
            </View>
          )}

          {profile.location && (
            <View style={backCardStyles.infoRow}>
              <Text style={backCardStyles.label}>Location</Text>
              <Text style={backCardStyles.value}>{profile.location}</Text>
            </View>
          )}

          {profile.occupation && (
            <View style={backCardStyles.infoRow}>
              <Text style={backCardStyles.label}>Occupation</Text>
              <Text style={backCardStyles.value}>{profile.occupation}</Text>
            </View>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <View style={backCardStyles.infoRow}>
              <Text style={backCardStyles.label}>Interests</Text>
              <View style={backCardStyles.interestsContainer}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={backCardStyles.interestTag}>
                    <Text style={backCardStyles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const backCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imageSection: {
    height: '45%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  detailsSection: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Increased padding to ensure scrollable content
    flexGrow: 1, // Ensure content can grow
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 14,
    color: '#333',
  },

  progressContainer: {
    position: 'absolute',
    top: 8,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
  },
  activeProgressBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
});
