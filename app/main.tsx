import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, Dimensions, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { useLanguage } from '../src/hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';
import { lessons } from '../src/data/lessons';
import ProfileSettings from '../src/components/ProfileSettings';
import { GamificationHub } from '../src/components/GamificationHub';
import PlaygroundView from '../src/components/PlaygroundView';
import { coursesAPI } from '../src/api/courses';

type ViewType = 'LESSON' | 'PROFILE' | 'PLAYGROUND' | 'SETTINGS';
type LessonStage = 'what' | 'why' | 'formula' | 'comparison' | 'basicPractice' | 'personalizedPractice' | 'completed';

export default function MainScreen() {
  const router = useRouter();
  const { user, accessToken, logout, refreshToken, isLoading } = useAuthStore();
  
  // Debug user and token state (minimal)
  // console.log('MainScreen - User:', user ? 'Present' : 'Missing');
  const { t, locale, setLocale } = useLanguage();
  
  // Ensure authentication state is properly initialized
  useEffect(() => {
    const initializeAuth = async () => {
      if (!user || !accessToken) {
        const authState = useAuthStore.getState();
        if (!authState.isAuthenticated) {
          console.warn('MainScreen: User not authenticated, redirecting to login');
          router.replace('/');
          return;
        }
      }
    };
    
    initializeAuth();
  }, [user, accessToken, router]);

  // XP queueing system (declared early since useEffect depends on them)
  const [xpQueue, setXpQueue] = useState<Array<{ amount: number; eventKey: string; timestamp: number }>>([]);
  const [awardedEvents, setAwardedEvents] = useState<Set<string>>(new Set());
  const [isProcessingXp, setIsProcessingXp] = useState(false);

  // Load lesson progress on component mount
  useEffect(() => {
    const loadLessonProgress = async () => {
      // Wait for authentication to be fully established
      if (!user || !accessToken || isLoading) {
        return;
      }
      
      try {
        const progressData = await coursesAPI.getUserLessonProgress();
        const completedIds = new Set<number>();
        const stageMap = new Map<number, LessonStage>();
        
        if (progressData && Array.isArray(progressData)) {
          progressData.forEach((progress: any) => {
            if (progress.completed) {
              completedIds.add(progress.lesson_id);
              stageMap.set(progress.lesson_id, 'completed');
            }
            // If lesson has progress but isn't completed, we could restore the stage here
            // For now, we'll let incomplete lessons start from 'what' stage
          });
        }
        
        setCompletedLessonIds(completedIds);
        setLessonStages(stageMap);
      } catch (error) {
        console.error('Failed to load lesson progress:', error);
        // Fallback to starting with lesson 1 unlocked if loading fails
        setCompletedLessonIds(new Set([1]));
      }
    };
    
    loadLessonProgress();
  }, [user, accessToken, isLoading]);

  // Background XP processing
  useEffect(() => {
    const processXpQueue = async () => {
      if (isProcessingXp || xpQueue.length === 0 || !user || !accessToken) {
        return;
      }
      
      setIsProcessingXp(true);
      
      try {
        // Process all queued XP awards
        const batchToProcess = [...xpQueue];
        setXpQueue([]); // Clear queue immediately
        
        for (const xpAward of batchToProcess) {
          try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/gamification/award-xp`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                amount: xpAward.amount,
                eventKey: xpAward.eventKey,
              }),
            });
            
            if (response.ok) {
              const result = await response.json();
              
              // Update with server values if they differ (handles race conditions)
              if (result.user && !result.alreadyAwarded) {
                setUserXp(result.user.xp);
                setUserLevel(result.user.level);
              }
            } else if (response.status === 401) {
              // Token expired, will retry on next queue processing
              console.warn('Token expired during XP sync, will retry');
              setXpQueue(prev => [...prev, xpAward]); // Re-queue
              break;
            } else {
              console.warn(`Failed to sync XP: ${response.status} for ${xpAward.eventKey}`);
              // Don't re-queue on other errors to avoid infinite loops
            }
          } catch (error) {
            console.warn(`Network error syncing XP for ${xpAward.eventKey}:`, error);
            // Re-queue on network errors for retry
            setXpQueue(prev => [...prev, xpAward]);
          }
          
          // Small delay between requests to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } finally {
        setIsProcessingXp(false);
      }
    };
    
    // Process queue every 2 seconds
    const interval = setInterval(processXpQueue, 2000);
    return () => clearInterval(interval);
  }, [xpQueue, isProcessingXp, user, accessToken]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('LESSON');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLessonStage, setCurrentLessonStage] = useState<LessonStage>('what');
  
  // Dynamic progress tracking
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<number>>(new Set());
  const [lessonStages, setLessonStages] = useState<Map<number, LessonStage>>(new Map());
  const [userXp, setUserXp] = useState(user?.xp || 0);
  const [userLevel, setUserLevel] = useState(user?.level || 1);
  
  // XP UI state
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; rank: string } | null>(null);
  const [showGamificationHub, setShowGamificationHub] = useState(false);
  
  // Basic Practice states
  const [basicUserPrompt, setBasicUserPrompt] = useState('');
  const [basicEvaluation, setBasicEvaluation] = useState<any>(null);
  const [isBasicEvaluating, setIsBasicEvaluating] = useState(false);
  
  // Personalized Practice states
  const [personalizedUserPrompt, setPersonalizedUserPrompt] = useState('');
  const [personalizedEvaluation, setPersonalizedEvaluation] = useState<any>(null);
  const [isPersonalizedEvaluating, setIsPersonalizedEvaluating] = useState(false);
  
  // UI states
  const [showFullExample, setShowFullExample] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Sidebar animation
  const slideAnim = useRef(new Animated.Value(-320)).current;

  // Get the current lesson content
  const currentLesson = lessons[currentLessonIndex];
  const lessonContent = currentLesson.content[locale as 'en' | 'vi'];

  // Group lessons by category like in App.tsx
  const groupedLessons = useMemo(() => {
    const groups: { [key: string]: typeof lessons } = {};
    lessons.forEach(lesson => {
      const categoryTitle = lesson.content[locale as 'en' | 'vi'].category;
      if (!groups[categoryTitle]) groups[categoryTitle] = [];
      groups[categoryTitle].push(lesson);
    });
    return Object.entries(groups);
  }, [locale]);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  // Sidebar animation effects
  useEffect(() => {
    if (isSidebarOpen) {
      // Reset to starting position before animating in
      slideAnim.setValue(-320);
      // Small delay to ensure modal is mounted
      setTimeout(() => {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }, 50);
    } else {
      // Animate out and reset when complete
      Animated.timing(slideAnim, {
        toValue: -320,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // Reset to initial position after animation completes
        slideAnim.setValue(-320);
      });
    }
  }, [isSidebarOpen]);

  // Level calculation (matches web version)
  const getLevelFromXp = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;
  
  // Rank system (matches web version)
  const getRank = (level: number): string => {
    if (level <= 5) return 'Novice';
    if (level <= 10) return 'Apprentice';
    if (level <= 15) return 'Journeyman';
    if (level <= 20) return 'Adept';
    if (level <= 25) return 'Pro';
    if (level <= 30) return 'Master';
    return 'Virtuoso';
  };

  // Fast XP awarding system with immediate UI updates
  const awardXp = (amount: number, eventKey: string) => {
    // Prevent duplicate awards
    if (awardedEvents.has(eventKey)) {
      return;
    }

    // Mark as awarded immediately to prevent duplicates
    setAwardedEvents(prev => new Set([...prev, eventKey]));
    
    // Update UI immediately for responsive feel
    const newXp = userXp + amount;
    const newLevel = getLevelFromXp(newXp);
    const leveledUp = newLevel > userLevel;
    
    setUserXp(newXp);
    
    if (leveledUp) {
      setUserLevel(newLevel);
      const newRank = getRank(newLevel);
      setLevelUpInfo({ level: newLevel, rank: newRank });
      }
      
    // Queue for background processing
    setXpQueue(prev => [...prev, { amount, eventKey, timestamp: Date.now() }]);
  };

  // Lesson completion system
  const handleLessonComplete = async (lessonId: number) => {
    // Update local state immediately for responsive UI
    setCompletedLessonIds(prev => new Set([...prev, lessonId]));
    setCurrentLessonStage('completed');
    setLessonStages(prev => new Map(prev).set(lessonId, 'completed'));
    
    // Award completion XP with unique key
    awardXp(100, `lesson_complete_${lessonId}`);
    
    // Persist to backend
    try {
      await coursesAPI.markLessonComplete(lessonId);
    } catch (error) {
      console.error(`Failed to save lesson ${lessonId} completion:`, error);
      // Could show a toast notification here if desired
    }
  };

  const handleLessonClick = (lessonIndex: number) => {
    const lesson = lessons[lessonIndex];
    const isUnlocked = lessonIndex === 0 || completedLessonIds.has(lessons[lessonIndex - 1].id);
    if (isUnlocked) {
      setCurrentLessonIndex(lessonIndex);
      setCurrentView('LESSON');
      setIsSidebarOpen(false);
      
      // Restore lesson stage or default to appropriate starting stage
      const isCompleted = completedLessonIds.has(lesson.id);
      const savedStage = lessonStages.get(lesson.id);
      setCurrentLessonStage(savedStage || (isCompleted ? 'completed' : 'what'));
      setBasicUserPrompt('');
      setBasicEvaluation(null);
      setPersonalizedUserPrompt('');
      setPersonalizedEvaluation(null);
      setShowFullExample(false);
    }
  };

  // Stage navigation
  const handleStageNavigation = (direction: 'next' | 'prev') => {
    setIsAnimating(true);
    const stages: LessonStage[] = ['what', 'why', 'formula', 'comparison', 'basicPractice', 'personalizedPractice'];
    const currentIndex = stages.indexOf(currentLessonStage);
    
    setTimeout(() => {
      if (direction === 'next' && currentIndex < stages.length - 1) {
        const nextStage = stages[currentIndex + 1];
        setCurrentLessonStage(nextStage);
        setLessonStages(prev => new Map(prev).set(currentLesson.id, nextStage));
        // Award stage progression XP with unique key (only forward progress)
        const stageKey = `stage_${currentLesson.id}_${nextStage}`;
        awardXp(10, stageKey);
      } else if (direction === 'prev' && currentIndex > 0) {
        const prevStage = stages[currentIndex - 1];
        setCurrentLessonStage(prevStage);
        setLessonStages(prev => new Map(prev).set(currentLesson.id, prevStage));
        // No XP for going backwards
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleAddComponent = (componentText: string, isPersonalized: boolean = false) => {
    const separator = (isPersonalized ? personalizedUserPrompt : basicUserPrompt).trim() === '' || 
                     (isPersonalized ? personalizedUserPrompt : basicUserPrompt).endsWith(' ') ? '' : ' ';
    
    if (isPersonalized) {
      setPersonalizedUserPrompt(prev => prev + separator + componentText);
    } else {
      setBasicUserPrompt(prev => prev + separator + componentText);
    }
  };

  // Basic Practice evaluation
  const handleBasicEvaluate = async () => {
    if (!basicUserPrompt.trim()) {
      Alert.alert('Error', 'Please write a prompt first');
      return;
    }
    
    setIsBasicEvaluating(true);
    
    // Simulate evaluation (replace with actual API call)
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      const isComplete = score >= 80; // 80+ score requirement
      
      const mockEvaluation = {
        score,
        feedback: isComplete 
          ? "Excellent! Your prompt is clear, specific, and follows the lesson's principles well." 
          : "Good attempt! Your prompt shows understanding, but could be more specific and detailed.",
        suggestion: isComplete 
          ? "Great work! You can now proceed to the personalized practice."
          : "Try adding more specific details and following the lesson formula more closely.",
        isComplete
      };
      
      setBasicEvaluation(mockEvaluation);
      
      // Award XP for submission and completion with unique keys
      const submissionKey = `basic_submit_${currentLesson.id}`;
      const passKey = `basic_pass_${currentLesson.id}`;
      
      if (!basicEvaluation) {
        awardXp(20, submissionKey); // Submission XP
      }
      if (isComplete && !basicEvaluation?.isComplete) {
        awardXp(50, passKey); // Pass XP
        // First try bonus if no previous attempts
        if (!basicEvaluation) {
          awardXp(25, `basic_first_try_${currentLesson.id}`);
        }
      }
      
      setIsBasicEvaluating(false);
    }, 2000);
  };

  // Personalized Practice evaluation  
  const handlePersonalizedEvaluate = async () => {
    if (!personalizedUserPrompt.trim()) {
      Alert.alert('Error', 'Please write a prompt first');
      return;
    }
    
    setIsPersonalizedEvaluating(true);
    
    // Simulate evaluation (replace with actual API call)
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100  
      const isComplete = score >= 80; // 80+ score requirement
      
      const mockEvaluation = {
        score,
        feedback: isComplete
          ? "Outstanding! You've mastered this lesson's technique and can apply it effectively."
          : "Good progress! Your prompt shows understanding but needs refinement to meet the completion criteria.",
        suggestion: isComplete
          ? "Perfect application of the lesson principles. You're ready for the next lesson!"
          : "Focus on applying the lesson formula more precisely and adding specific context.",
        isComplete
      };
      
      setPersonalizedEvaluation(mockEvaluation);
      
      // Award XP for submission and completion with unique keys
      const submissionKey = `personalized_submit_${currentLesson.id}`;
      const passKey = `personalized_pass_${currentLesson.id}`;
      
      if (!personalizedEvaluation) {
        awardXp(20, submissionKey); // Submission XP
      }
      if (isComplete && !personalizedEvaluation?.isComplete) {
        awardXp(50, passKey); // Pass XP
        // First try bonus if no previous attempts
        if (!personalizedEvaluation) {
          awardXp(25, `personalized_first_try_${currentLesson.id}`);
        }
        // Complete the lesson
        handleLessonComplete(currentLesson.id);
      }
      
      setIsPersonalizedEvaluating(false);
    }, 2000);
  };

  const handleRetry = (isPersonalized: boolean = false) => {
    if (isPersonalized) {
      setPersonalizedEvaluation(null);
    } else {
      setBasicEvaluation(null);
    }
  };

  const renderLessonView = () => (
    <View className="flex-1">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="p-4">
            {/* Lesson Header */}
            <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 rounded-full bg-primary-red items-center justify-center mr-3">
                  <Text className="text-white font-bold">{currentLesson.id}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 uppercase tracking-wide">
                    {lessonContent.category}
                  </Text>
                  <Text className="text-xl font-bold text-primary-black">
                    {lessonContent.title}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm text-gray-500">Level {userLevel}</Text>
                  <Text className="text-sm font-semibold text-primary-red">{userXp} XP</Text>
                </View>
              </View>
              
              {/* Stage Progress Indicator */}
              <View className="flex-row items-center space-x-2 mt-4">
                {['what', 'why', 'formula', 'comparison', 'basicPractice', 'personalizedPractice', 'completed'].map((stage, index) => (
                  <View key={stage} className={`flex-1 h-2 rounded-full ${
                    ['what', 'why', 'formula', 'comparison', 'basicPractice', 'personalizedPractice'].indexOf(currentLessonStage) >= index
                      ? 'bg-primary-red'
                      : 'bg-gray-200'
                  }`} />
                ))}
              </View>
            </View>

            {/* Stage Content */}
            <View className={`${isAnimating ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
              {renderLessonStageContent()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Navigation Footer - stays at bottom */}
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => handleStageNavigation('prev')}
            disabled={currentLessonStage === 'what' || currentLessonStage === 'completed'}
            className={`flex-row items-center px-4 py-2 rounded-lg ${
              currentLessonStage === 'what' || currentLessonStage === 'completed'
                ? 'bg-gray-100'
                : 'bg-gray-200'
            }`}
          >
            <Ionicons name="chevron-back" size={20} color={
              currentLessonStage === 'what' || currentLessonStage === 'completed' ? '#9CA3AF' : '#374151'
            } />
            <Text className={`ml-1 font-medium ${
              currentLessonStage === 'what' || currentLessonStage === 'completed' ? 'text-gray-400' : 'text-gray-700'
            }`}>
              Back
            </Text>
          </TouchableOpacity>

          {renderNavigationButton()}
        </View>
      </View>
    </View>
  );

  const renderLessonStageContent = () => {
    switch (currentLessonStage) {
      case 'what':
        return renderWhatStage();
      case 'why':
        return renderWhyStage();
      case 'formula':
        return renderFormulaStage();
      case 'comparison':
        return renderComparisonStage();
      case 'basicPractice':
        return renderBasicPracticeStage();
      case 'personalizedPractice':
        return renderPersonalizedPracticeStage();
      case 'completed':
        return renderCompletedStage();
      default:
        return renderWhatStage();
    }
  };

  const renderWhatStage = () => (
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-primary-black mb-3">
        What You'll Learn
          </Text>
          <Text className="text-gray-700 leading-6">
            {lessonContent.what}
          </Text>
        </View>
  );

  const renderWhyStage = () => (
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-primary-black mb-3">
        Why It Matters
          </Text>
          <Text className="text-gray-700 leading-6">
            {lessonContent.why}
          </Text>
        </View>
  );

  const renderFormulaStage = () => (
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-primary-black mb-3">
        The Formula
          </Text>
          <Text className="text-gray-700 leading-6">
            {lessonContent.formula}
          </Text>
        </View>
  );

  const renderComparisonStage = () => (
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-primary-black mb-4">
        Before vs After
          </Text>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-red-600 mb-2">
          Before
            </Text>
            <View className="bg-red-50 border border-red-200 rounded-lg p-3">
              <Text className="text-gray-700">
                "{lessonContent.comparison.before}"
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-green-600 mb-2">
          After
            </Text>
            <View className="bg-green-50 border border-green-200 rounded-lg p-3">
              <Text className="text-gray-700">
                "{lessonContent.comparison.after}"
              </Text>
            </View>
          </View>
        </View>
  );

  const renderBasicPracticeStage = () => (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="checkmark-circle-outline" size={24} color="#d90d03" />
        <Text className="text-lg font-semibold text-primary-black ml-2">
          {t('lesson.simplePracticeTitle')}
        </Text>
      </View>

      {/* Context */}
      {lessonContent.simpleExample && (
        <>
          <View className="bg-red-50 border-l-4 border-primary-red rounded-r-lg p-4 mb-4">
            <Text className="text-gray-700 leading-6">
              {lessonContent.simpleExample.context}
            </Text>
          </View>

          {/* Components Builder */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-3">
              {t('lesson.buildYourPrompt')}
            </Text>
            {lessonContent.simpleExample.components.map((component, index) => (
              <View key={index} className="flex-row items-center justify-between bg-gray-50 rounded-lg p-3 mb-2">
                <View className="flex-1">
                  <Text className="text-xs font-bold uppercase text-primary-red tracking-wide mb-1">
                    {t(component.labelKey)}
                  </Text>
                  <Text className="text-gray-800 text-sm">
                    {component.text}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleAddComponent(component.text, false)}
                  className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center ml-3"
                >
                  <Ionicons name="add" size={20} color="#2563eb" />
                </TouchableOpacity>
              </View>
            ))}
        </View>

          {/* Full Example Toggle */}
          <TouchableOpacity
            onPress={() => setShowFullExample(!showFullExample)}
            className="mb-4"
          >
            <Text className="text-sm font-medium text-gray-600">
              {t('lesson.fullExamplePrompt')} {showFullExample ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

          {showFullExample && (
            <View className="bg-gray-100 rounded-lg p-3 mb-4">
              <Text className="text-gray-700 text-sm font-mono">
                {lessonContent.simpleExample.fullPrompt}
              </Text>
            </View>
          )}

          {/* User Prompt Input */}
          <Text className="text-sm font-medium text-gray-700 mb-2">
            {t('lesson.yourPrompt')}
          </Text>
          <TextInput
            value={basicUserPrompt}
            onChangeText={setBasicUserPrompt}
            placeholder={t('lesson.promptPlaceholder')}
            multiline
            numberOfLines={4}
            className="w-full bg-white border border-red-300 rounded-lg p-4 text-gray-900 font-mono text-sm"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
            editable={!basicEvaluation}
          />

          {/* Evaluation Results */}
          {basicEvaluation && (
            <View className="mt-4 bg-gray-50 rounded-lg p-4">
              <Text className="text-lg font-bold mb-3">{t('evaluation.title')}</Text>

              <View className="flex-row justify-between items-baseline mb-4">
                <Text className="text-gray-700 font-medium">{t('evaluation.score')}:</Text>
                <Text className={`text-2xl font-bold ${basicEvaluation.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {basicEvaluation.score}/100
                </Text>
      </View>

              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-700 font-medium">{t('evaluation.status')}:</Text>
                <View className={`px-3 py-1 rounded-full ${
                  basicEvaluation.isComplete ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Text className={`text-sm font-bold ${
                    basicEvaluation.isComplete ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {basicEvaluation.isComplete ? t('evaluation.complete') : t('evaluation.needsWork')}
          </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-1">{t('evaluation.feedback')}:</Text>
                <Text className="text-gray-600 leading-5">{basicEvaluation.feedback}</Text>
              </View>

              {basicEvaluation.suggestion && (
                <View className="mb-4">
                  <Text className="text-gray-700 font-medium mb-1">{t('evaluation.suggestion')}:</Text>
                  <View className="bg-gray-200 rounded-lg p-3">
                    <Text className="text-gray-700 text-sm font-mono leading-5">
                      {basicEvaluation.suggestion}
          </Text>
        </View>
      </View>
              )}
            </View>
          )}

          {/* Action Buttons */}
          {!basicEvaluation && (
            <TouchableOpacity
              onPress={handleBasicEvaluate}
              disabled={isBasicEvaluating || !basicUserPrompt.trim()}
              className={`mt-4 px-6 py-3 rounded-lg items-center ${
                isBasicEvaluating || !basicUserPrompt.trim()
                  ? 'bg-gray-400'
                  : 'bg-primary-red'
              }`}
            >
              <Text className="text-white font-semibold text-base">
                {isBasicEvaluating ? 'Evaluating...' : t('lesson.evaluatePrompt')}
              </Text>
            </TouchableOpacity>
          )}

          {basicEvaluation && !basicEvaluation.isComplete && (
            <TouchableOpacity
              onPress={() => handleRetry(false)}
              className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg items-center"
            >
              <Text className="text-white font-semibold">
                {t('lesson.retry')}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );

  const renderPersonalizedPracticeStage = () => (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="person-outline" size={24} color="#d90d03" />
        <Text className="text-lg font-semibold text-primary-black ml-2">
          Personalized Practice
        </Text>
      </View>

      {/* Personalized Context */}
      <View className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
        <Text className="text-gray-700 leading-6">
          Now apply this lesson to your own scenario. Use your profile ({user?.profile?.role || 'your role'}) 
          and create a prompt that would be useful in your work or interests.
        </Text>
      </View>

      {/* User Prompt Input */}
      <Text className="text-sm font-medium text-gray-700 mb-2">
        Your Personalized Prompt
      </Text>
      <TextInput
        value={personalizedUserPrompt}
        onChangeText={setPersonalizedUserPrompt}
        placeholder="Write a prompt that applies this lesson to your specific needs..."
        multiline
        numberOfLines={6}
        className="w-full bg-white border border-blue-300 rounded-lg p-4 text-gray-900 font-mono text-sm"
        style={{ minHeight: 120, textAlignVertical: 'top' }}
        editable={!personalizedEvaluation}
      />

      {/* Evaluation Results */}
      {personalizedEvaluation && (
        <View className="mt-4 bg-gray-50 rounded-lg p-4">
          <Text className="text-lg font-bold mb-3">{t('evaluation.title')}</Text>

          <View className="flex-row justify-between items-baseline mb-4">
            <Text className="text-gray-700 font-medium">{t('evaluation.score')}:</Text>
            <Text className={`text-2xl font-bold ${personalizedEvaluation.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
              {personalizedEvaluation.score}/100
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-700 font-medium">{t('evaluation.status')}:</Text>
            <View className={`px-3 py-1 rounded-full ${
              personalizedEvaluation.isComplete ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <Text className={`text-sm font-bold ${
                personalizedEvaluation.isComplete ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {personalizedEvaluation.isComplete ? t('evaluation.complete') : t('evaluation.needsWork')}
          </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">{t('evaluation.feedback')}:</Text>
            <Text className="text-gray-600 leading-5">{personalizedEvaluation.feedback}</Text>
          </View>

          {personalizedEvaluation.suggestion && (
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-1">{t('evaluation.suggestion')}:</Text>
              <View className="bg-gray-200 rounded-lg p-3">
                <Text className="text-gray-700 text-sm font-mono leading-5">
                  {personalizedEvaluation.suggestion}
          </Text>
        </View>
      </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      {!personalizedEvaluation && (
        <TouchableOpacity
          onPress={handlePersonalizedEvaluate}
          disabled={isPersonalizedEvaluating || !personalizedUserPrompt.trim()}
          className={`mt-4 px-6 py-3 rounded-lg items-center ${
            isPersonalizedEvaluating || !personalizedUserPrompt.trim()
              ? 'bg-gray-400'
              : 'bg-blue-600'
          }`}
        >
          <Text className="text-white font-semibold text-base">
            {isPersonalizedEvaluating ? 'Evaluating...' : t('lesson.evaluatePrompt')}
          </Text>
        </TouchableOpacity>
      )}

      {personalizedEvaluation && !personalizedEvaluation.isComplete && (
        <TouchableOpacity
          onPress={() => handleRetry(true)}
          className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg items-center"
        >
          <Text className="text-white font-semibold">
            {t('lesson.retry')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderCompletedStage = () => (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <View className="items-center py-8">
        <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
          <Ionicons name="checkmark" size={40} color="#22C55E" />
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Lesson Completed!
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Congratulations! You've mastered {lessonContent.title}
        </Text>
        
        <View className="bg-gray-50 rounded-lg p-4 w-full">
          <Text className="text-sm font-medium text-gray-700 mb-2">Progress Summary:</Text>
          <Text className="text-gray-600">• Learned the concept ✓</Text>
          <Text className="text-gray-600">• Practiced with examples ✓</Text>
          <Text className="text-gray-600">• Applied to personal scenario ✓</Text>
          <Text className="text-gray-600">• Earned up to 350 XP ✓</Text>
          <Text className="text-xs text-gray-500 mt-2">
            XP breakdown: Stage progression (60 XP) + Practice submissions (40 XP) + Pass bonuses (100 XP) + First try bonuses (50 XP) + Lesson completion (100 XP)
          </Text>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            const nextLessonIndex = currentLessonIndex + 1;
            if (nextLessonIndex < lessons.length) {
              setCurrentLessonIndex(nextLessonIndex);
              setCurrentLessonStage('what');
            }
          }}
          className="mt-6 bg-primary-red px-8 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold text-lg">
            Next Lesson →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNavigationButton = () => {
    switch (currentLessonStage) {
      case 'what':
      case 'why':  
      case 'formula':
      case 'comparison':
        return (
          <TouchableOpacity
            onPress={() => handleStageNavigation('next')}
            className="flex-row items-center px-4 py-2 rounded-lg bg-primary-red"
          >
            <Text className="mr-1 font-medium text-white">
              Continue
            </Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        );
        
      case 'basicPractice':
        return basicEvaluation?.isComplete ? (
          <TouchableOpacity
            onPress={() => handleStageNavigation('next')}
            className="flex-row items-center px-4 py-2 rounded-lg bg-green-600"
          >
            <Text className="mr-1 font-medium text-white">
              Personalized Practice
            </Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <Text className="text-gray-500 text-sm">
            Complete basic practice to continue
          </Text>
        );
        
      case 'personalizedPractice':
        return personalizedEvaluation?.isComplete ? (
          <View className="flex-row items-center px-4 py-2 rounded-lg bg-green-600">
            <Ionicons name="checkmark" size={20} color="white" />
            <Text className="ml-1 font-medium text-white">
              Lesson Complete!
            </Text>
          </View>
        ) : (
          <Text className="text-gray-500 text-sm">
            Complete personalized practice to finish
          </Text>
        );
        
      case 'completed':
        return (
          <TouchableOpacity
            onPress={() => {
              const nextLessonIndex = currentLessonIndex + 1;
              if (nextLessonIndex < lessons.length) {
                handleLessonClick(nextLessonIndex);
              }
            }}
            className="flex-row items-center px-4 py-2 rounded-lg bg-primary-red"
            disabled={currentLessonIndex >= lessons.length - 1}
          >
            <Text className="mr-1 font-medium text-white">
              Next Lesson
            </Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        );
        
      default:
        return null;
    }
  };

  const renderProfileView = () => (
    <ProfileSettings onBack={() => setCurrentView('LESSON')} />
  );

  const renderPlaygroundView = () => <PlaygroundView />;

  const renderSettingsView = () => (
    <ScrollView className="flex-1">
      <View className="p-4">
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-xl font-semibold text-primary-black mb-4">
            Settings
          </Text>
          <TouchableOpacity
            onPress={() => setLocale(locale === 'en' ? 'vi' : 'en')}
            className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg mb-4"
          >
            <Text className="text-gray-700 font-medium">Language</Text>
            <Text className="text-primary-red font-semibold">
              {locale === 'en' ? 'English' : 'Tiếng Việt'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 p-4 rounded-lg items-center"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'LESSON':
        return renderLessonView();
      case 'PROFILE':
        return renderProfileView();
      case 'PLAYGROUND':
        return renderPlaygroundView();
      case 'SETTINGS':
        return renderSettingsView();
      default:
        return renderLessonView();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setIsSidebarOpen(true)}
            className="p-2"
          >
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-primary-black">
            TRAILIX
          </Text>

          {/* XP Display */}
          <TouchableOpacity
            onPress={() => setShowGamificationHub(true)}
            className="flex-row items-center bg-primary-red px-3 py-2 rounded-full"
          >
            <Ionicons name="star" size={16} color="#FFFFFF" />
            <Text className="text-white font-bold text-sm ml-1">{userXp}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarOpen}
        animationType="none"
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <View className="flex-1 flex-row">
          {/* Sidebar Panel */}
          <Animated.View 
            className="w-80 bg-white"
            style={{
              transform: [{ translateX: slideAnim }]
            }}
          >
            <SafeAreaView className="flex-1">
              {/* Header */}
              <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                <Text className="text-xl font-bold text-primary-black">Lessons</Text>
                <View className="flex-row items-center space-x-3">
                  <TouchableOpacity onPress={() => setLocale(locale === 'en' ? 'vi' : 'en')}>
                    <Ionicons name="globe-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsSidebarOpen(false)}>
                    <Ionicons name="close" size={20} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Lessons List */}
            <ScrollView className="flex-1 p-4">
              {groupedLessons.map(([category, lessonsInCategory], groupIndex) => (
                  <View key={groupIndex} className="mb-6">
                    <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    {category}
                  </Text>
                    <View className="space-y-1">
                    {lessonsInCategory.map((lesson) => {
                      const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
                        const isUnlocked = lessonIndex === 0 || completedLessonIds.has(lessons[lessonIndex - 1].id);
                      const isCompleted = completedLessonIds.has(lesson.id);
                        const isCurrent = lessonIndex === currentLessonIndex;

                      const lessonTitle = lesson.content[locale as 'en' | 'vi'].title;

                      return (
                        <TouchableOpacity
                          key={lesson.id}
                          onPress={() => handleLessonClick(lessonIndex)}
                          disabled={!isUnlocked}
                            className={`flex-row items-center p-3 rounded-lg ${
                            isCurrent 
                              ? 'bg-primary-red' 
                                : 'bg-transparent'
                          }`}
                        >
                            <View className="w-6 h-6 rounded-full items-center justify-center mr-3">
                            {isCompleted ? (
                                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                            ) : !isUnlocked ? (
                              <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                            ) : (
                                <View className={`w-6 h-6 rounded-full items-center justify-center ${
                                  isCurrent ? 'bg-white' : 'bg-primary-red'
                              }`}>
                                  <Text className={`text-xs font-bold ${
                                    isCurrent ? 'text-primary-red' : 'text-white'
                                }`}>
                                  {lesson.id}
                                </Text>
                              </View>
                            )}
                          </View>
                          <Text className={`flex-1 text-sm font-medium ${
                            isCurrent 
                              ? 'text-white' 
                              : isUnlocked 
                                ? 'text-primary-black' 
                                : 'text-gray-400'
                          }`}>
                            {lessonTitle}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

              {/* Bottom User Section */}
              <View className="border-t border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-primary-red items-center justify-center mr-2">
                      <Text className="text-white font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </Text>
                    </View>
                    <Text className="font-medium text-primary-black text-sm">
                      {user?.name || 'User'}
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-2">
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentView('PROFILE');
                      setIsSidebarOpen(false);
                    }}
                      className="p-2"
                  >
                      <Ionicons name="person-outline" size={16} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentView('PLAYGROUND');
                      setIsSidebarOpen(false);
                    }}
                      className="p-2"
                  >
                      <Ionicons name="flask-outline" size={16} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentView('SETTINGS');
                      setIsSidebarOpen(false);
                    }}
                      className="p-2"
                  >
                      <Ionicons name="settings-outline" size={16} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSidebarOpen(false);
                      handleLogout();
                    }}
                      className="p-2"
                  >
                      <Ionicons name="log-out-outline" size={16} color="#EF4444" />
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </Animated.View>

          {/* Background Overlay */}
          <TouchableOpacity
            className="flex-1 bg-black/60"
            onPress={() => setIsSidebarOpen(false)}
            activeOpacity={1}
          />
        </View>
      </Modal>


      {/* Level Up Modal */}
      {levelUpInfo && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setLevelUpInfo(null)}
        >
          <View className="flex-1 bg-black/50 items-center justify-center p-4">
            <View className="bg-white rounded-2xl p-8 items-center max-w-sm w-full">
              <View className="w-20 h-20 bg-yellow-400 rounded-full items-center justify-center mb-4">
                <Ionicons name="trophy" size={40} color="#FFFFFF" />
              </View>
              
              <Text className="text-2xl font-bold text-gray-900 mb-2">Level Up!</Text>
              <Text className="text-lg text-gray-600 mb-1">Level {levelUpInfo.level}</Text>
              <Text className="text-md text-primary-red font-semibold mb-6">{levelUpInfo.rank}</Text>
              
              <TouchableOpacity
                onPress={() => setLevelUpInfo(null)}
                className="bg-primary-red px-8 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold text-lg">Continue</Text>
              </TouchableOpacity>
            </View>
    </View>
        </Modal>
      )}

      {/* Gamification Hub Modal */}
      {showGamificationHub && (
        <Modal
          visible={true}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowGamificationHub(false)}
        >
          <SafeAreaView className="flex-1 bg-gray-50">
            <GamificationHub
              xp={userXp}
              level={userLevel}
              rank={getRank(userLevel)}
              onClose={() => setShowGamificationHub(false)}
            />
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}