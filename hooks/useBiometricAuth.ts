// hooks/useBiometricAuth.ts
import * as LocalAuthentication from 'expo-local-authentication';
import { useState, useCallback, useEffect } from 'react';

type BiometryType = 'Fingerprint' | 'Facial Recognition' | 'Iris';

export const useBiometricAuth = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [biometryTypes, setBiometryTypes] = useState<BiometryType[]>([]);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkDeviceSupport = useCallback(async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (compatible && enrolled) {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const mappedTypes: BiometryType[] = [];
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        mappedTypes.push('Fingerprint');
      }
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        mappedTypes.push('Facial Recognition');
      }
      if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        mappedTypes.push('Iris');
      }
      setBiometryTypes(mappedTypes);
      setIsBiometricSupported(mappedTypes.length > 0);
    } else {
      setBiometryTypes([]);
      setIsBiometricSupported(false);
    }
  }, []);

  useEffect(() => {
    checkDeviceSupport();
  }, [checkDeviceSupport]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    setIsAuthenticating(true);
    setErrorMessage(null);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate your ${biometryTypes.length} biometrics`,
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
        requireConfirmation: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage(result.error || 'Authentication failed');
        setIsAuthenticated(false);
      }

      return result.success;
    } catch (err: any) {
      setErrorMessage(err.message || 'Unknown error occurred');
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [biometryTypes]);

  return {
    isAuthenticated,
    isBiometricSupported,
    biometryTypes,
    isAuthenticating,
    errorMessage,
    authenticate,
    checkDeviceSupport,
  };
};
