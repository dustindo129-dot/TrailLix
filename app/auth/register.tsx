import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/authStore';
import { REGEX_PATTERNS } from '../../src/constants';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên');
      return false;
    }

    if (!REGEX_PATTERNS.EMAIL.test(formData.email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return false;
    }

    if (!REGEX_PATTERNS.PASSWORD.test(formData.password)) {
      Alert.alert(
        'Lỗi', 
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Attempting to register with:', {
        name: formData.name,
        email: formData.email,
        password: '***hidden***'
      });
      
      await register(formData.name, formData.email, formData.password);
      Alert.alert(
        'Thành công', 
        'Đăng ký tài khoản thành công!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      Alert.alert('Lỗi đăng ký', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="pt-8 pb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Tạo tài khoản mới 🚀
            </Text>
            <Text className="text-gray-600 text-base">
              Tham gia cộng đồng học AI hàng đầu Việt Nam
            </Text>
          </View>

          <View className="space-y-4">
            {/* Name Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Họ và tên</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Nhập họ và tên của bạn"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Nhập email của bạn"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Mật khẩu</Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900"
                  placeholder="Tạo mật khẩu mạnh"
                  placeholderTextColor="#9ca3af"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={24} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Xác nhận mật khẩu</Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900"
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#9ca3af"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={24} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`rounded-lg py-4 mt-6 ${
                isLoading ? 'bg-gray-400' : 'bg-blue-600'
              }`}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text className="text-gray-500 text-sm text-center mt-4">
              Bằng việc đăng ký, bạn đồng ý với{' '}
              <Text className="text-blue-600">Điều khoản sử dụng</Text> và{' '}
              <Text className="text-blue-600">Chính sách bảo mật</Text> của chúng tôi.
            </Text>
          </View>
        </ScrollView>

        {/* Login Link */}
        <View className="px-6 py-4 border-t border-gray-200">
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Đã có tài khoản? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-blue-600 font-semibold">Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
