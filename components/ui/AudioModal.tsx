import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AudioModalProps {
  visible: boolean;
  onClose: () => void;
  onPause: () => void;
  isPlaying: boolean;
  profileName: string;
}

export default function AudioModal({
  visible,
  onClose,
  onPause,
  isPlaying,
  profileName,
}: AudioModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{profileName}</Text>
          <TouchableOpacity style={styles.iconButton} onPress={onPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#fa5eff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 240,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fa5eff',
  },
  iconButton: {
    marginBottom: 24,
    backgroundColor: '#f3e8ff',
    borderRadius: 32,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
});
