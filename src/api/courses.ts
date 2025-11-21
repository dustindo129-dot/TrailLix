import { apiClient } from './client';
import { Course, Lesson, Enrollment, PaginatedResponse, ApiResponse } from '../types';

export const coursesAPI = {
  // Get all courses with pagination and filters
  getCourses: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: 'title' | 'created_at' | 'price_cents_asc' | 'price_cents_desc' | 'updated_at';
  }): Promise<PaginatedResponse<Course>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.sort) searchParams.append('sort', params.sort);

    const response = await apiClient.get<PaginatedResponse<Course>>(
      `/courses?${searchParams.toString()}`
    );
    return response;
  },

  // Get course by ID
  getCourse: async (id: string): Promise<Course> => {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data;
  },

  // Get course lessons
  getCourseLessons: async (courseId: string): Promise<Lesson[]> => {
    const response = await apiClient.get<ApiResponse<Lesson[]>>(
      `/courses/${courseId}/lessons`
    );
    return response.data;
  },

  // Get lesson by ID
  getLesson: async (lessonId: string): Promise<Lesson> => {
    const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${lessonId}`);
    return response.data;
  },

  // Enroll in course
  enrollCourse: async (courseId: string): Promise<Enrollment> => {
    const response = await apiClient.post<ApiResponse<Enrollment>>(
      `/courses/${courseId}/enroll`
    );
    return response.data;
  },

  // Get user enrollments
  getEnrollments: async (): Promise<Enrollment[]> => {
    const response = await apiClient.get<ApiResponse<Enrollment[]>>('/enrollments');
    return response.data;
  },

  // Update lesson progress
  updateLessonProgress: async (
    lessonId: string,
    progress: { completed?: boolean; last_watched_s?: number }
  ): Promise<void> => {
    await apiClient.post(`/lessons/${lessonId}/progress`, progress);
  },

  // Get course progress
  getCourseProgress: async (courseId: string) => {
    const response = await apiClient.get<ApiResponse<{
      total_lessons: number;
      completed_lessons: number;
      progress_percentage: number;
      lessons: Array<{
        lesson_id: string;
        completed: boolean;
        last_watched_s: number;
      }>;
    }>>(`/courses/${courseId}/progress`);
    return response.data;
  },

  // Get featured courses
  getFeaturedCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses/featured');
    return response.data;
  },

  // Get popular courses
  getPopularCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses/popular');
    return response.data;
  },

  // Get user lesson progress
  getUserLessonProgress: async () => {
    const response = await apiClient.get('/lessons/user/all-progress');
    return response.data;
  },

  // Mark lesson as completed
  markLessonComplete: async (lessonId: number): Promise<void> => {
    await apiClient.post(`/lessons/${lessonId}/complete`);
  },
};
