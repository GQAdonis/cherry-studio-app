import 'tsx/cjs'

import packageJson from './package.json'

// Read version from environment variable (set during build) or fallback to package.json
const appVersion = packageJson.version

export default {
  expo: {
    name: 'The Boss',
    slug: 'the-boss',
    version: appVersion,
    // orientation: 'portrait', 锁定竖屏
    orientation: 'default',
    icon: './docs/branding/logo.png',
    scheme: 'the-boss',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    entryPoint: './src/app.js',
    runtimeVersion: {
      policy: 'appVersion'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'ai.prometheusags.theboss',
      userInterfaceStyle: 'automatic',
      infoPlist: {
        LSApplicationQueriesSchemes: ['shortcuts'],
        NSSpeechRecognitionUsageDescription: 'Allow Cherry Studio App to use speech recognition for voice input.'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/logo.png',
        backgroundColor: '#0A192D'
      },
      edgeToEdgeEnabled: true,
      package: 'ai.prometheusags.theboss',
      userInterfaceStyle: 'automatic',
      predictiveBackGestureEnabled: false
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: { deploymentTarget: '15.5' },
          android: {
            buildToolsVersion: '35.0.0',
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24,
            gradleVersion: '8.13',
            androidGradlePluginVersion: '8.13.0',
            buildArchs: ['arm64-v8a'],
            usesCleartextTraffic: true
          }
        }
      ],
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/logo.png',
          imageWidth: 144,
          resizeMode: 'contain',
          backgroundColor: '#0A192D',
          dark: {
            image: './src/assets/images/logo.png',
            backgroundColor: '#0A192D'
          },
          ios: {
            splash: {
              image: './src/assets/images/logo.png',
              backgroundColor: '#0A192D',
              resizeMode: 'contain',
              dark: {
                image: './src/assets/images/logo.png',
                backgroundColor: '#0A192D'
              }
            }
          },
          android: {
            splash: {
              image: './src/assets/images/logo.png',
              backgroundColor: '#0A192D',
              resizeMode: 'contain',
              dark: {
                image: './src/assets/images/logo.png',
                backgroundColor: '#0A192D'
              }
            }
          }
        }
      ],
      'expo-localization',
      'expo-asset',
      [
        'expo-font',
        {
          fonts: [
            './src/assets/fonts/JetBrainsMono-Regular.ttf',
            './src/assets/fonts/prometheus/Roboto-Regular.ttf',
            './src/assets/fonts/prometheus/Roboto-Medium.ttf',
            './src/assets/fonts/prometheus/Roboto-Bold.ttf',
            './src/assets/fonts/prometheus/Ubuntu-Regular.ttf',
            './src/assets/fonts/prometheus/Ubuntu-Medium.ttf',
            './src/assets/fonts/prometheus/Ubuntu-Bold.ttf'
          ]
        }
      ],
      'expo-web-browser',
      'expo-sqlite',
      [
        'expo-document-picker',
        {
          iCloudContainerEnvironment: 'Production'
        }
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.'
        }
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow Cherry Studio App to access your camera',
          // microphonePermission: 'Allow Cherry Studio App to access your microphone',
          recordAudioAndroid: true
        }
      ],
      [
        'expo-media-library',
        {
          photosPermission: 'Allow Cherry Studio App to save images to your photo library.',
          savePhotosPermission: 'Allow Cherry Studio App to save images to your photo library.',
          isAccessMediaLocationEnabled: true
        }
      ],
      [
        'expo-calendar',
        {
          calendarPermission: 'Allow Cherry Studio App to access your calendar.',
          remindersPermission: 'Allow Cherry Studio App to access your reminders.'
        }
      ],
      ['react-native-compressor'],
      [
        'expo-speech-recognition',
        {
          microphonePermission: 'Allow Cherry Studio App to use your microphone for voice input.',
          speechRecognitionPermission: 'Allow Cherry Studio App to use speech recognition.'
        }
      ],
      [
        'react-native-edge-to-edge',
        {
          android: {
            parentTheme: 'Material3',
            enforceNavigationBarContrast: false
          }
        }
      ],
      [
        'react-native-share',
        {
          ios: ['fb', 'instagram', 'twitter', 'tiktoksharesdk'],
          android: ['com.facebook.katana', 'com.instagram.android', 'com.twitter.android', 'com.zhiliaoapp.musically'],
          enableBase64ShareAndroid: true
        }
      ],
      './plugins/heapSize'
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
      tsconfigPaths: true
    },
    extra: {
      eas: {
        projectId: 'e14a954a-c7a1-429c-8a75-17ac77359b90'
      },
      appVersion
    }
  }
}
