import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EyeIcon, EyeOffIcon, CheckIcon } from './Icons';
import { useLanguage } from '../hooks/useLanguage';
import TypingEffect from './TypingEffect';
import AnimatedGradient from './AnimatedGradient';

interface AuthProps {
  onLogin: (email: string, password: string, isSignup: boolean, name?: string) => Promise<{ success: boolean; error?: string }>;
}

interface PasswordStrengthMeterProps {
  password: string;
  t: (key: string) => any;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password, t }) => {
  const checks = useMemo(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);
    const score = [length, uppercase, lowercase, number, special].filter(Boolean).length;
    return { length, uppercase, lowercase, number, special, score };
  }, [password]);

  const getStrengthProps = () => {
    switch (checks.score) {
      case 1:
      case 2:
        return { text: t('auth.strength.weak'), color: '#ef4444' };
      case 3:
        return { text: t('auth.strength.medium'), color: '#f59e0b' };
      case 4:
      case 5:
        return { text: t('auth.strength.strong'), color: '#22c55e' };
      default:
        return { text: '', color: '#4B5563' };
    }
  };

  const { text, color } = getStrengthProps();

  const criteria = [
    { label: t('auth.strength.criteria.length'), met: checks.length },
    { label: t('auth.strength.criteria.uppercase'), met: checks.uppercase },
    { label: t('auth.strength.criteria.lowercase'), met: checks.lowercase },
    { label: t('auth.strength.criteria.number'), met: checks.number },
    { label: t('auth.strength.criteria.special'), met: checks.special },
  ];

  return (
    <View className="mt-2 space-y-2">
      <View className="flex-row gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <View
            key={i}
            className="h-1 rounded-full flex-1"
            style={{ backgroundColor: i < checks.score ? color : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </View>
      {text ? <Text className="text-xs font-semibold text-gray-300">{text}</Text> : null}
      <View className="space-y-1 mt-1">
        {criteria.map((item) => (
          <View
            key={item.label}
            className="flex-row items-center gap-2"
          >
            <CheckIcon className={item.met ? 'text-green-400' : 'text-gray-400'} size={14} />
            <Text className={`text-xs ${item.met ? 'text-green-400' : 'text-gray-400'}`}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t, locale, setLocale } = useLanguage();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError(t('auth.error.emailRequired'));
      return;
    }
    if (!password.trim()) {
      setError(t('auth.error.passwordRequired'));
      return;
    }

    if (!isLoginView && password !== confirmPassword) {
      setError(t('auth.error.noMatch'));
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await onLogin(email.trim(), password, !isLoginView, isLoginView ? undefined : email.split('@')[0]);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const taglines = t('auth.taglines').split(',');

  return (
    <View className="flex-1">
      <AnimatedGradient>
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                padding: 16,
                justifyContent: 'center',
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
              automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            >
              <Animated.View
                style={{ 
                  opacity: fadeAnim,
                  flex: 1,
                  justifyContent: 'center',
                  minHeight: 400, // Ensure minimum height to prevent collapse
                }}
                className="w-full max-w-sm mx-auto"
              >
                {/* Logo */}
                <View className="items-center mb-4">
                  <Image
                    source={{ uri: 'https://i.postimg.cc/C5hYtRpG/favicon-Trailix-1.png' }}
                    className="w-16 h-16 rounded-lg"
                  />
                </View>

                {/* Title */}
                <Text className="text-3xl font-bold text-white text-center mb-2">
                  {t(isLoginView ? 'auth.loginTitle' : 'auth.signupTitle')}
                </Text>

                {/* Typing Effect Tagline */}
                <View className="items-center mb-8">
                  <TypingEffect texts={taglines} className="text-lg font-medium text-white" />
                </View>

                {/* Form Container */}
                <View className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
                  {/* Email Input */}
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t('auth.email')}
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white mb-4"
                  />

                  {/* Password Input */}
                  <View className="relative mb-4">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder={t('auth.password')}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white pr-12"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={20} color="rgba(255,255,255,0.7)" />
                      ) : (
                        <EyeIcon size={20} color="rgba(255,255,255,0.7)" />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Confirm Password (Signup only) */}
                  {!isLoginView && (
                    <>
                      <View className="relative mb-4">
                        <TextInput
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          placeholder={t('auth.confirmPassword')}
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-3 text-white"
                        />
                      </View>
                      {password.length > 0 && <PasswordStrengthMeter password={password} t={t} />}
                    </>
                  )}

                  {/* Remember Me (Login only) */}
                  {isLoginView && (
                    <TouchableOpacity
                      onPress={() => setRememberMe(!rememberMe)}
                      className="flex-row items-center mb-4"
                    >
                      <View
                        className={`w-4 h-4 rounded border ${
                          rememberMe ? 'bg-primary-red border-primary-red' : 'bg-white/20 border-white/30'
                        } mr-2 items-center justify-center`}
                      >
                        {rememberMe && <CheckIcon size={12} color="#FFFFFF" />}
                      </View>
                      <Text className="text-sm text-gray-300">{t('auth.rememberMe')}</Text>
                    </TouchableOpacity>
                  )}

                  {/* Error Message */}
                  {error ? <Text className="text-sm text-red-300 mb-4">{error}</Text> : null}

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`w-full px-8 py-3 bg-primary-red rounded-lg ${isLoading ? 'opacity-50' : ''}`}
                  >
                    <Text className="text-lg font-semibold text-white text-center">
                      {isLoading ? '...' : t(isLoginView ? 'auth.login' : 'auth.signup')}
                    </Text>
                  </TouchableOpacity>

                  {/* Toggle View */}
                  <View className="flex-row justify-center mt-6">
                    <Text className="text-sm text-gray-300">
                      {t(isLoginView ? 'auth.noAccount' : 'auth.hasAccount')}{' '}
                    </Text>
                    <TouchableOpacity onPress={toggleView}>
                      <Text className="text-sm font-semibold text-white">
                        {t(isLoginView ? 'auth.signup' : 'auth.login')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Language Toggle */}
                <TouchableOpacity onPress={() => setLocale(locale === 'en' ? 'vi' : 'en')} className="mt-8">
                  <Text className="text-sm text-gray-300 text-center">
                    ← {locale === 'en' ? 'Tiếng Việt' : 'English'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </AnimatedGradient>
    </View>
  );
};

export default Auth;

