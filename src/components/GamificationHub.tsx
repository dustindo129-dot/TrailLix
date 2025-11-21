import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../hooks/useLanguage';

interface GamificationHubProps {
  xp: number;
  level: number;
  rank: string;
  onClose: () => void;
}

export const GamificationHub: React.FC<GamificationHubProps> = ({
  xp,
  level,
  rank,
  onClose
}) => {
  const { t } = useLanguage();
  // Calculate progress to next level using the same formula
  const getLevelFromXp = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;
  const getXpForLevel = (level: number) => Math.pow(level - 1, 2) * 100;
  
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const progressXp = xp - currentLevelXp;
  const neededXp = nextLevelXp - currentLevelXp;
  const progressPercentage = (progressXp / neededXp) * 100;

  return (
    <View className="bg-white rounded-xl p-6 shadow-sm m-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-bold text-gray-900">{t('gamification.yourProgress')}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Level & Rank Display */}
      <View className="items-center mb-6">
        <View className="w-20 h-20 bg-primary-red rounded-full items-center justify-center mb-3">
          <Text className="text-white font-bold text-2xl">{level}</Text>
        </View>
        <Text className="text-lg font-semibold text-gray-900">{t('gamification.level')} {level}</Text>
        <Text className="text-primary-red font-medium">{rank}</Text>
      </View>

      {/* XP Progress */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-medium text-gray-700">{t('gamification.experiencePoints')}</Text>
          <Text className="text-sm font-bold text-primary-red">
            {xp.toLocaleString()} XP
          </Text>
        </View>
        
        <View className="bg-gray-200 rounded-full h-3 mb-2">
          <View 
            className="bg-primary-red rounded-full h-3"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </View>
        
        <Text className="text-xs text-gray-500 text-center">
          {progressXp} / {neededXp} {t('gamification.xpToNext')} {level + 1}
        </Text>
      </View>

      {/* Stats Grid */}
      <View className="flex-row justify-between">
        <View className="items-center flex-1">
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="trophy" size={20} color="#3B82F6" />
          </View>
          <Text className="text-xs text-gray-500">{t('gamification.lessons')}</Text>
          <Text className="text-sm font-bold text-gray-900">{t('gamification.comingSoon')}</Text>
        </View>
        
        <View className="items-center flex-1">
          <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="flame" size={20} color="#22C55E" />
          </View>
          <Text className="text-xs text-gray-500">{t('gamification.streak')}</Text>
          <Text className="text-sm font-bold text-gray-900">{t('gamification.comingSoon')}</Text>
        </View>
        
        <View className="items-center flex-1">
          <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="star" size={20} color="#8B5CF6" />
          </View>
          <Text className="text-xs text-gray-500">{t('gamification.achievements')}</Text>
          <Text className="text-sm font-bold text-gray-900">{t('gamification.comingSoon')}</Text>
        </View>
      </View>
    </View>
  );
};
