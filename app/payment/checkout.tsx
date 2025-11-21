import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../src/store/authStore';
import { coursesAPI } from '../../src/api/courses';
import { QUERY_KEYS } from '../../src/constants';
import { formatCurrency } from '../../src/utils';

export default function CheckoutScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');

  // Fetch course details
  const { data: course, isLoading } = useQuery({
    queryKey: [...QUERY_KEYS.COURSE_DETAIL, courseId],
    queryFn: () => coursesAPI.getCourse(courseId!),
    enabled: !!courseId,
  });

  // Payment processing mutation
  const paymentMutation = useMutation({
    mutationFn: async () => {
      // This would normally call your payment API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      return { success: true, orderId: 'order_' + Date.now() };
    },
    onSuccess: (data) => {
      router.push({
        pathname: '/payment/success',
        params: { 
          courseId,
          orderId: data.orderId,
        },
      });
    },
    onError: () => {
      Alert.alert('Lỗi thanh toán', 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
    },
  });

  const paymentMethods = [
    {
      id: 'momo',
      name: 'MoMo',
      icon: '💰',
      description: 'Thanh toán qua ví điện tử MoMo',
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: '💳',
      description: 'Thanh toán qua ví điện tử ZaloPay',
    },
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      icon: '🏦',
      description: 'Chuyển khoản qua Internet Banking',
    },
    {
      id: 'visa',
      name: 'Thẻ tín dụng/ghi nợ',
      icon: '💎',
      description: 'Visa, MasterCard, JCB',
    },
  ];

  const handlePayment = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Yêu cầu đăng nhập',
        'Bạn cần đăng nhập để thanh toán',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đăng nhập', onPress: () => router.push('/auth/login') },
        ]
      );
      return;
    }

    Alert.alert(
      'Xác nhận thanh toán',
      `Bạn có chắc muốn thanh toán ${formatCurrency(course?.price_cents || 0)} cho khóa học "${course?.title}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Thanh toán', onPress: () => paymentMutation.mutate() },
      ]
    );
  };

  if (isLoading || !course) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-gray-600 mt-4">Đang tải thông tin khóa học...</Text>
      </SafeAreaView>
    );
  }

  const finalPrice = course.price_cents || 0;
  const discount = course.original_price_cents ? course.original_price_cents - finalPrice : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Course Info */}
        <View className="bg-gray-50 p-4 m-4 rounded-lg">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Thông tin khóa học
          </Text>
          
          <View className="flex-row">
            {course.thumbnail_url && (
              <Image
                source={{ uri: course.thumbnail_url }}
                className="w-20 h-20 rounded-lg mr-3"
                resizeMode="cover"
              />
            )}
            <View className="flex-1">
              <Text className="font-semibold text-gray-900 mb-1" numberOfLines={2}>
                {course.title}
              </Text>
              <Text className="text-sm text-gray-600" numberOfLines={2}>
                {course.description}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Phương thức thanh toán
          </Text>
          
          <View className="space-y-3">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`border-2 rounded-lg p-4 flex-row items-center ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <Text className="text-2xl mr-3">{method.icon}</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">
                    {method.name}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {method.description}
                  </Text>
                </View>
                <View className={`w-6 h-6 rounded-full border-2 ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedPaymentMethod === method.id && (
                    <Ionicons name="checkmark" size={14} color="white" className="self-center mt-1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View className="bg-gray-50 mx-4 p-4 rounded-lg mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Tổng kết đơn hàng
          </Text>
          
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Giá khóa học:</Text>
              <Text className="text-gray-900 font-medium">
                {formatCurrency(course.original_price_cents || finalPrice)}
              </Text>
            </View>
            
            {discount > 0 && (
              <View className="flex-row justify-between">
                <Text className="text-green-600">Giảm giá:</Text>
                <Text className="text-green-600 font-medium">
                  -{formatCurrency(discount)}
                </Text>
              </View>
            )}
            
            <View className="border-t border-gray-200 pt-2 mt-3">
              <View className="flex-row justify-between">
                <Text className="text-lg font-bold text-gray-900">Tổng cộng:</Text>
                <Text className="text-lg font-bold text-blue-600">
                  {formatCurrency(finalPrice)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Info */}
        {user && (
          <View className="px-4 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Thông tin người mua
            </Text>
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-gray-900 font-medium">{user.name}</Text>
              <Text className="text-gray-600">{user.email}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Payment Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className={`rounded-lg py-4 ${
            paymentMutation.isPending ? 'bg-gray-400' : 'bg-blue-600'
          }`}
          onPress={handlePayment}
          disabled={paymentMutation.isPending}
        >
          {paymentMutation.isPending ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="white" />
              <Text className="text-white font-semibold ml-2">
                Đang xử lý thanh toán...
              </Text>
            </View>
          ) : (
            <Text className="text-white text-center font-semibold text-base">
              Thanh toán {formatCurrency(finalPrice)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
