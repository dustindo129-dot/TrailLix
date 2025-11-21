import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../hooks/useLanguage';
import { useAuthStore } from '../store/authStore';
import type { UserProfile } from './RoleSelector';

interface ProfileSettingsProps {
  onBack: () => void;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onBack }) => {
  const { t, locale, setLocale } = useLanguage();
  const { user, setUser } = useAuthStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || '',
    ageRange: user?.profile?.ageRange || '',
    role: user?.profile?.role || '',
    aiExperience: user?.profile?.aiExperience || '',
    skills: user?.profile?.skills || [],
    achievement: user?.profile?.achievement || '',
    fields: user?.profile?.fields || [],
    motivations: user?.profile?.motivations || [],
  });

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Messages
  const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Get access token from auth store
    const token = useAuthStore.getState().accessToken;
    setAccessToken(token);
    
    if (user?.profile) {
      setProfile({
        name: user.name,
        ageRange: user.profile.ageRange,
        role: user.profile.role,
        aiExperience: user.profile.aiExperience,
        skills: user.profile.skills,
        achievement: user.profile.achievement,
        fields: user.profile.fields,
        motivations: user.profile.motivations,
      });
    }
  }, [user]);

  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (field: 'fields' | 'skills' | 'motivations', value: string) => {
    const currentValues = profile[field] || [];
    const isSelected = currentValues.includes(value);
    let newSelection = [...currentValues];

    if (isSelected) {
      newSelection = newSelection.filter(item => item !== value);
    } else {
      if (field === 'fields' && newSelection.length < 3) {
        newSelection.push(value);
      } else if (field !== 'fields') {
        newSelection.push(value);
      }
    }
    handleProfileChange(field, newSelection);
  };

  const handleProfileSave = async () => {
    if (!accessToken || !user) return;

    try {
      const profileData = {
        name: profile.name,
        age_range: profile.ageRange,
        role_description: profile.role,
        ai_experience: profile.aiExperience,
        skills: profile.skills,
        achievement: profile.achievement,
        fields: profile.fields,
        motivations: profile.motivations,
      };

      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const responseData = await response.json();
      const updatedUserData = responseData.data || responseData;

      // Update user in store
      const updatedUser = {
        ...user,
        name: profile.name,
        profile: profile,
      };
      setUser(updatedUser);

      setProfileMessage({ text: t('account.profileSuccess'), type: 'success' });
      setTimeout(() => setProfileMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
      setProfileMessage({ text: t('account.genericError'), type: 'error' });
      setTimeout(() => setProfileMessage({ text: '', type: '' }), 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (!accessToken || !user) return;

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ text: t('auth.error.noMatch'), type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      setPasswordMessage({ text: t('account.passwordSuccess'), type: 'success' });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordMessage({ text: '', type: '' }), 3000);
    } catch (error: any) {
      console.error('Password change error:', error);
      let errorMessage = t('account.genericError');
      if (error.message.includes('incorrect') || error.message.includes('wrong')) {
        errorMessage = t('account.passwordError');
      }
      setPasswordMessage({ text: errorMessage, type: 'error' });
      setTimeout(() => setPasswordMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleLanguageChange = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
  };

  if (!user) {
    return null;
  }

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1">
        <View className="p-4 space-y-4">
          {/* Header */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-gray-900">
                {t('account.title')}
              </Text>
              <TouchableOpacity
                onPress={onBack}
                className="p-2 rounded-lg bg-gray-100"
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Information */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-900 mb-2">
              {t('account.profileTitle')}
            </Text>
            <Text className="text-gray-600 mb-6 text-sm">
              {t('account.profileDescription')}
            </Text>

            <View className="space-y-4">
              {/* Username (disabled) */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.username')}
                </Text>
                <TextInput
                  value={user.email.split('@')[0]}
                  editable={false}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-500"
                />
              </View>

              {/* Email (disabled) */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.emailLabel')}
                </Text>
                <TextInput
                  value={user.email}
                  editable={false}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-500"
                />
              </View>

              {/* Full Name */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.nameLabel')}
                </Text>
                <TextInput
                  value={profile.name}
                  onChangeText={(text) => handleProfileChange('name', text)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholder="Enter your full name"
                />
              </View>

              {/* Age Range */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.ageRangeLabel')}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {Object.entries(t('roleSelector.step2.options') as Record<string, string>).map(([key, value]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleProfileChange('ageRange', value)}
                      className={`px-3 py-2 border rounded-lg ${
                        profile.ageRange === value
                          ? 'bg-red-500 border-red-500'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text className={`text-sm ${
                        profile.ageRange === value ? 'text-white' : 'text-gray-700'
                      }`}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Role */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.roleLabel')}
                </Text>
                <TextInput
                  value={profile.role}
                  onChangeText={(text) => handleProfileChange('role', text)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholder="Enter your role/position"
                />
              </View>

              {/* AI Experience */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.aiExperienceLabel')}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {Object.values(t('roleSelector.step4.options') as Record<string, string>).map((value: string) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => handleProfileChange('aiExperience', value)}
                      className={`px-3 py-2 border rounded-lg ${
                        profile.aiExperience === value
                          ? 'bg-red-500 border-red-500'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text className={`text-sm ${
                        profile.aiExperience === value ? 'text-white' : 'text-gray-700'
                      }`}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Fields of Interest */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.fieldsLabel')} (Max 3)
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {Object.entries(t('roleSelector.step7.options') as Record<string, string>).map(([key, value]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleMultiSelectChange('fields', value)}
                      className={`px-3 py-2 border rounded-lg ${
                        profile.fields.includes(value)
                          ? 'bg-red-100 border-red-500'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text className={`text-sm ${
                        profile.fields.includes(value) ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Profile Message */}
              {profileMessage.text ? (
                <Text className={`text-sm ${
                  profileMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {profileMessage.text}
                </Text>
              ) : null}

              {/* Save Profile Button */}
              <TouchableOpacity
                onPress={handleProfileSave}
                className="w-full py-3 bg-blue-600 rounded-lg items-center"
              >
                <Text className="text-white font-semibold text-base">
                  {t('account.saveProfile')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Settings */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-900 mb-2">
              {t('account.languageSettings')}
            </Text>
            <Text className="text-gray-600 mb-4 text-sm">
              {t('account.selectLanguage')}
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => handleLanguageChange('en')}
                className={`flex-1 py-3 px-4 border rounded-lg items-center ${
                  locale === 'en' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <Text className={`font-medium ${
                  locale === 'en' ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {t('account.english')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLanguageChange('vi')}
                className={`flex-1 py-3 px-4 border rounded-lg items-center ${
                  locale === 'vi' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <Text className={`font-medium ${
                  locale === 'vi' ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {t('account.vietnamese')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Security */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-900 mb-2">
              {t('account.securityTitle')}
            </Text>
            <Text className="text-gray-600 mb-6 text-sm">
              {t('account.securityDescription')}
            </Text>

            <View className="space-y-4">
              {/* Current Password */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.oldPassword')}
                </Text>
                <View className="relative">
                  <TextInput
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry={!showOldPassword}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900"
                    placeholder="Enter current password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons
                      name={showOldPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* New Password */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.newPassword')}
                </Text>
                <View className="relative">
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900"
                    placeholder="Enter new password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons
                      name={showNewPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm New Password */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  {t('account.confirmNewPassword')}
                </Text>
                <TextInput
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry={!showNewPassword}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholder="Confirm new password"
                />
              </View>

              {/* Password Message */}
              {passwordMessage.text ? (
                <Text className={`text-sm ${
                  passwordMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {passwordMessage.text}
                </Text>
              ) : null}

              {/* Change Password Button */}
              <TouchableOpacity
                onPress={handlePasswordChange}
                className="w-full py-3 bg-red-600 rounded-lg items-center"
              >
                <Text className="text-white font-semibold text-base">
                  {t('account.changePassword')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSettings;
