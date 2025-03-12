import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import LinkItem from "../components/LinkItem";
import EmptyState from "../components/EmptyState";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTheme } from "@/components/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useDB } from "@/hooks/useDB";

export default function HistoryScreen() {
  const { theme, isDark } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const {
    allLinks: links,
    handleDeleteAll,
    handleDeleteLink,
    handleOpenLink,
  } = useDB();

  const handleClearAll = () => {
    Alert.alert(
      "Clear All History",
      "Are you sure you want to clear all your link history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => handleDeleteAll(),
        },
      ]
    );
  };

  const openLink = (url: string) => {
    router.push("/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          orientation: "portrait",
          header: () => (
            <View
              style={[
                styles.header,
                {
                  paddingTop: top,
                  backgroundColor: theme.background,
                  borderBottomWidth: 0.2,
                  borderBottomColor: theme.muted,
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: theme.card }]}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={22} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: theme.text }]}>History</Text>
              {links.length > 0 && (
                <TouchableOpacity
                  style={[
                    styles.clearButton,
                    { backgroundColor: theme.error + "15" },
                  ]}
                  onPress={handleClearAll}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={theme.error}
                  />
                  <Text style={[styles.clearText, { color: theme.error }]}>
                    Clear
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={isDark ? "light" : "dark"} />

        <Animated.View
          entering={FadeIn.duration(500).delay(200)}
          style={styles.content}
        >
          {links.length > 0 ? (
            <FlatList
              data={links}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={({ item }) => (
                <LinkItem
                  id={item?.id.toString()}
                  url={item?.url}
                  timestamp={item?.date}
                  onDelete={() => handleDeleteLink(item?.id)}
                  onPress={() =>
                    handleOpenLink({ url: item?.url, id: item?.id })
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: bottom,
              }}
            />
          ) : (
            <EmptyState
              message="Your history is empty. Links you play will appear here."
              icon="time-outline"
            />
          )}
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  clearText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  linksList: {
    paddingBottom: 16,
  },
});
