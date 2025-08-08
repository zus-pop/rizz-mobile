import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = '8d7c5453-746c-4bf5-87d2-faac278a1fe0';
const PROJECT_SLUG = 'rizz';
const OWNER = 'inspira01';

// App production config
const APP_NAME = 'Rizz';
const BUNDLE_IDENTIFIER = 'com.inspira.rizz';
const PACKAGE_NAME = 'com.inspira.rizz';
const ICON = './assets/images/icons/iOS-Prod.png';
const ADAPTIVE_ICON = './assets/images/icons/Android-Prod.png';
const SCHEME = 'rizz';

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } = getDynamicAppConfig(
    (process.env.APP_ENV as 'development' | 'preview' | 'production') || 'development'
  );

  return {
    ...config,
    name: name,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: '#ffffff',
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (environment: 'development' | 'preview' | 'production') => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} (Preview)`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './assets/images/icons/iOS-Prev.png',
      adaptiveIcon: './assets/images/icons/Android-Prev.png',
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} (Development)`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: './assets/images/icons/iOS-Dev.png',
    adaptiveIcon: './assets/images/icons/Android-Dev.png',
    scheme: `${SCHEME}-dev`,
  };
};
