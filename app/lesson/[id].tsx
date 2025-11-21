import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAuthStore } from '../../src/store/authStore';
import { coursesAPI } from '../../src/api/courses';
import { QUERY_KEYS } from '../../src/constants';

const { width } = Dimensions.get('window');
const videoHeight = (width * 9) / 16; // 16:9 aspect ratio

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<VideoView>(null);

  // Fetch lesson details
  const { data: lesson, isLoading, error } = useQuery({
    queryKey: [...QUERY_KEYS.LESSON_DETAIL, id],
    queryFn: () => coursesAPI.getLesson(id!),
    enabled: !!id && isAuthenticated,
  });

  const player = useVideoPlayer(lesson?.video_url || '', (player) => {
    player.loop = false;
    player.muted = false;
  });

  // Progress update mutation
  const progressMutation = useMutation({
    mutationFn: (progress: { completed?: boolean; last_watched_s?: number }) =>
      coursesAPI.updateLessonProgress(id!, progress),
  });

  // Auto-save progress every 10 seconds
  useEffect(() => {
    if (!isPlaying || currentTime === 0) return;

    const interval = setInterval(() => {
      progressMutation.mutate({
        last_watched_s: Math.floor(currentTime),
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [currentTime, isPlaying]);

  // Mark as completed when video ends
  const handleVideoEnd = () => {
    progressMutation.mutate({
      completed: true,
      last_watched_s: Math.floor(currentTime),
    });
  };

  // Monitor video player status
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      setCurrentTime(player.currentTime);
      setIsPlaying(player.playing);
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const handleClose = () => {
    if (currentTime > 0) {
      progressMutation.mutate({
        last_watched_s: Math.floor(currentTime),
      });
    }
    router.back();
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Đang tải bài học...</Text>
      </SafeAreaView>
    );
  }

  if (error || !lesson) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-xl font-semibold text-white mt-4 mb-2">
          Không thể tải bài học
        </Text>
        <Text className="text-gray-300 text-center mb-6">
          Vui lòng kiểm tra kết nối mạng và thử lại.
        </Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3"
          onPress={handleClose}
        >
          <Text className="text-white font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center px-6">
        <Ionicons name="lock-closed-outline" size={64} color="#ef4444" />
        <Text className="text-xl font-semibold text-white mt-4 mb-2">
          Yêu cầu đăng nhập
        </Text>
        <Text className="text-gray-300 text-center mb-6">
          Bạn cần đăng nhập để xem bài học này.
        </Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3"
          onPress={() => router.push('/auth/login')}
        >
          <Text className="text-white font-semibold">Đăng nhập</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity
          onPress={handleClose}
          className="p-2"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-white font-medium text-center mx-4" numberOfLines={1}>
          {lesson.title}
        </Text>
        
        <TouchableOpacity className="p-2">
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Video Player */}
      <View className="flex-1 justify-center">
        {lesson.video_url ? (
          <VideoView
            ref={videoRef}
            style={{ width, height: videoHeight }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : (
          <View 
            style={{ width, height: videoHeight }} 
            className="bg-gray-800 justify-center items-center"
          >
            <Ionicons name="play-circle-outline" size={80} color="#6b7280" />
            <Text className="text-gray-400 mt-4">Nội dung video đang được cập nhật</Text>
          </View>
        )}
      </View>

      {/* Lesson Info */}
      <View className="px-4 py-4">
        <Text className="text-white text-lg font-semibold mb-2">
          {lesson.title}
        </Text>
        {lesson.description && (
          <Text className="text-gray-300 text-sm leading-5">
            {lesson.description}
          </Text>
        )}
        
        {/* Progress Info */}
        <View className="flex-row items-center mt-4">
          {lesson.duration_minutes && (
            <View className="flex-row items-center mr-6">
              <Ionicons name="time-outline" size={16} color="#9ca3af" />
              <Text className="text-gray-400 ml-1 text-sm">
                {lesson.duration_minutes} phút
              </Text>
            </View>
          )}
          
          {currentTime > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="play-outline" size={16} color="#9ca3af" />
              <Text className="text-gray-400 ml-1 text-sm">
                Đã xem {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Control Overlay */}
      {!lesson.video_url && (
        <TouchableOpacity 
          className="absolute inset-0 justify-center items-center"
          onPress={togglePlayPause}
        >
          <View className="bg-black/50 rounded-full p-4">
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={48} 
              color="white" 
            />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
