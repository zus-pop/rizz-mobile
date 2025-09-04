import { Linking, StyleSheet, Text, View } from 'react-native';

import { LegendList } from '@legendapp/list';
import { useEffect } from 'react';
import { useLocation, useNotification } from '../../providers';
import Loading from '../../components/Loading';
import * as Notifications from 'expo-notifications';

export default function Liked() {
  // Cái này là trang render ai like mình nhưng mà đang test vài thứ khác
  const { location, requestLocation, geocodedAddresses } = useLocation();
  const { pushToken, requestPushToken } = useNotification();
  useEffect(() => {
    requestLocation();
    requestPushToken();
  }, []);

  if (!location || !geocodedAddresses?.length) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }} onPress={Linking.openSettings}>
          Setting
        </Text>
        <Loading scale={0.8} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }} onPress={Linking.openSettings}>
        Setting
      </Text>
      <Text style={{ fontSize: 15 }} onPress={schedulePushNotification}>
        Test local (in-app) notification
      </Text>
      <Text style={{ fontSize: 20 }}>Push Token (Must use Real Device):</Text>
      <Text>Token: {pushToken ?? 'N/A'}</Text>
      <Text style={{ fontSize: 20 }}>Current Location:</Text>
      <Text>Latitude: {location.coords.latitude ?? 'N/A'}</Text>
      <Text>Longitude: {location.coords.longitude ?? 'N/A'}</Text>
      <LegendList
        keyExtractor={(item) => item.city!}
        data={geocodedAddresses}
        renderItem={({ item }) => <Text>Address: {item.formattedAddress ?? 'N/A'}</Text>}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
