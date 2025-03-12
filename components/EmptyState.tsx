import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export default function EmptyState({ message, icon = 'link-outline' }: EmptyStateProps) {
  const { theme } = useTheme();
  
  return (
    <Animated.View 
      entering={FadeIn.duration(500).delay(300)}
      style={styles.container}
    >
      <Animated.View
        entering={SlideInDown.duration(800).springify()}
        style={[styles.iconContainer, { backgroundColor: theme.highlight }]}
      >
        <Ionicons name={icon as any} size={64} color={theme.primary} />
      </Animated.View>
      <Text style={[styles.message, { color: theme.text + '90' }]}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
});