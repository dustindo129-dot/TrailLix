const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// Temporarily disable NativeWind to fix startup issue
// We'll re-enable it after basic Expo is working
module.exports = config;