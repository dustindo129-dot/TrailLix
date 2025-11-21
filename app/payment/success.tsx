import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../src/constants';

export default function PaymentSuccessScreen() {
  const { courseId, orderId } = useLocalSearchParams<{ 
    courseId: string; 
    orderId: string; 
  }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate relevant queries to refresh data
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ENROLLMENTS });
    queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.COURSE_DETAIL, courseId] });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COURSES });
  }, [courseId, queryClient]);

  const handleContinue = () => {
    router.push({
      pathname: '/course/[id]',
      params: { id: courseId },
    });
  };

  const handleGoHome = () => {
    router.push('/' as any); // Navigate to home tab
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="bg-green-100 rounded-full p-6 mb-6">
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
          Thanh toán thành công! 🎉
        </Text>

        <Text className="text-gray-600 text-center text-base mb-8 leading-6">
          Chúc mừng! Bạn đã đăng ký khóa học thành công. 
          Bây giờ bạn có thể bắt đầu học ngay lập tức.
        </Text>

        {/* Order Info */}
        {orderId && (
          <View className="bg-gray-50 rounded-lg p-4 mb-8 w-full">
            <Text className="text-gray-700 text-center">
              <Text className="font-semibold">Mã đơn hàng: </Text>
              <Text className="font-mono">{orderId}</Text>
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="w-full space-y-3">
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-4 w-full"
            onPress={handleContinue}
          >
            <Text className="text-white text-center font-semibold text-base">
              Bắt đầu học ngay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 rounded-lg py-4 w-full"
            onPress={handleGoHome}
          >
            <Text className="text-gray-700 text-center font-semibold text-base">
              Về trang chủ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View className="mt-8 bg-blue-50 rounded-lg p-4 w-full">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={20} color="#0ea5e9" className="mr-2 mt-0.5" />
            <View className="flex-1">
              <Text className="text-blue-800 font-medium mb-1">
                Thông tin quan trọng
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                • Khóa học của bạn sẽ có hiệu lực ngay lập tức{'\n'}
                • Bạn có thể truy cập khóa học mọi lúc mọi nơi{'\n'}
                • Hóa đơn sẽ được gửi qua email trong vòng 24 giờ
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
