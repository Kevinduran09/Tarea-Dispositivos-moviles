import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    androidScheme: 'http',

  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: [
        "google.com"
      ]
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
  }
};

export default config;
