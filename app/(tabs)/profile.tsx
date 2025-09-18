import ProfileDetailsSection from '@/components/profile/ProfileDetailsSection';
import ProfileImageGrid from '@/components/profile/ProfileImageGrid';
import { useFilterStore } from '@/store/filterStore';
import { pickImageFromLibrary } from '@/utils/image-picker';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

// ProfileImage interface
interface ProfileImage {
  url: string;
  order: number;
}
export default function ProfileScreen() {
  // Example images array (replace with real user data)
  const [images, setImages] = useState<ProfileImage[]>([
    { url: 'https://randomuser.me/api/portraits/women/44.jpg', order: 0 },
    { url: 'https://randomuser.me/api/portraits/women/45.jpg', order: 1 },
  ]);

  // Get filter data for details
  const { filters } = useFilterStore();

  // Add image handler using expo-image-picker
  const handleAddImage = async () => {
    if (images.length >= 6) return;
    const uri = await pickImageFromLibrary();
    if (uri) {
      setImages((prev) => [...prev, { url: uri, order: prev.length }]);
    }
  };

  // Replace image handler using expo-image-picker
  const handleReplaceImage = async (idx: number) => {
    const uri = await pickImageFromLibrary();
    if (uri) {
      setImages((imgs) => imgs.map((img, i) => (i === idx ? { ...img, url: uri } : img)));
    }
  };

  // Move image left/right
  const moveImage = (idx: number, direction: 'left' | 'right') => {
    setImages((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      if (direction === 'left' && idx > 0) {
        [sorted[idx - 1].order, sorted[idx].order] = [sorted[idx].order, sorted[idx - 1].order];
      } else if (direction === 'right' && idx < sorted.length - 1) {
        [sorted[idx + 1].order, sorted[idx].order] = [sorted[idx].order, sorted[idx + 1].order];
      }
      return [...sorted];
    });
  };

  // Always show avatar as first image by order
  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      keyboardShouldPersistTaps="handled">
      <View>
        {/* Avatar and Name */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: sortedImages[0]?.url }} style={styles.avatar} />
          <Text style={styles.name}>Alexandra, 25</Text>
          <ProfileImageGrid
            images={sortedImages.map((img) => img.url)}
            onAddImage={handleAddImage}
            onImagePress={() => {}}
            onReplaceImage={handleReplaceImage}
            renderControls={(idx: number) => (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
                <TouchableOpacity
                  onPress={() => moveImage(idx, 'left')}
                  disabled={idx === 0}
                  style={{ opacity: idx === 0 ? 0.3 : 1, marginRight: 4 }}>
                  <Ionicons name="chevron-back" size={18} color="#fa5eff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => moveImage(idx, 'right')}
                  disabled={idx === sortedImages.length - 1}
                  style={{ opacity: idx === sortedImages.length - 1 ? 0.3 : 1 }}>
                  <Ionicons name="chevron-forward" size={18} color="#fa5eff" />
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={{ color: '#bdbdbd', fontSize: 12, marginTop: 2 }}>
            Long-press to replace. Use arrows to reorder. Max 6 images.
          </Text>
        </View>

        {/* Plan/Billing Section */}
        <View style={styles.planSection}>
          <MaterialIcons name="stars" size={32} color="#fa5eff" style={{ marginRight: 16 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.planTitle}>Rizz Plus</Text>
            <Text style={styles.planDescription}>
              Unlimited Likes, 5 Super Likes a day, 1 Boost a month
            </Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Details Section (from filter) */}
        <ProfileDetailsSection
          ageRange={filters.ageRange}
          distance={filters.distance}
          interests={filters.interests}
          lookingFor={filters.lookingFor}
        />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fa5eff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
  },
  planSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f5ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#fa5eff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fa5eff',
  },
  planDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 0,
    maxWidth: 200,
  },
  upgradeButton: {
    marginLeft: 'auto',
    backgroundColor: '#fa5eff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
