import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import { setupDatabase } from "@/database";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});
function RootLayout() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background }, // Header background
        headerTintColor: theme.text, // Header text color
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          orientation: "portrait",
          header: () => (
            <View
              style={[
                styles.headerContainer,
                {
                  paddingTop: top,
                  backgroundColor: theme.background,
                  borderBottomColor: theme.muted,
                },
              ]}
            >
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <View
                    style={[
                      styles.logoContainer,
                      { backgroundColor: theme.primary + "15" },
                    ]}
                  >
                    <Ionicons
                      name="play-circle"
                      size={24}
                      color={theme.primary}
                    />
                  </View>
                  <Text style={[styles.title, { color: theme.text }]}>
                    TeraBox Player
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggleTheme}
                  style={[styles.themeToggle, { backgroundColor: theme.card }]}
                >
                  <Ionicons
                    name={isDark ? "sunny-outline" : "moon-outline"}
                    size={22}
                    color={theme.text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen name="player/web/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="player/native/[url]"
        options={{ headerShown: false, orientation: "landscape" }}
      />
      <Stack.Screen name="history" />
    </Stack>
  );
}

export default function Layout() {
  const initDB = async () => {
    await setupDatabase();
  };

  useEffect(() => {
    async function prepare() {
      try {
        initDB();
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }

    prepare();
  }, []);

  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 60,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 12,
  },
});
