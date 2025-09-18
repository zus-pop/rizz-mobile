import '@/global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { LocationProvider, NotificationProvider } from '@/providers';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// GoogleSignin.configure({
//   webClientId: '',
// });

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <GestureHandlerRootView>
      <StatusBar translucent animated barStyle={'dark-content'} backgroundColor={'transparent'} />
      <GluestackUIProvider mode="system">
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <LocationProvider>
              <BottomSheetModalProvider>
                <Stack initialRouteName="index">
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="profile-details" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="filter"
                    options={{
                      headerShown: true,
                      headerTitle: 'Filters',
                      animation: 'slide_from_bottom',
                      presentation: 'modal',
                      headerStyle: { backgroundColor: '#f9fafb' },
                      headerTintColor: '#fa5eff',
                      headerShadowVisible: false,
                      headerTitleStyle: { fontWeight: '600' },
                    }}
                  />
                  <Stack.Screen
                    name="settings"
                    options={{
                      headerShown: true,
                      headerTitle: 'Settings',
                      headerTintColor: '#fa5eff',
                      headerShadowVisible: false,
                      headerTitleStyle: { fontWeight: '600', fontSize: 30 },
                    }}
                  />
                </Stack>
                <Toaster swipeToDismissDirection="up" />
              </BottomSheetModalProvider>
            </LocationProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
