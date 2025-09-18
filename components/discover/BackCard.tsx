import { Text } from '@/components/ui/text';
import { Profile } from '@/types/profile';
import FastImage from '@d11/react-native-fast-image';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

export default function BackCard({
  profile,
  width,
  height,
}: {
  profile: Profile;
  width?: number;
  height?: number;
  index?: number;
  currentIndex?: SharedValue<number>;
  autoPlay?: boolean;
}) {
  const currentImageIndex = useSharedValue(0);
  const getProgressBarStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = currentImageIndex.value === index;
      return {
        backgroundColor: withTiming(
          isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          { duration: 200 }
        ),
      };
    });
  };

  return (
    <View style={[backCardStyles.card, width && height ? { width, height } : {}]}>
      <View style={backCardStyles.imageSection}>
        {/* Progress indicators */}
        <View style={backCardStyles.progressContainer}>
          {profile.images.map((_, index) => (
            <Animated.View
              key={index}
              style={[backCardStyles.progressBar, getProgressBarStyle(index)]}
            />
          ))}
        </View>

        {/* Image carousel */}
        <Carousel
          loop
          width={360}
          data={profile.images}
          onSnapToItem={(index) => {
            currentImageIndex.value = index;
          }}
          renderItem={({ item }) => (
            <View style={backCardStyles.imageContainer}>
              <FastImage
                source={{ uri: item }}
                style={backCardStyles.image}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={backCardStyles.overlay} />
            </View>
          )}
        />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageSection: {
    height: '36%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f8f8f8', // Placeholder color when image is loading
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
    top: 18,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  detailsSection: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 200, // Increased padding to ensure scrollable content
    flexGrow: 1, // Ensure content can grow,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 18,
  },
  infoRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  interestTag: {
    backgroundColor: '#f5f0ff', // Light purple to match app theme
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8deff',
  },
  interestText: {
    fontSize: 14,
    color: '#6c47b8', // Purple to match theme
    fontWeight: '500',
  },
  progressContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 6,
    zIndex: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  activeProgressBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0', // Placeholder background
  },
});
