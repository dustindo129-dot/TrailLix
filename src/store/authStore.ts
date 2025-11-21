import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/client';
import type { UserProfile } from '../components/RoleSelector';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

interface User {
  id: string;
  email: string;
  name: string;
  hasCompletedProfile: boolean;
  hasCompletedConcepts: boolean;
  profile?: UserProfile;
  // Gamification fields from backend
  xp?: number;
  level?: number;
  streak?: number;
  longestStreak?: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompletedProfile: boolean;
  hasCompletedConcepts: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completeProfile: (profile: UserProfile) => Promise<void>;
  completeConcepts: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
  hasCompletedProfile: false,
  hasCompletedConcepts: false,

  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: !!user,
      hasCompletedProfile: user?.hasCompletedProfile || false,
      hasCompletedConcepts: user?.hasCompletedConcepts || false,
    });
  },

  setTokens: async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      apiClient.setAuthToken(accessToken);
      set({ accessToken });
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || 'Login failed' 
        };
      }

      const responseData = await response.json();
      
      // Backend wraps response in { success: true, data: {...} }
      const data = responseData.data || responseData;
      
      // Extract tokens and user data
      const { tokens, user: userData } = data;
      const accessToken = tokens?.access_token || tokens?.accessToken;
      const refreshToken = tokens?.refresh_token || tokens?.refreshToken;
      
      // Check if profile is complete (has name and other fields)
      const hasCompletedProfile = !!(
        userData.name && 
        userData.age_range && 
        userData.role_description &&
        userData.ai_experience
      );
      
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        hasCompletedProfile,
        hasCompletedConcepts: userData.has_completed_concepts || false,
        profile: hasCompletedProfile ? {
          name: userData.name,
          ageRange: userData.age_range,
          role: userData.role_description,
          aiExperience: userData.ai_experience,
          skills: userData.skills || [],
          achievement: userData.achievement || '',
          fields: userData.fields || [],
          motivations: userData.motivations || [],
        } : undefined,
        xp: userData.xp,
        level: userData.level,
        streak: userData.streak,
        longestStreak: userData.longest_streak,
      };
      
      await get().setTokens(accessToken, refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, hasCompletedProfile, hasCompletedConcepts: user.hasCompletedConcepts });
      
      // Update streak on login
      try {
        await fetch(`${API_URL}/gamification/update-streak`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        console.log('Failed to update streak:', error);
        // Non-critical, don't block login
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Network error. Please check your connection.' 
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name,
          email, 
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || 'Registration failed' 
        };
      }

      const responseData = await response.json();
      
      // Backend wraps response in { success: true, data: {...} }
      const data = responseData.data || responseData;
      
      // Extract tokens and user data
      const { tokens, user: userData } = data;
      const accessToken = tokens?.access_token || tokens?.accessToken;
      const refreshToken = tokens?.refresh_token || tokens?.refreshToken;
      
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        hasCompletedProfile: false, // New users always need to complete profile
        hasCompletedConcepts: false, // New users always need to complete concepts
        xp: userData.xp || 0,
        level: userData.level || 1,
        streak: userData.streak || 0,
        longestStreak: userData.longest_streak || 0,
      };
      
      await get().setTokens(accessToken, refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, hasCompletedProfile: false, hasCompletedConcepts: false });
      
      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Network error. Please check your connection.' 
      };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
      apiClient.removeAuthToken();
      set({ user: null, accessToken: null, isAuthenticated: false, hasCompletedProfile: false, hasCompletedConcepts: false });
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  },

  completeProfile: async (profile) => {
    const { user, accessToken } = get();
    if (!user || !accessToken) return;

    try {
      // Send profile data to backend
      // Map frontend UserProfile to backend user fields
      const profileData = {
        name: profile.name,
        age_range: profile.ageRange,
        role_description: profile.role,
        ai_experience: profile.aiExperience,
        skills: profile.skills,
        achievement: profile.achievement,
        fields: profile.fields,
        motivations: profile.motivations,
        course_start_date: new Date().toISOString(),
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

      const updatedUser: User = { 
        ...user, 
        hasCompletedProfile: true, 
        profile,
        name: profile.name,
        xp: updatedUserData.xp || 0,
        level: updatedUserData.level || 1,
        streak: updatedUserData.streak || 0,
        longestStreak: updatedUserData.longest_streak || 0,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser, hasCompletedProfile: true });
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw error;
    }
  },

  completeConcepts: async () => {
    const { user, accessToken } = get();
    if (!user || !accessToken) return;

    try {
      // Update concepts completion on backend
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          has_seen_concepts_intro: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update concepts completion');
      }

      const updatedUser: User = { 
        ...user, 
        hasCompletedConcepts: true,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser, hasCompletedConcepts: true });
    } catch (error) {
      console.error('Failed to save concepts completion:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const [accessToken, userData] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('user'),
      ]);

      if (accessToken && userData) {
        const user: User = JSON.parse(userData);
        
        // Set auth token on API client
        apiClient.setAuthToken(accessToken);
        
        set({ 
          user, 
          accessToken, 
          isAuthenticated: true, 
          hasCompletedProfile: user.hasCompletedProfile,
          hasCompletedConcepts: user.hasCompletedConcepts || false,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
      set({ isLoading: false });
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        // If refresh fails, logout user
        await get().logout();
        return false;
      }

      const responseData = await response.json();
      const data = responseData.data || responseData;
      const { tokens } = data;
      
      const newAccessToken = tokens?.access_token || tokens?.accessToken;
      const newRefreshToken = tokens?.refresh_token || tokens?.refreshToken;
      
      if (newAccessToken) {
        await get().setTokens(newAccessToken, newRefreshToken || refreshToken);
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  },
}));

// Initialize auth check on app start
useAuthStore.getState().checkAuth();
