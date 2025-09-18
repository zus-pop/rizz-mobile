import { StyleSheet, Text, View } from 'react-native';

interface ProfileDetailsSectionProps {
  ageRange: [number, number];
  distance: number;
  interests: string[];
  lookingFor: string;
}

export default function ProfileDetailsSection({
  ageRange,
  distance,
  interests,
  lookingFor,
}: ProfileDetailsSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Age Range:</Text>
        <Text style={styles.value}>
          {ageRange[0]} - {ageRange[1]}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.value}>{distance} km</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Looking For:</Text>
        <Text style={styles.value}>{lookingFor || '-'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Interests:</Text>
        <Text style={styles.value}>{interests.length ? interests.join(', ') : '-'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fa5eff',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 15,
  },
  value: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 15,
  },
});
