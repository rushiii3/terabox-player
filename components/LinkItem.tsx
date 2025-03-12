import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';

interface LinkItemProps {
  id: string;
  url: string;
  timestamp: string;
  onDelete?: () => void;
  onPress?: () => void;
}

export default function LinkItem({ id, url, timestamp, onDelete, onPress }: LinkItemProps) {
  const { theme } = useTheme();
  
  const formattedDate = new Date(timestamp).toLocaleString();
  
  return (
    <Animated.View 
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      style={[styles.container, { 
        backgroundColor: theme.card,
        shadowColor: theme.shadow,
        borderColor: theme.border
      }]}
    >
      <TouchableOpacity 
        style={styles.content} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="link" size={20} color={theme.primary} />
        </View>
        <View style={styles.urlContainer}>
          <Text style={[styles.url, { color: theme.text }]} numberOfLines={1} ellipsizeMode="middle">
            {url}
          </Text>
          <Text style={[styles.timestamp, { color: theme.muted }]}>
            {formattedDate}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.playButton, { backgroundColor: theme.primary + '15' }]} 
            onPress={onPress}
          >
            <Ionicons name="play" size={18} color={theme.primary} />
          </TouchableOpacity>
          {onDelete && (
            <TouchableOpacity 
              style={[styles.deleteButton, { backgroundColor: theme.error + '15' }]} 
              onPress={onDelete}
            >
              <Ionicons name="trash-outline" size={16} color={theme.error} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  urlContainer: {
    flex: 1,
    marginRight: 12,
  },
  url: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});