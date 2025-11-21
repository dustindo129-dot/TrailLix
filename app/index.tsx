import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import Auth from '../src/components/Auth';
import RoleSelector from '../src/components/RoleSelector';
import ConceptsIntro from '../src/components/ConceptsIntro';
import type { UserProfile } from '../src/components/RoleSelector';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedProfile, hasCompletedConcepts, isLoading, login, register, completeProfile, completeConcepts } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showConcepts, setShowConcepts] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (hasCompletedProfile && hasCompletedConcepts) {
        // User is fully set up, navigate to main app
        router.replace('/main');
      } else if (hasCompletedProfile && !hasCompletedConcepts) {
        // User needs to complete concepts quiz
        setShowConcepts(true);
        setShowOnboarding(false);
      } else if (!hasCompletedProfile) {
        // User needs to complete onboarding
        setShowOnboarding(true);
        setShowConcepts(false);
      }
    }
  }, [isAuthenticated, hasCompletedProfile, hasCompletedConcepts, isLoading, router]);

  const handleAuth = async (email: string, password: string, isSignup: boolean, name?: string) => {
    const result = isSignup 
      ? await register(name || email.split('@')[0], email, password)
      : await login(email, password);
    
    // Don't automatically set onboarding - let the useEffect handle routing based on user state
    return result;
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    await completeProfile(profile);
    setShowOnboarding(false);
    setShowConcepts(true);
  };

  const handleConceptsComplete = async () => {
    await completeConcepts();
    router.replace('/main');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#d90d03" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Auth onLogin={handleAuth} />;
  }

  if (showOnboarding) {
    return <RoleSelector onProfileSubmit={handleProfileSubmit} />;
  }

  if (showConcepts) {
    return <ConceptsIntro onComplete={handleConceptsComplete} />;
  }

  // If user is authenticated but no onboarding/concepts needed, show loading while navigation happens
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#d90d03" />
    </View>
  );
}

