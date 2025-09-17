import '@/global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { LocationProvider, NotificationProvider } from '@/providers';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'react-native';
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
