import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedGradientProps {
  children: React.ReactNode;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 7500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 7500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#1a1a1a', '#4a0101', '#111111', '#d90d03']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default AnimatedGradient;

