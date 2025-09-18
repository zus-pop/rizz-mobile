import RangeSlider from '@/components/RangeSlider';
import SingleSlider from '@/components/SingleSlider';
import { FilterData, useFilterStore } from '@/store/filterStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const lookingForOptions = [
  'Long-term relationship',
  'Something casual',
  'New friends',
  'Still figuring it out',
];
const interests = ['Music', 'Travel', 'Photography', 'Sports', 'Art', 'Food', 'Movies', 'Gaming'];

export default function FilterScreen() {
  // Use Zustand store
  const { filters: storeFilters, setFilters } = useFilterStore();

  // Local state for temporary filter values
  const [tempFilters, setTempFilters] = useState<FilterData>({ ...storeFilters });
  // Initialize temp filters from store
  useEffect(() => {
    setTempFilters({ ...storeFilters });
  }, []);

  // Local handlers for updating temp filter values
  const handleSetAgeRange = useCallback((range: [number, number]) => {
    setTempFilters((prev) => ({ ...prev, ageRange: range }));
  }, []);

  const handleSetDistance = useCallback((distance: number) => {
    setTempFilters((prev) => ({ ...prev, distance }));
  }, []);

  const handleToggleInterest = useCallback((interest: string) => {
    setTempFilters((prev) => {
      const currentInterests = prev.interests;
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];

      console.log('Toggling interest:', interest);
      console.log('Previous interests:', currentInterests);
      console.log('New interests:', newInterests);

      return { ...prev, interests: newInterests };
    });
  }, []);

  const handleToggleLookingFor = useCallback((option: string) => {
    setTempFilters((prev) => {
      // For "Looking For", we only want single selection

      const newLookingFor = prev.lookingFor === option ? '' : option;
      console.log(`Current looking for: ${newLookingFor}`);
      return { ...prev, lookingFor: newLookingFor };
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    // Save temp filters to the store
    setFilters(tempFilters);
    router.back();
  }, [tempFilters, setFilters]);

  const handleClearFilters = useCallback(() => {
    // Reset to default values without saving to store yet
    setTempFilters({
      ageRange: [18, 35],
      distance: 25,
      interests: [],
      lookingFor: '',
    });
  }, []);

  // Calculate if there are unsaved changes
  const hasChanges = useMemo(() => {
    return (
      tempFilters.ageRange[0] !== storeFilters.ageRange[0] ||
      tempFilters.ageRange[1] !== storeFilters.ageRange[1] ||
      tempFilters.distance !== storeFilters.distance ||
      JSON.stringify(tempFilters.interests) !== JSON.stringify(storeFilters.interests) ||
      tempFilters.lookingFor !== storeFilters.lookingFor
    );
  }, [tempFilters, storeFilters]);

  return (
    <>
      {/* Header configuration is now handled in _layout.tsx */}
      <SafeAreaView style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}>
          <View>
            {/* Age Range Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color="#fa5eff"
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Age Range</Text>
              </View>
              <RangeSlider
                min={18}
                max={50}
                values={tempFilters.ageRange}
                onValuesChange={handleSetAgeRange}
              />
              <Text style={styles.sectionSubtitle}>
                {tempFilters.ageRange[0]} - {tempFilters.ageRange[1]} years old
              </Text>
            </View>

            {/* Distance Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="#fa5eff"
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Distance</Text>
              </View>
              <SingleSlider
                min={1}
                max={100}
                value={tempFilters.distance}
                onValueChange={handleSetDistance}
              />
              <Text style={styles.sectionSubtitle}>Within {tempFilters.distance} km</Text>
            </View>

            {/* Interests Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color="#fa5eff"
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Interests</Text>
              </View>
              <View style={styles.interestsGrid}>
                <View style={styles.interestsFlexContainer}>
                  {interests.map((interest) => {
                    const isSelected = tempFilters.interests.includes(interest);
                    return (
                      <TouchableOpacity
                        key={interest}
                        onPress={() => handleToggleInterest(interest)}
                        style={[styles.interestChip, isSelected && styles.interestChipSelected]}>
                        <Text
                          key={`interest-${interest}-${isSelected ? 'selected' : 'unselected'}`}
                          style={[
                            styles.interestChipText,
                            isSelected && styles.interestChipTextSelected,
                          ]}>
                          {interest}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Looking For Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="search-outline"
                  size={24}
                  color="#fa5eff"
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Looking For</Text>
              </View>
              <View style={styles.lookingForList}>
                {lookingForOptions.map((option) => {
                  const isSelected = tempFilters.lookingFor === option;
                  return (
                    <React.Fragment key={option}>
                      <TouchableOpacity
                        onPress={() => handleToggleLookingFor(option)}
                        style={styles.lookingForOption}>
                        <View
                          key={`radio-${option}-${isSelected ? 'selected' : 'unselected'}`}
                          style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
                        />
                        <Text
                          key={`text-${option}-${isSelected ? 'selected' : 'unselected'}`}
                          style={styles.lookingForText}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                      {option !== lookingForOptions[lookingForOptions.length - 1] && (
                        <View style={styles.separator} />
                      )}
                    </React.Fragment>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleClearFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleApplyFilters}
            style={[styles.applyButton, hasChanges && styles.applyButtonHighlighted]}>
            <Text style={styles.applyButtonText}>
              {hasChanges ? 'Apply Changes' : 'Apply Filters'}
            </Text>
            {hasChanges && <View style={styles.changesIndicator} />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  interestsGrid: {
    marginTop: 8,
  },
  interestsFlexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    marginRight: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  interestChipSelected: {
    backgroundColor: '#fa5eff',
    borderColor: '#fa5eff',
    shadowColor: '#fa5eff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  interestChipText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  interestChipTextSelected: {
    color: 'white',
  },
  lookingForList: {
    marginTop: 8,
  },
  lookingForOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: '#fa5eff',
    borderColor: '#fa5eff',
  },
  lookingForText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  separator: {
    height: 8,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fa5eff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applyButtonHighlighted: {
    backgroundColor: '#e44ee4', // Slightly darker pink to indicate changes
    shadowColor: '#fa5eff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  changesIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginLeft: 8,
  },
});
