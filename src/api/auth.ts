import { apiClient } from './client';
import { User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from '../types';

interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post('/auth/logout', { refresh_token: refreshToken });
  },

  refreshToken: async (refreshToken: string): Promise<{ tokens: AuthTokens }> => {
    const response = await apiClient.post<ApiResponse<{ tokens: AuthTokens }>>(
      '/auth/refresh',
      { refresh_token: refreshToken }
    );
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await apiClient.post('/auth/change-password', data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: {
    token: string;
    password: string;
  }): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },
};
