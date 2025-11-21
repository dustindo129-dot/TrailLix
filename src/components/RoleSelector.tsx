import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../hooks/useLanguage';

export interface UserProfile {
  name: string;
  ageRange: string;
  role: string;
  aiExperience: string;
  skills: string[];
  achievement: string;
  fields: string[];
  motivations: string[];
}

interface RoleSelectorProps {
  onProfileSubmit: (profile: UserProfile) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onProfileSubmit }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Profile state
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [role, setRole] = useState('');
  const [otherRoleText, setOtherRoleText] = useState('');
  const [aiExperience, setAiExperience] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [otherSkillsText, setOtherSkillsText] = useState('');
  const [achievement, setAchievement] = useState('');
  const [otherAchievementText, setOtherAchievementText] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [otherFieldsText, setOtherFieldsText] = useState('');
  const [motivations, setMotivations] = useState<string[]>([]);
  const [otherMotivationsText, setOtherMotivationsText] = useState('');

  const totalSteps = 8;

  const allOptions = {
    age: Object.entries(t('roleSelector.step2.options') as Record<string, string>),
    role: Object.entries(t('roleSelector.step3.options') as Record<string, string>),
    experience: Object.entries(t('roleSelector.step4.options') as Record<string, string>),
    skills: Object.entries(t('roleSelector.step5.options') as Record<string, string>),
    achievement: Object.entries(t('roleSelector.step6.options') as Record<string, string>),
    fields: Object.entries(t('roleSelector.step7.options') as Record<string, string>),
    motivations: Object.entries(t('roleSelector.step8.options') as Record<string, string>),
  };

  const handleMultiSelect = (
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    limit?: number
  ) => {
    const isSelected = state.includes(value);
    let newSelection = [...state];

    if (isSelected) {
      newSelection = newSelection.filter((item) => item !== value);
    } else {
      if (!limit || newSelection.length < limit) {
        newSelection.push(value);
      }
    }
    setter(newSelection);
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return name.trim().length > 2;
      case 1:
        return ageRange.length > 0;
      case 2:
        return role.length > 0 && (role !== 'Khác' && role !== 'Other' || otherRoleText.trim().length > 0);
      case 3:
        return aiExperience.length > 0;
      case 4:
        return skills.length > 0 && (!skills.includes('Khác') && !skills.includes('Other') || otherSkillsText.trim().length > 0);
      case 5:
        return achievement.length > 0 && (achievement !== 'Khác' && achievement !== 'Other' || otherAchievementText.trim().length > 0);
      case 6:
        return fields.length > 0 && (!fields.includes('Khác') && !fields.includes('Other') || otherFieldsText.trim().length > 0);
      case 7:
        return motivations.length > 0 && (!motivations.includes('Khác') && !motivations.includes('Other') || otherMotivationsText.trim().length > 0);
      default:
        return false;
    }
  };

  const processAndGetFinalValue = (selectedValue: string, otherText: string): string => {
    return selectedValue === 'Khác' || selectedValue === 'Other' ? otherText.trim() : selectedValue;
  };

  const processAndGetFinalArray = (selectedArray: string[], otherText: string): string[] => {
    const finalArray = selectedArray.filter((item) => item !== 'Khác' && item !== 'Other');
    if ((selectedArray.includes('Khác') || selectedArray.includes('Other')) && otherText.trim()) {
      finalArray.push(otherText.trim());
    }
    return finalArray;
  };

  const handleSubmit = () => {
    const finalProfile: UserProfile = {
      name: name.trim(),
      ageRange,
      role: processAndGetFinalValue(role, otherRoleText),
      aiExperience,
      skills: processAndGetFinalArray(skills, otherSkillsText),
      achievement: processAndGetFinalValue(achievement, otherAchievementText),
      fields: processAndGetFinalArray(fields, otherFieldsText),
      motivations: processAndGetFinalArray(motivations, otherMotivationsText),
    };
    onProfileSubmit(finalProfile);
  };

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

  const handleNext = () => {
    if (!isStepValid()) return;

    animateTransition(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    });
  };

  const handleBack = () => {
    animateTransition(() => {
      if (step > 0) setStep(step - 1);
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step1.title')}
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t('roleSelector.step1.placeholder')}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-primary-black"
              autoFocus
            />
          </View>
        );

      case 1:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step2.title')}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {allOptions.age.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setAgeRange(value)}
                  className={`px-4 py-3 border rounded-lg ${
                    ageRange === value
                      ? 'bg-primary-red border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                  style={{ minWidth: '45%' }}
                >
                  <Text
                    className={`text-center font-medium text-sm ${
                      ageRange === value ? 'text-white' : 'text-primary-black'
                    }`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step3.title')}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {allOptions.role.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setRole(value)}
                  className={`px-4 py-3 border rounded-lg ${
                    role === value ? 'bg-primary-red border-primary-red' : 'bg-white border-gray-300'
                  }`}
                  style={{ minWidth: '45%' }}
                >
                  <Text
                    className={`text-center font-medium text-sm ${
                      role === value ? 'text-white' : 'text-primary-black'
                    }`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {(role === 'Khác' || role === 'Other') && (
              <TextInput
                value={otherRoleText}
                onChangeText={setOtherRoleText}
                placeholder={t('roleSelector.step3.otherPlaceholder')}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 mt-4"
                autoFocus
              />
            )}
          </View>
        );

      case 3:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step4.title')}
            </Text>
            <View className="space-y-3">
              {allOptions.experience.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setAiExperience(value)}
                  className={`p-3 border rounded-lg ${
                    aiExperience === value
                      ? 'bg-primary-red border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <Text
                    className={`font-medium text-sm ${
                      aiExperience === value ? 'text-white' : 'text-primary-black'
                    }`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step5.title')}
            </Text>
            <View className="space-y-3">
              {allOptions.skills.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleMultiSelect(skills, setSkills, value)}
                  className={`flex-row items-center p-3 border rounded-lg ${
                    skills.includes(value)
                      ? 'bg-primary-red/10 border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <View
                    className={`w-4 h-4 rounded border mr-3 items-center justify-center ${
                      skills.includes(value) ? 'bg-primary-red border-primary-red' : 'border-gray-300'
                    }`}
                  >
                    {skills.includes(value) && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text className="text-sm font-medium text-gray-800 flex-1">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {(skills.includes('Khác') || skills.includes('Other')) && (
              <TextInput
                value={otherSkillsText}
                onChangeText={setOtherSkillsText}
                placeholder={t('roleSelector.step5.otherPlaceholder')}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 mt-4"
                autoFocus
              />
            )}
          </View>
        );

      case 5:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step6.title')}
            </Text>
            <View className="space-y-3">
              {allOptions.achievement.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setAchievement(value)}
                  className={`p-3 border rounded-lg ${
                    achievement === value
                      ? 'bg-primary-red border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <Text
                    className={`font-medium text-sm ${
                      achievement === value ? 'text-white' : 'text-primary-black'
                    }`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {(achievement === 'Khác' || achievement === 'Other') && (
              <TextInput
                value={otherAchievementText}
                onChangeText={setOtherAchievementText}
                placeholder={t('roleSelector.step6.otherPlaceholder')}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 mt-4"
                autoFocus
              />
            )}
          </View>
        );

      case 6:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step7.title')}
            </Text>
            <View className="space-y-3">
              {allOptions.fields.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleMultiSelect(fields, setFields, value, 3)}
                  className={`flex-row items-center p-3 border rounded-lg ${
                    fields.includes(value)
                      ? 'bg-primary-red/10 border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                  disabled={fields.length >= 3 && !fields.includes(value)}
                >
                  <View
                    className={`w-4 h-4 rounded border mr-3 items-center justify-center ${
                      fields.includes(value) ? 'bg-primary-red border-primary-red' : 'border-gray-300'
                    }`}
                  >
                    {fields.includes(value) && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text className="text-sm font-medium text-gray-800 flex-1">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {(fields.includes('Khác') || fields.includes('Other')) && (
              <TextInput
                value={otherFieldsText}
                onChangeText={setOtherFieldsText}
                placeholder={t('roleSelector.step7.otherPlaceholder')}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 mt-4"
                autoFocus
              />
            )}
            <Text className="text-xs text-gray-500 mt-2">
              {t('roleSelector.step7.title').includes('3') ? `(${fields.length}/3 selected)` : ''}
            </Text>
          </View>
        );

      case 7:
        return (
          <View>
            <Text className="text-xl font-semibold mb-4 text-primary-black">
              {t('roleSelector.step8.title')}
            </Text>
            <View className="space-y-3">
              {allOptions.motivations.map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleMultiSelect(motivations, setMotivations, value)}
                  className={`flex-row items-center p-3 border rounded-lg ${
                    motivations.includes(value)
                      ? 'bg-primary-red/10 border-primary-red'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <View
                    className={`w-4 h-4 rounded border mr-3 items-center justify-center ${
                      motivations.includes(value)
                        ? 'bg-primary-red border-primary-red'
                        : 'border-gray-300'
                    }`}
                  >
                    {motivations.includes(value) && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text className="text-sm font-medium text-gray-800 flex-1">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {(motivations.includes('Khác') || motivations.includes('Other')) && (
              <TextInput
                value={otherMotivationsText}
                onChangeText={setOtherMotivationsText}
                placeholder={t('roleSelector.step8.otherPlaceholder')}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 mt-4"
                autoFocus
              />
            )}
          </View>
        );

      default:
        return null;
    }
  };

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
              {t('roleSelector.mainTitle')}
            </Text>
            <Text className="text-sm text-gray-600">{t('roleSelector.description')}</Text>
          </View>

          {/* Progress Bar */}
          <View className="flex-row mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View
                key={i}
                className={`h-1 flex-1 mx-0.5 rounded ${
                  i <= step ? 'bg-primary-red' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>

          {/* Content */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {renderStepContent()}
            </Animated.View>
          </ScrollView>

          {/* Navigation Buttons */}
          <View className="flex-row gap-3 mt-6">
            {step > 0 && (
              <TouchableOpacity
                onPress={handleBack}
                className="flex-1 bg-gray-300 py-3 rounded-lg"
              >
                <Text className="text-center font-semibold text-gray-800">
                  {t('roleSelector.back')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 py-3 rounded-lg ${
                isStepValid() ? 'bg-primary-red' : 'bg-gray-300'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  isStepValid() ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step === totalSteps - 1 ? t('roleSelector.submit') : t('roleSelector.next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RoleSelector;

