import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useTheme } from "@/components/ThemeContext";
import {
  ExternalPathString,
  Link,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useExtratID } from "@/hooks/useExtratID";
import AntDesign from "@expo/vector-icons/AntDesign";
import useFileDetails from "@/hooks/useFileDetails";

function encodeUrl(rawUrl: string) {
  const uriEncoded = encodeURIComponent(rawUrl);
  return btoa(uriEncoded);
}

function generateRandomUrl(downloadLink: string) {
  const baseUrls = [
    "plain-grass-58b2.comprehensiveaquamarine",
    "royal-block-6609.ninnetta7875",
    "bold-hall-f23e.7rochelle",
    "winter-thunder-0360.belitawhite",
  ];
  const selectedBaseUrl = baseUrls[Math.floor(Math.random() * baseUrls.length)];
  return `https://${selectedBaseUrl}.workers.dev/?url=${encodeUrl(
    downloadLink
  )}`;
}

export default function LinkDetailsScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const { extractCodeFromURL, extractCodeFromURLWeb } = useExtratID();
  const { theme, isDark } = useTheme();
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const { fileDetails, loading } = useFileDetails(extractCodeFromURL(url)!);
  // Mock function to simulate sharing
  // const handleShare = async () => {
  //   try {
  //     await Share.share({
  //       message: "router",
  //       title: mockFileDetails.filename,
  //     });
  //   } catch (error) {
  //     console.error("Error sharing:", error);
  //   }
  // };

  // Mock function to simulate copying URL
  // const handleCopyUrl = (urlToCopy: string) => {
  //   // In a real app, this would use Clipboard.setStringAsync(urlToCopy)
  //   // For UI demo purposes, we'll just show a loading state
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // };

  // Mock function to open in WebView
  const openInWebView = () => {
    router.push({
      pathname: "/player/web/[id]",
      params: {
        id: extractCodeFromURLWeb(url)!,
      },
    });
  };

  //   // Mock function to open in native player
  const openInNativePlayer = () => {
    if (fileDetails?.downloadUrls[1].url || fileDetails?.downloadUrls[0].url) {
      const playUrl = generateRandomUrl(
        fileDetails?.downloadUrls[1].url || fileDetails?.downloadUrls[0].url
      );
      if (playUrl) {
        router.push({
          pathname: "/player/native/[url]",
          params: {
            url: playUrl,
          },
        });
      }
    } else {
      Alert.alert("No playable url. Go back and come again");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          orientation: "portrait",
          header: () => (
            <View
              style={[
                styles.header,
                {
                  backgroundColor: theme.background,
                  paddingTop: top,
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
              <Text style={[styles.title, { color: theme.text }]}>
                File Details
              </Text>
              <TouchableOpacity
                style={[styles.shareButton, { backgroundColor: theme.card }]}
                // onPress={handleShare}
              >
                <Ionicons name="share-outline" size={22} color={theme.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={isDark ? "light" : "dark"} />

        {/* Header */}

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={theme.primary} />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* File Preview Card */}
            <Animated.View
              entering={FadeIn.duration(800)}
              style={[
                styles.previewCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={styles.fileIconContainer}>
                <View
                  style={[
                    styles.fileIcon,
                    { backgroundColor: theme.primary + "15" },
                  ]}
                >
                  <Ionicons name="videocam" size={40} color={theme.primary} />
                </View>
              </View>

              <Text style={[styles.filename, { color: theme.text }]}>
                {fileDetails.filename}
              </Text>

              <View style={styles.fileInfoRow}>
                <View style={styles.fileInfoItem}>
                  <Ionicons
                    name="document-outline"
                    size={16}
                    color={theme.muted}
                  />
                  <Text style={[styles.fileInfoText, { color: theme.muted }]}>
                    {fileDetails.fileSize}
                  </Text>
                </View>
                <View style={styles.fileInfoItem}>
                  <Ionicons name="time-outline" size={16} color={theme.muted} />
                  <Text style={[styles.fileInfoText, { color: theme.muted }]}>
                    {fileDetails?.uploadDate}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Play Options */}
            <Animated.View
              entering={FadeIn.duration(800).delay(200)}
              style={styles.sectionContainer}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Play Options
              </Text>

              <View style={styles.playOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.playOptionButton,
                    {
                      backgroundColor: theme.primary,
                      shadowColor: theme.primary,
                    },
                  ]}
                  onPress={openInWebView}
                >
                  <Ionicons name="globe-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.playOptionText}>Play in WebView</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.playOptionButton,
                    {
                      backgroundColor: theme.secondary,
                      shadowColor: theme.secondary,
                    },
                  ]}
                  onPress={openInNativePlayer}
                >
                  <Ionicons
                    name="play-circle-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.playOptionText}>Native Player</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Original URL */}
            <Animated.View
              entering={FadeIn.duration(800).delay(300)}
              style={styles.sectionContainer}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Original URL
              </Text>

              <TouchableOpacity
                style={[
                  styles.urlCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
                // onPress={() => handleCopyUrl(url)}
                activeOpacity={0.7}
              >
                <View style={styles.urlTextContainer}>
                  <Text
                    style={[styles.urlText, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    {url}
                  </Text>
                </View>
                <View
                  style={[
                    styles.copyButton,
                    { backgroundColor: theme.primary + "15" },
                  ]}
                >
                  <Ionicons
                    name={"copy-outline"}
                    size={18}
                    color={theme.primary}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Download URLs */}
            <Animated.View
              entering={FadeIn.duration(800).delay(400)}
              style={styles.sectionContainer}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Download Options
              </Text>

              {fileDetails?.downloadUrls.map((item, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInRight.duration(500).delay(500 + index * 100)}
                >
                  <Link
                    style={[
                      styles.urlCard,
                      {
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                        marginBottom: 12,
                      },
                    ]}
                    href={item?.url as ExternalPathString}
                  >
                    <View style={styles.urlTextContainer}>
                      <View
                        style={[
                          styles.copyButton,
                          { backgroundColor: theme.primary + "15" },
                        ]}
                      >
                        <AntDesign
                          name={"download"}
                          size={18}
                          color={theme.primary}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[styles.urlText, { color: theme.text }]}
                          numberOfLines={1}
                        >
                          Server {index + 1}
                        </Text>
                        <Text style={[{ color: theme.text }]} numberOfLines={1}>
                          Download
                        </Text>
                      </View>
                    </View>
                  </Link>
                </Animated.View>
              ))}
            </Animated.View>
          </ScrollView>
        )}
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  shareButton: {
    padding: 10,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  previewCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  fileIconContainer: {
    marginBottom: 16,
  },
  fileIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filename: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  fileInfoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  fileInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileInfoText: {
    fontSize: 13,
    marginLeft: 4,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },
  playOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playOptionButton: {
    width: (width - 48) / 2,
    height: 100,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  playOptionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  urlCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  urlTextContainer: {
    flex: 1,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  urlIcon: {
    marginBottom: 4,
  },
  urlLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  urlText: {
    fontSize: 14,
    fontWeight: "500",
  },
  copyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
