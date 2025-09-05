// LocationContext.tsx
import * as Location from 'expo-location';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface LocationContextType {
  location: Location.LocationObject | null;
  error: string | null;
  loading: boolean;
  watching: boolean;
  geocodedLocations: Location.LocationGeocodedLocation[] | null;
  geocodedAddresses: Location.LocationGeocodedAddress[] | null;
  requestLocation: () => Promise<Location.LocationObject | null>;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
  getGeocode: (address: string) => Promise<Location.LocationGeocodedLocation[] | null>;
  getReverseGeocode: (
    coords: Location.LocationObjectCoords
  ) => Promise<Location.LocationGeocodedAddress[] | null>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [watching, setWatching] = useState(false);
  const [watcher, setWatcher] = useState<Location.LocationSubscription | null>(null);

  const [geocodedLocations, setGeocodedLocations] = useState<
    Location.LocationGeocodedLocation[] | null
  >(null);
  const [geocodedAddresses, setGeocodedAddresses] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);

  const requestLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return null;
      }

      const result = await Location.getCurrentPositionAsync({});
      getReverseGeocode({
        longitude: result.coords.longitude,
        latitude: result.coords.latitude,
      });
      setLocation(result);
      return result;
    } catch (err) {
      setError('Failed to get location');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const startWatching = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          setLocation(loc);
        }
      );

      setWatcher(subscription);
      setWatching(true);
    } catch (err) {
      setError('Failed to watch location');
    }
  }, []);

  const stopWatching = useCallback(() => {
    watcher?.remove();
    setWatcher(null);
    setWatching(false);
  }, [watcher]);

  const getGeocode = useCallback(async (address: string) => {
    try {
      const results = await Location.geocodeAsync(address);
      setGeocodedLocations(results);
      return results;
    } catch (err) {
      setError('Failed to geocode address');
      setGeocodedLocations(null);
      return null;
    }
  }, []);

  const getReverseGeocode = useCallback(
    async (coords: Pick<Location.LocationGeocodedLocation, 'longitude' | 'latitude'>) => {
      try {
        const results = await Location.reverseGeocodeAsync(coords);
        setGeocodedAddresses(results);
        return results;
      } catch (err) {
        setError('Failed to reverse geocode');
        setGeocodedAddresses(null);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    if (location?.coords) {
      getReverseGeocode(location.coords);
    }
  }, [location, getReverseGeocode]);

  useEffect(() => {
    return () => {
      watcher?.remove();
    };
  }, [watcher]);

  return (
    <LocationContext.Provider
      value={{
        location,
        error,
        loading,
        watching,
        geocodedLocations,
        geocodedAddresses,
        requestLocation,
        startWatching,
        stopWatching,
        getGeocode,
        getReverseGeocode,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
