import React, { useEffect } from 'react';
import { useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../src/api/client';
import { useAuthStore } from '../src/store/authStore';
import '../global.css';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
});

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash screen is already hidden or not available
});

function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { isAuthenticated, isLoading } = useAuthStore();
  const [splashHidden, setSplashHidden] = React.useState(false);

  useEffect(() => {
    if (fontsLoaded && !isLoading && !splashHidden) {
      SplashScreen.hideAsync()
        .then(() => setSplashHidden(true))
        .catch(() => {
          // Splash screen already hidden or not registered
          setSplashHidden(true);
        });
    }
  }, [fontsLoaded, isLoading, splashHidden]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen 
              name="main" 
              options={{ 
                headerShown: false,
                presentation: 'card',
              }} 
            />
            <Stack.Screen 
              name="auth/login" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Đăng nhập',
                headerStyle: { backgroundColor: '#f8fafc' },
              }} 
            />
            <Stack.Screen 
              name="auth/register" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Đăng ký tài khoản',
                headerStyle: { backgroundColor: '#f8fafc' },
              }} 
            />
            <Stack.Screen 
              name="course/[id]" 
              options={{ 
                headerShown: true,
                headerTitle: 'Chi tiết khóa học',
                headerBackTitleVisible: false,
              }} 
            />
            <Stack.Screen 
              name="lesson/[id]" 
              options={{ 
                headerShown: false,
                presentation: 'fullScreenModal',
              }} 
            />
            <Stack.Screen 
              name="payment/checkout" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Thanh toán',
              }} 
            />
            <Stack.Screen 
              name="payment/success" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Thanh toán thành công',
                gestureEnabled: false,
              }} 
            />
            <Stack.Screen 
              name="profile/edit" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Chỉnh sửa hồ sơ',
              }} 
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(RootLayout);
