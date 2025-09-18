import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProfileImageGridProps {
  images: string[];
  onAddImage: () => void;
  onReplaceImage: (idx: number) => void;
  onImagePress?: (idx: number) => void;
  renderControls?: (idx: number) => React.ReactNode;
}

const ProfileImageGrid = ({
  images,
  onAddImage,
  onReplaceImage,
  onImagePress,
  renderControls,
}: ProfileImageGridProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 12,
      }}>
      {images.map((img, idx) => (
        <View key={idx} style={{ margin: 4, alignItems: 'center' }}>
          <TouchableOpacity
            onLongPress={() => onReplaceImage(idx)}
            onPress={() => onImagePress && onImagePress(idx)}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: idx === 0 ? '#fa5eff' : '#eee',
            }}>
            <Image source={{ uri: img }} style={{ width: 72, height: 72 }} />
          </TouchableOpacity>
          {renderControls && renderControls(idx)}
        </View>
      ))}
      {images.length < 6 && (
        <TouchableOpacity
          onPress={onAddImage}
          style={{
            width: 72,
            height: 72,
            borderRadius: 12,
            backgroundColor: '#f3e6fa',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
          }}>
          <Ionicons name="add" size={32} color="#fa5eff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#f3e8ff',
    margin: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addImageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 32,
    color: '#fa5eff',
    fontWeight: 'bold',
  },
});

export default ProfileImageGrid;
