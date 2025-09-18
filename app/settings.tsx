import RangeSlider from '@/components/RangeSlider';
import SingleSlider from '@/components/SingleSlider';
import {
  afterGraduation,
  campusLife,
  deal_breakers,
  interests,
  lookingForOptions,
  loveLanguageOptions,
  preferring,
  studyStyle,
  universityOptions,
  weekendHabit,
  zodiacOptions,
} from '@/constants/input';
import { useFilterStore } from '@/store/filterStore';
import { useProfileStore } from '@/stores/profileStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const setProfile = useProfileStore((s) => s.setProfile);
  // Store initial profile in a ref to avoid re-initializing localProfile on every render
  const initialProfileRef = useRef(profile);
  const {
    filters: globalFilters,
    setAgeRange,
    setDistance,
    toggleInterest,
    setLookingFor,
  } = useFilterStore();
  const { settings: globalSettings, setSetting, setSettings } = useSettingsStore();

  // Local state for filters and settings
  const [filters, setFilters] = useState(globalFilters);
  const [settings, setLocalSettings] = useState(globalSettings);
  const [localProfile, setLocalProfile] = useState(initialProfileRef.current);

  // Handlers for local state
  const handleSetAgeRange = (ageRange: [number, number]) =>
    setFilters((prev) => ({ ...prev, ageRange }));
  const handleSetDistance = (distance: number) => setFilters((prev) => ({ ...prev, distance }));
  const handleToggleInterest = (interest: string) => {
    setFilters((prev) => {
      const current = prev.interests;
      const newInterests = current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest];
      return { ...prev, interests: newInterests };
    });
  };
  const handleSetLookingFor = (option: string) =>
    setFilters((prev) => ({ ...prev, lookingFor: option }));
  const handleSetSetting = (key: string, value: any) =>
    setLocalSettings((prev) => ({ ...prev, [key]: value }));

  // Apply changes to global stores
  const handleApply = () => {
    setAgeRange(filters.ageRange);
    setDistance(filters.distance);
    setLookingFor(filters.lookingFor);
    // Set all interests
    globalFilters.interests.forEach((i) => {
      if (!filters.interests.includes(i)) toggleInterest(i);
    });
    filters.interests.forEach((i) => {
      if (!globalFilters.interests.includes(i)) toggleInterest(i);
    });
    setSettings(settings);
    setProfile(localProfile);
    router.back();
  };

  // Cancel: reset local state to global
  const handleCancel = () => {
    setFilters(globalFilters);
    setLocalSettings(globalSettings);
    setLocalProfile(profile);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.optionsList}>
        {/* Preferences Section */}
        <View>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.subsectionTitle}>Age Range</Text>
          <RangeSlider
            min={18}
            max={50}
            values={filters.ageRange}
            onValuesChange={handleSetAgeRange}
          />
          <Text style={[styles.subsectionTitle, { marginTop: 16 }]}>Distance</Text>
          <SingleSlider
            min={1}
            max={100}
            value={filters.distance}
            onValueChange={handleSetDistance}
          />
          <Text style={[styles.subsectionTitle, { marginTop: 16 }]}>Looking For</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8, gap: 5 }}>
            {lookingForOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSetLookingFor(option.name)}
                style={{
                  backgroundColor: filters.lookingFor === option.name ? '#fa5eff' : '#f3e8ff',
                  borderRadius: 16,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  marginRight: 8,
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    color: filters.lookingFor === option.name ? 'white' : '#374151',
                    fontWeight: '500',
                  }}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.subsectionTitle, { marginTop: 16 }]}>Interests</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {interests.map((interest) => {
              const selected = filters.interests.includes(interest.name);
              return (
                <TouchableOpacity
                  key={interest.id}
                  onPress={() => handleToggleInterest(interest.name)}
                  style={{
                    backgroundColor: selected ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text style={{ color: selected ? 'white' : '#374151', fontWeight: '500' }}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* App Settings Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingRow}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#fa5eff"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={(v) => handleSetSetting('notifications', v)}
            />
          </View>
          <View style={styles.settingRow}>
            <Ionicons name="moon-outline" size={22} color="#fa5eff" style={{ marginRight: 12 }} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={(v) => handleSetSetting('darkMode', v)}
            />
          </View>
          {/* <View style={styles.settingRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#fa5eff"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.settingLabel}>Privacy</Text>
            <TouchableOpacity
              style={{ marginLeft: 12, padding: 8, backgroundColor: '#f3e8ff', borderRadius: 8 }}
              onPress={() =>
                handleSetSetting('privacy', settings.privacy === 'public' ? 'private' : 'public')
              }>
              <Text style={{ color: '#374151', fontWeight: '500' }}>
                {settings.privacy === 'public' ? 'Public' : 'Private'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingRow}>
            <Ionicons name="mail-outline" size={22} color="#fa5eff" style={{ marginRight: 12 }} />
            <Text style={styles.settingLabel}>Account Email</Text>
            <TextInput
              style={{
                marginLeft: 12,
                borderBottomWidth: 1,
                borderColor: '#fa5eff',
                flex: 1,
                color: '#374151',
              }}
              value={settings.accountEmail}
              onChangeText={(v) => handleSetSetting('accountEmail', v)}
              placeholder="Enter your email"
              placeholderTextColor="#bdbdbd"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View> */}
        </View>
        {/* Profile Details Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          {/* Bio */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Bio</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#fa5eff',
                borderRadius: 8,
                padding: 10,
                color: '#374151',
              }}
              value={localProfile.bio}
              onChangeText={(v) => setLocalProfile((prev) => ({ ...prev, bio: v }))}
              placeholder="Enter your bio"
              placeholderTextColor="#bdbdbd"
              multiline
              numberOfLines={4}
            />
          </View>
          {/* University */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>University</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {universityOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, university: opt.name }))}
                  style={{
                    backgroundColor: localProfile.university === opt.name ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.university === opt.name ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Study Style */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Study Style</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {studyStyle.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, study_style: opt.id }))}
                  style={{
                    backgroundColor: localProfile.study_style === opt.id ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.study_style === opt.id ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Weekend Habit */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Weekend Habit</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {weekendHabit.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, weekend_hobby: opt.id }))}
                  style={{
                    backgroundColor: localProfile.weekend_hobby === opt.id ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.weekend_hobby === opt.id ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Campus Life */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Campus Life</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {campusLife.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, campus_life: opt.id }))}
                  style={{
                    backgroundColor: localProfile.campus_life === opt.id ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.campus_life === opt.id ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* After Graduation */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Future Plan</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {afterGraduation.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, future_plan: opt.id }))}
                  style={{
                    backgroundColor: localProfile.future_plan === opt.id ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.future_plan === opt.id ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Communication Preference */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Communication Preference</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {preferring.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() =>
                    setLocalProfile((prev) => ({ ...prev, communication_preference: opt.id }))
                  }
                  style={{
                    backgroundColor:
                      localProfile.communication_preference === opt.id ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.communication_preference === opt.id ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Deal Breakers (multi-select) */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Deal Breakers</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {deal_breakers.map((opt) => {
                const selected =
                  Array.isArray(profile.deal_breakers) && profile.deal_breakers.includes(opt.id);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    onPress={() =>
                      setLocalProfile((prev) => {
                        const current = Array.isArray(prev.deal_breakers) ? prev.deal_breakers : [];
                        return {
                          ...prev,
                          deal_breakers: selected
                            ? current.filter((id: string) => id !== opt.id)
                            : [...current, opt.id],
                        };
                      })
                    }
                    style={{
                      backgroundColor: selected ? '#fa5eff' : '#f3e8ff',
                      borderRadius: 16,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      marginRight: 8,
                      marginBottom: 8,
                    }}>
                    <Text style={{ color: selected ? 'white' : '#374151', fontWeight: '500' }}>
                      {opt.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* Zodiac */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Zodiac</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {zodiacOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, zodiac: opt.name }))}
                  style={{
                    backgroundColor: localProfile.zodiac === opt.name ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.zodiac === opt.name ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Love Language */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.subsectionTitle}>Love Language</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {loveLanguageOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLocalProfile((prev) => ({ ...prev, love_language: opt.name }))}
                  style={{
                    backgroundColor:
                      localProfile.love_language === opt.name ? '#fa5eff' : '#f3e8ff',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: localProfile.love_language === opt.name ? 'white' : '#374151',
                      fontWeight: '500',
                    }}>
                    {opt.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Sticky Apply/Cancel Buttons */}
      <View style={styles.stickyButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={{ color: '#fa5eff', fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  optionsList: {
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 10, // Add extra bottom padding to prevent overlap with sticky buttons
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  settingLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  subsectionTitle: {
    color: '#6b7280',
    marginBottom: 4,
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fa5eff',
    marginBottom: 12,
  },
  stickyButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#f3e8ff',
    zIndex: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 14,
    marginRight: 8,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#fa5eff',
    borderRadius: 12,
    padding: 14,
    marginLeft: 8,
  },
});
