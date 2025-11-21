import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../src/store/authStore';
import { coursesAPI } from '../../src/api/courses';
import { QUERY_KEYS } from '../../src/constants';
import { formatCurrency } from '../../src/utils';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

  // Fetch course details
  const { data: course, isLoading, error } = useQuery({
    queryKey: [...QUERY_KEYS.COURSE_DETAIL, id],
    queryFn: () => coursesAPI.getCourse(id!),
    enabled: !!id,
  });

  // Fetch course lessons
  const { data: lessons = [] } = useQuery({
    queryKey: [...QUERY_KEYS.COURSE_LESSONS, id],
    queryFn: () => coursesAPI.getCourseLessons(id!),
    enabled: !!id,
  });

  // Enroll mutation
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => coursesAPI.enrollCourse(courseId),
    onSuccess: () => {
      Alert.alert('Thành công', 'Đăng ký khóa học thành công!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ENROLLMENTS });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.COURSE_DETAIL, id] });
    },
    onError: () => {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký khóa học');
    },
  });

  const handleEnroll = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Yêu cầu đăng nhập',
        'Bạn cần đăng nhập để đăng ký khóa học',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đăng nhập', onPress: () => router.push('/auth/login') },
        ]
      );
      return;
    }

    if (course?.price_cents && course.price_cents > 0) {
      router.push({
        pathname: '/payment/checkout',
        params: { courseId: id },
      });
    } else {
      enrollMutation.mutate(id!);
    }
  };

  const handleLessonPress = (lessonId: string) => {
    router.push({
      pathname: '/lesson/[id]',
      params: { id: lessonId },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Đang tải...</Text>
      </SafeAreaView>
    );
  }

  if (error || !course) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2">
          Không tìm thấy khóa học
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Khóa học này có thể đã bị xóa hoặc không tồn tại.
        </Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isEnrolled = course.is_enrolled;
  const isFree = !course.price_cents || course.price_cents === 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Course Thumbnail */}
        {course.thumbnail_url && (
          <Image
            source={{ uri: course.thumbnail_url }}
            className="w-full h-48"
            resizeMode="cover"
          />
        )}

        <View className="px-6 py-6">
          {/* Course Info */}
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {course.title}
          </Text>
          
          <Text className="text-gray-600 text-base mb-4 leading-6">
            {course.description}
          </Text>

          {/* Course Stats */}
          <View className="flex-row items-center mb-6">
            <View className="flex-row items-center mr-6">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="text-gray-700 ml-1">
                {course.rating || '5.0'}
              </Text>
            </View>
            <View className="flex-row items-center mr-6">
              <Ionicons name="people" size={16} color="#6b7280" />
              <Text className="text-gray-700 ml-1">
                {course.enrolled_count || 0} học viên
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time" size={16} color="#6b7280" />
              <Text className="text-gray-700 ml-1">
                {lessons.length} bài học
              </Text>
            </View>
          </View>

          {/* Price */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-3xl font-bold text-blue-600">
              {isFree ? 'Miễn phí' : formatCurrency(course.price_cents)}
            </Text>
            {!isFree && course.original_price_cents && (
              <Text className="text-gray-500 line-through">
                {formatCurrency(course.original_price_cents)}
              </Text>
            )}
          </View>

          {/* Enroll Button */}
          <TouchableOpacity
            className={`rounded-lg py-4 mb-6 ${
              isEnrolled 
                ? 'bg-green-600' 
                : enrollMutation.isPending 
                ? 'bg-gray-400' 
                : 'bg-blue-600'
            }`}
            onPress={handleEnroll}
            disabled={isEnrolled || enrollMutation.isPending}
          >
            <Text className="text-white text-center font-semibold text-base">
              {isEnrolled 
                ? 'Đã đăng ký ✓' 
                : enrollMutation.isPending
                ? 'Đang xử lý...'
                : isFree 
                ? 'Học miễn phí' 
                : 'Mua khóa học'
              }
            </Text>
          </TouchableOpacity>

          {/* Course Content */}
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Nội dung khóa học
            </Text>
            
            {lessons.length > 0 ? (
              <View className="space-y-3">
                {lessons.map((lesson, index) => (
                  <TouchableOpacity
                    key={lesson.id}
                    className="bg-gray-50 rounded-lg p-4 flex-row items-center"
                    onPress={() => handleLessonPress(lesson.id)}
                    disabled={!isEnrolled && !isFree}
                  >
                    <View className="bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3">
                      <Text className="text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-gray-900 mb-1">
                        {lesson.title}
                      </Text>
                      {lesson.description && (
                        <Text className="text-sm text-gray-600" numberOfLines={2}>
                          {lesson.description}
                        </Text>
                      )}
                    </View>
                    {lesson.duration_minutes && (
                      <Text className="text-sm text-gray-500">
                        {lesson.duration_minutes} phút
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="bg-gray-50 rounded-lg p-6 items-center">
                <Ionicons name="document-outline" size={48} color="#6b7280" />
                <Text className="text-gray-600 mt-2">
                  Nội dung khóa học đang được cập nhật
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
