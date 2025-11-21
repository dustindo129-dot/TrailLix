import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';

interface ConceptStep {
  title: string;
  icon: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ConceptsIntroProps {
  onComplete: () => void;
}

const ConceptsIntro: React.FC<ConceptsIntroProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const steps: ConceptStep[] = t('concepts.steps') as ConceptStep[];
  const totalSteps = steps.length;

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(callback, 200);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      animateTransition(() => {
        setCurrentStep(currentStep + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      });
    } else {
      // Complete the concepts intro
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateTransition(() => {
        setCurrentStep(currentStep - 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      });
    }
  };

  const getIconName = (iconType: string) => {
    switch (iconType) {
      case 'cpu':
        return 'hardware-chip-outline';
      case 'sparkles':
        return 'sparkles-outline';
      case 'message':
        return 'chatbubble-outline';
      case 'target':
        return 'target-outline';
      case 'check':
        return 'checkmark-circle-outline';
      case 'certificate':
        return 'ribbon-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const currentStepData = steps[currentStep];
  const isCorrect = selectedAnswer === currentStepData.correctIndex;
  const canProceed = showExplanation;

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-4 py-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-primary-black mb-2">
              AI Concepts Quiz
            </Text>
            <Text className="text-sm text-gray-600">
              Let's test your understanding before starting your Trail
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="flex-row mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View
                key={i}
                className={`h-1 flex-1 mx-0.5 rounded ${
                  i <= currentStep ? 'bg-primary-red' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>

          {/* Question Counter */}
          <Text className="text-sm text-gray-500 mb-4">
            Question {currentStep + 1} of {totalSteps}
          </Text>

          {/* Content */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {/* Question Icon */}
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-full bg-primary-red/10 items-center justify-center">
                  <Ionicons
                    name={getIconName(currentStepData.icon) as any}
                    size={32}
                    color="#d90d03"
                  />
                </View>
              </View>

              {/* Question Title */}
              <Text className="text-xl font-semibold text-primary-black mb-6 text-center">
                {currentStepData.title}
              </Text>

              {/* Answer Options */}
              <View className="space-y-3 mb-6">
                {currentStepData.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`p-4 border rounded-lg ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === currentStepData.correctIndex
                            ? 'bg-green-50 border-green-500'
                            : 'bg-red-50 border-red-500'
                          : 'bg-primary-red/10 border-primary-red'
                        : showExplanation && index === currentStepData.correctIndex
                        ? 'bg-green-50 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View
                        className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === currentStepData.correctIndex
                                ? 'bg-green-500 border-green-500'
                                : 'bg-red-500 border-red-500'
                              : 'bg-primary-red border-primary-red'
                            : showExplanation && index === currentStepData.correctIndex
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {((selectedAnswer === index && showExplanation) || 
                          (showExplanation && index === currentStepData.correctIndex)) && (
                          <Ionicons
                            name={
                              (selectedAnswer === index && index === currentStepData.correctIndex) ||
                              (showExplanation && index === currentStepData.correctIndex)
                                ? 'checkmark'
                                : 'close'
                            }
                            size={16}
                            color="white"
                          />
                        )}
                      </View>
                      <Text
                        className={`flex-1 text-sm ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === currentStepData.correctIndex
                                ? 'text-green-700 font-medium'
                                : 'text-red-700 font-medium'
                              : 'text-primary-red font-medium'
                            : showExplanation && index === currentStepData.correctIndex
                            ? 'text-green-700 font-medium'
                            : 'text-gray-800'
                        }`}
                      >
                        {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Explanation */}
              {showExplanation && (
                <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <View className="flex-row items-center mb-2">
                    <Ionicons
                      name={isCorrect ? 'checkmark-circle' : 'information-circle'}
                      size={20}
                      color={isCorrect ? '#22c55e' : '#3b82f6'}
                    />
                    <Text
                      className={`ml-2 font-semibold ${
                        isCorrect ? 'text-green-700' : 'text-blue-700'
                      }`}
                    >
                      {t(isCorrect ? 'concepts.correctTitle' : 'concepts.incorrectTitle')}
                    </Text>
                  </View>
                  <Text className="text-sm text-blue-800 mb-2">
                    <Text className="font-medium">{t('concepts.explanationTitle')}</Text>
                  </Text>
                  <Text className="text-sm text-blue-800">
                    {currentStepData.explanation}
                  </Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>

          {/* Navigation Buttons */}
          <View className="flex-row gap-3 mt-6">
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={handleBack}
                className="flex-1 bg-gray-300 py-3 rounded-lg"
              >
                <Text className="text-center font-semibold text-gray-800">
                  {t('concepts.back')}
                </Text>
              </TouchableOpacity>
            )}
            
            {!showExplanation ? (
              <TouchableOpacity
                onPress={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg ${
                  selectedAnswer !== null ? 'bg-primary-red' : 'bg-gray-300'
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    selectedAnswer !== null ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {t('concepts.checkAnswer')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleNext}
                className="flex-1 bg-primary-red py-3 rounded-lg"
              >
                <Text className="text-center font-semibold text-white">
                  {currentStep === totalSteps - 1
                    ? t('concepts.finalCta')
                    : t('concepts.next')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConceptsIntro;
