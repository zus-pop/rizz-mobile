import { fetchProfiles } from '@/api/profile';
import AnimatedSwitch from '@/components/AnimatedSwitch';
import { customToast } from '@/components/CustomToast';
import BackCard from '@/components/discover/BackCard';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import FrontCard from '@/components/discover/FrontCard';
import SwipeButton from '@/components/discover/SwipeButton';
import Loading from '@/components/Loading';
import {
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetView,
  CustomBackdrop,
} from '@/components/ui/bottom-sheet';
import { Profile } from '@/types/profile';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, useSharedValue } from 'react-native-reanimated';
import { Swiper, SwiperCardRefType } from 'rn-swiper-list';
const ICON_SIZE = 24;
export default function Discover() {
  const lookingForOptions = useMemo(
    () => ['Long-term relationship', 'Something casual', 'New friends', 'Still figuring it out'],
    []
  );
  const interests = useMemo(
    () => ['Music', 'Travel', 'Photography', 'Sports', 'Art', 'Food', 'Movies', 'Gaming'],
    []
  );

  // Current page state
  const [currentPage, setCurrentPage] = useState(1);
  // Track when we're loading the next page separately
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

  // Fetch profiles with simple useQuery
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['profiles', currentPage],
    queryFn: () => fetchProfiles(currentPage),
    staleTime: 30 * 1000,
  });

  // Reset loading state when data changes
  useEffect(() => {
    if (data && isLoadingNextPage) {
      // Small delay to allow smooth transition
      setTimeout(() => {
        setIsLoadingNextPage(false);
      }, 500);
    }
  }, [data, isLoadingNextPage]);

  useEffect(() => {
    if (isLoadingNextPage) {
      customToast.info('Fetching...');
    }
  }, [isLoadingNextPage]);

  const enableDeviceMotion = useSharedValue<boolean>(false);

  // Bottom sheet reference
  const filterBottomSheetRef = useRef<BottomSheetModal>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['75%'], []);

  // Bottom sheet handlers
  const handlePresentFilterSheet = useCallback(() => {
    filterBottomSheetRef.current?.present();
  }, []);

  const handleCloseFilterSheet = useCallback(() => {
    filterBottomSheetRef.current?.dismiss();
  }, []);

  const ref = useRef<SwiperCardRefType>(null);

  const renderCard = useCallback((profile: Profile) => {
    return <FrontCard profile={profile} onPress={() => {}} />;
  }, []);
  const renderFlippedCard = useCallback((profile: Profile) => {
    return <BackCard profile={profile} />;
  }, []);
  const OverlayLabelRight = useCallback(() => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <View style={[styles.overlayIconContainer, styles.overlayLabelRight]}>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            {/* Shadow text layer */}
            <Text style={[styles.overlayTextShadow, styles.overlayTextShadowRight]}>LIKE</Text>

            {/* Multi-colored text using character-by-character styling */}
            <View style={styles.multiColorTextContainer}>
              <Text style={[styles.overlayTextChar, styles.overlayTextRightChar1]}>L</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextRightChar2]}>I</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextRightChar3]}>K</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextRightChar4]}>E</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }, []);

  const OverlayLabelLeft = useCallback(() => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <View style={[styles.overlayIconContainer, styles.overlayLabelLeft]}>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            {/* Shadow text layer */}
            <Text style={[styles.overlayTextShadow, styles.overlayTextShadowLeft]}>NOPE</Text>

            {/* Multi-colored text using character-by-character styling */}
            <View style={styles.multiColorTextContainer}>
              <Text style={[styles.overlayTextChar, styles.overlayTextLeftChar1]}>N</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextLeftChar2]}>O</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextLeftChar3]}>P</Text>
              <Text style={[styles.overlayTextChar, styles.overlayTextLeftChar4]}>E</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }, []);

  // Only show full page loading for first load (page 1)
  if ((isLoading && currentPage === 1) || (!data?.profiles && !isLoadingNextPage))
    return <Loading scale={0.6} />;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Discover',
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        style={styles.container}>
        <DiscoverHeader title="Discover" onFilterPress={handlePresentFilterSheet} />
        <View style={styles.subContainer} pointerEvents="box-none">
          {isLoadingNextPage ? (
            <Loading scale={0.5} />
          ) : (
            <Swiper
              ref={ref}
              disableTopSwipe
              disableBottomSwipe
              keyExtractor={(item) => item.firstName + item.lastName}
              key={`swiper-page-${currentPage}`} // Only re-render when page changes
              data={data?.profiles || []}
              cardStyle={styles.cardStyle}
              overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
              renderCard={renderCard}
              // Animation configs for smoother swipes - increased stiffness, reduced damping
              swipeRightSpringConfig={{
                stiffness: 300,
                damping: 8,
                mass: 0.4,
                overshootClamping: false,
              }}
              swipeLeftSpringConfig={{
                stiffness: 300,
                damping: 8,
                mass: 0.4,
                overshootClamping: false,
              }}
              swipeTopSpringConfig={{
                stiffness: 300,
                damping: 8,
                mass: 0.4,
                overshootClamping: false,
              }}
              swipeBottomSpringConfig={{
                stiffness: 180,
                damping: 8,
                mass: 0.4,
                overshootClamping: false,
              }}
              // Enable velocity-based swiping - lower threshold for faster response
              swipeVelocityThreshold={1200}
              // Improve swipe back animation - more responsive
              swipeBackXSpringConfig={{
                stiffness: 200,
                damping: 10,
                mass: 0.3,
                overshootClamping: false,
              }}
              swipeBackYSpringConfig={{
                stiffness: 200,
                damping: 10,
                mass: 0.3,
                overshootClamping: false,
              }}
              // Customize rotation animation - more responsive rotation
              rotateInputRange={[-200, 0, 200]}
              rotateOutputRange={[-Math.PI / 8, 0, Math.PI / 8]}
              onIndexChange={(index) => {
                const maxIndex = data?.profiles ? data.profiles.length - 1 : 0;
                console.log(`Current Active index: ${index}/${maxIndex}`);
              }}
              onSwipeRight={(cardIndex) => {
                console.log('cardIndex', cardIndex);
              }}
              onSwipeLeft={(cardIndex) => {
                console.log('onSwipeLeft', cardIndex);
              }}
              onSwipedAll={() => {
                console.log('All cards swiped, fetching next page...');
                if (data?.nextPage) {
                  // Set loading state for next page only
                  setIsLoadingNextPage(true);
                  // Update page number which will trigger refetch
                  setCurrentPage(data.nextPage);
                } else {
                  console.log('No more profiles available');
                  // Optionally reset to page 1 if at the end
                  setIsLoadingNextPage(true);
                  setCurrentPage(1);
                }
              }}
              prerenderItems={3} // Prerender more items for smoother transitions
              FlippedContent={renderFlippedCard}
              // Flip animation props
              direction="y"
              flipDuration={350} // Faster flip for smoother experience
              OverlayLabelRight={OverlayLabelRight}
              OverlayLabelLeft={OverlayLabelLeft}
              inputOverlayLabelRightOpacityRange={[0, 40]}
              outputOverlayLabelRightOpacityRange={[0, 1]}
              inputOverlayLabelLeftOpacityRange={[0, -40]}
              outputOverlayLabelLeftOpacityRange={[0, 1]}
              inputOverlayLabelTopOpacityRange={[0, -40]}
              outputOverlayLabelTopOpacityRange={[0, 1]}
              inputOverlayLabelBottomOpacityRange={[0, 40]}
              outputOverlayLabelBottomOpacityRange={[0, 1]}
            />
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <SwipeButton
            isDisable={isLoadingNextPage}
            icon={<AntDesign name="sync" size={24} color="#fa5eff" />}
            className="h-16 w-16 bg-white shadow-md shadow-purple-400"
            style={styles.button}
            onPress={() => {
              ref.current?.flipCard();
            }}
          />
          <SwipeButton
            isDisable={isLoadingNextPage}
            icon={<Entypo size={ICON_SIZE} name="cross" color={'#fb3224'} />}
            // style={styles.button}
            className="h-16 w-16 bg-white shadow-md shadow-red-400"
            onPress={() => {
              ref.current?.swipeLeft();
            }}
          />
          <SwipeButton
            isDisable={isLoadingNextPage}
            icon={<Entypo size={ICON_SIZE} name="back" color={'#24e5fb'} />}
            className="h-16 w-16 bg-white shadow-md shadow-cyan-400"
            style={styles.button}
            onPress={() => {
              ref.current?.swipeBack();
            }}
          />
          <SwipeButton
            isDisable={isLoadingNextPage}
            icon={<Entypo size={ICON_SIZE} name="heart" color={'#fa5eff'} />}
            className="h-16 w-16 bg-white shadow-md shadow-pink-400"
            style={styles.button}
            onPress={() => {
              ref.current?.swipeRight();
            }}
          />
        </View>

        {/* Filter Bottom Sheet */}
        <BottomSheetModal
          ref={filterBottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={(props) => (
            <CustomBackdrop {...props} onPress={handleCloseFilterSheet} />
          )}
          backgroundStyle={{ backgroundColor: '#f9fafb' }}
          handleComponent={BottomSheetHandle}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize">
          <BottomSheetView className="flex-1">
            {/* Header - Fixed */}
            <View className="mb-4 flex-row items-center justify-between px-6 pt-4">
              <Text className="text-2xl font-bold text-gray-900">Filters</Text>
              <TouchableOpacity
                onPress={handleCloseFilterSheet}
                className="rounded-full bg-gray-200 p-2">
                <MaterialIcons name="close" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content - Lazy render */}
            <ScrollView
              className="px-4"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 32 }}
              bounces={true}
              overScrollMode="auto"
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled">
              {/* Age Range Section */}
              <View className="mb-6">
                <Text className="mb-3 text-lg font-semibold text-gray-800">Age Range</Text>
                <View className="rounded-lg bg-white p-4 shadow-sm">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600">18</Text>
                    <View className="mx-4 h-1 flex-1 rounded bg-purple-200">
                      <View className="h-1 w-1/2 rounded bg-purple-500" />
                    </View>
                    <Text className="text-gray-600">50</Text>
                  </View>
                  <Text className="mt-2 text-center text-sm text-gray-500">18 - 35 years old</Text>
                </View>
              </View>

              {/* Distance Section */}
              <View className="mb-6">
                <Text className="mb-3 text-lg font-semibold text-gray-800">Distance</Text>
                <View className="rounded-lg bg-white p-4 shadow-sm">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600">1 km</Text>
                    <View className="mx-4 h-1 flex-1 rounded bg-purple-200">
                      <View className="h-1 w-3/4 rounded bg-purple-500" />
                    </View>
                    <Text className="text-gray-600">100 km</Text>
                  </View>
                  <Text className="mt-2 text-center text-sm text-gray-500">Within 25 km</Text>
                </View>
              </View>

              {/* Interests Section */}
              <View className="mb-6">
                <Text className="mb-3 text-lg font-semibold text-gray-800">Interests</Text>
                <View className="flex-row flex-wrap gap-2">
                  <LegendList
                    data={interests}
                    keyExtractor={(item) => item}
                    renderItem={({ item: interest }) => (
                      <TouchableOpacity
                        key={interest}
                        className="mb-2 mr-2 rounded-full border border-purple-200 bg-white px-4 py-2">
                        <Text className="text-purple-600">{interest}</Text>
                      </TouchableOpacity>
                    )}
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                  />
                </View>
              </View>
              {/* Enable Device Motion Section */}
              <View className="mb-4">
                <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
                  <Text className="text-lg font-semibold text-gray-800">Device Motion</Text>
                  <AnimatedSwitch
                    value={enableDeviceMotion}
                    onPress={() => {
                      enableDeviceMotion.value = !enableDeviceMotion.value;
                    }}
                    trackColors={{
                      off: '#d1d5db',
                      on: '#a78bfa',
                    }}
                    duration={300}
                  />
                </View>
                <Text className="ml-1 mt-1 text-sm text-gray-500">
                  Tilt your phone to swipe cards.
                </Text>
              </View>
              {/* Looking For Section */}
              <View className="mb-6">
                <Text className="mb-3 text-lg font-semibold text-gray-800">Looking For</Text>
                <View className="space-y-2">
                  <LegendList
                    data={lookingForOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item: option }) => (
                      <TouchableOpacity className="flex-row items-center rounded-lg bg-white p-4 shadow-sm">
                        <View className="mr-3 h-5 w-5 rounded-full border-2 border-purple-300" />
                        <Text className="text-gray-700">{option}</Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    scrollEnabled={false}
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View className="mb-8 flex-row gap-4">
                <TouchableOpacity
                  onPress={handleCloseFilterSheet}
                  className="flex-1 rounded-lg border border-gray-300 bg-white py-3">
                  <Text className="text-center font-semibold text-gray-700">Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCloseFilterSheet}
                  className="flex-1 rounded-lg bg-purple-500 py-3">
                  <Text className="text-center font-semibold text-white">Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efebfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  button: {
    height: 50,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: '#3A3D45',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  renderCardContainer: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: '#baeee5',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardStyle: {
    width: '95%',
    height: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderCardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
    width: '100%',
  },
  overlayLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    // Remove the transform that was causing positioning issues
  },
  overlayLabelRight: {
    transform: [{ rotate: '12deg' }], // Slight rotation
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 70,
  },
  overlayLabelLeft: {
    transform: [{ rotate: '-12deg' }], // Slight rotation
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 70,
  },
  overlayIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative', // Required for absolute positioning of the text shadow
    flexDirection: 'column', // Stack shadow and color text vertically
    alignSelf: 'center',
  },
  overlayText: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false, // Tighter text layout
    padding: 0,
    margin: 0,
  },
  overlayTextRight: {
    color: '#3dd978', // Vibrant green
    textShadowColor: '#1a9c4a',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    // 3D text effect
    elevation: 10,
  },
  overlayTextLeft: {
    color: '#ff3b30', // Vibrant red
    textShadowColor: '#c0392b',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    // 3D text effect
    elevation: 10,
  },
  overlayTextShadow: {
    position: 'absolute',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    opacity: 0.25, // Subtle shadow effect
    zIndex: -1,
    width: '100%',
    alignSelf: 'center',
  },
  overlayTextShadowRight: {
    color: '#1a9c4a', // Darker green
    top: 3,
    left: 0,
    transform: [{ scale: 1.05 }], // Slightly larger for better shadow effect
  },
  overlayTextShadowLeft: {
    color: '#c0392b', // Darker red
    top: 3,
    left: 0,
    transform: [{ scale: 1.05 }], // Slightly larger for better shadow effect
  },
  multiColorTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
    width: '100%',
  },
  overlayTextChar: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 0, // We're handling spacing manually with each character
    textTransform: 'uppercase',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  // Right (LIKE) text character colors
  overlayTextRightChar1: {
    color: '#3dd978', // Green
    textShadowColor: '#1a9c4a',
  },
  overlayTextRightChar2: {
    color: '#50e991', // Lighter green
    textShadowColor: '#2abd6e',
  },
  overlayTextRightChar3: {
    color: '#3dd978', // Green
    textShadowColor: '#1a9c4a',
  },
  overlayTextRightChar4: {
    color: '#50e991', // Lighter green
    textShadowColor: '#2abd6e',
  },
  // Left (NOPE) text character colors
  overlayTextLeftChar1: {
    color: '#ff3b30', // Red
    textShadowColor: '#c0392b',
  },
  overlayTextLeftChar2: {
    color: '#ff6b61', // Lighter red
    textShadowColor: '#d35400',
  },
  overlayTextLeftChar3: {
    color: '#ff3b30', // Red
    textShadowColor: '#c0392b',
  },
  overlayTextLeftChar4: {
    color: '#ff6b61', // Lighter red
    textShadowColor: '#d35400',
  },
  text: {
    color: '#001a72',
  },
  overlayLabelContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'rgba(239, 235, 252, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
