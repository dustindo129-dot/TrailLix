import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../src/store/authStore';
import { QUERY_KEYS, REGEX_PATTERNS } from '../../src/constants';

export default function EditProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, updateProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Profile update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // This would normally call your profile update API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      return data;
    },
    onSuccess: (data) => {
      updateProfile(data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
      Alert.alert(
        'Thành công',
        'Cập nhật hồ sơ thành công!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    },
    onError: () => {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại.');
    },
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên');
      return false;
    }

    if (!REGEX_PATTERNS.EMAIL.test(formData.email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return false;
    }

    if (formData.phone && !REGEX_PATTERNS.PHONE.test(formData.phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    updateMutation.mutate(formData);
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Thay đổi ảnh đại diện',
      'Chọn nguồn ảnh',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Chụp ảnh', onPress: () => {/* Implement camera */ } },
        { text: 'Chọn từ thư viện', onPress: () => {/* Implement gallery */ } },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View className="items-center py-8 bg-gray-50">
            <TouchableOpacity 
              className="relative"
              onPress={handleChangeAvatar}
            >
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="person" size={48} color="#0ea5e9" />
                </View>
              )}
              
              <View className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
                <Ionicons name="camera" size={16} color="white" />
              </View>
            </TouchableOpacity>
            
            <Text className="text-gray-600 text-sm mt-2">
              Nhấn để thay đổi ảnh đại diện
            </Text>
          </View>

          {/* Form Section */}
          <View className="px-6 py-6 space-y-6">
            {/* Name Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">
                Họ và tên <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Nhập họ và tên"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">
                Email <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Nhập email"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Phone Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Số điện thoại</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#9ca3af"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            {/* Bio Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Giới thiệu bản thân</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Viết một chút về bản thân..."
                placeholderTextColor="#9ca3af"
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Security Section */}
            <View className="mt-8">
              <Text className="text-lg font-bold text-gray-900 mb-4">
                Bảo mật
              </Text>
              
              <TouchableOpacity className="bg-gray-50 rounded-lg p-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="key-outline" size={24} color="#6b7280" />
                  <Text className="text-gray-900 font-medium ml-3">
                    Đổi mật khẩu
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Notification Settings */}
            <View className="mt-6">
              <Text className="text-lg font-bold text-gray-900 mb-4">
                Thông báo
              </Text>
              
              <View className="space-y-3">
                <TouchableOpacity className="bg-gray-50 rounded-lg p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="notifications-outline" size={24} color="#6b7280" />
                    <Text className="text-gray-900 font-medium ml-3">
                      Thông báo push
                    </Text>
                  </View>
                  <Ionicons name="toggle" size={24} color="#22c55e" />
                </TouchableOpacity>

                <TouchableOpacity className="bg-gray-50 rounded-lg p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="mail-outline" size={24} color="#6b7280" />
                    <Text className="text-gray-900 font-medium ml-3">
                      Thông báo email
                    </Text>
                  </View>
                  <Ionicons name="toggle-outline" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            className={`rounded-lg py-4 ${
              updateMutation.isPending ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handleSave}
            disabled={updateMutation.isPending}
          >
            <Text className="text-white text-center font-semibold text-base">
              {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
