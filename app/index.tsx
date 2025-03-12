import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "@/components/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import LinkItem from "@/components/LinkItem";
import EmptyState from "@/components/EmptyState";
import { insertUrl } from "@/database";
import { useDB } from "@/hooks/useDB";
export default function Index() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const { handleOpenLink, recentLinks, handlePlay } = useDB();
  const inputScale = useSharedValue(1);

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inputScale.value }],
    };
  });

  const [url, seturl] = useState("");

  const handlePasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    seturl(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container]}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style={isDark ? "light" : "dark"} />

        <Animated.Text
          entering={FadeIn.duration(800).delay(100)}
          style={[styles.subtitle, { color: theme.muted }]}
        >
          Paste a TeraBox link and play it instantly
        </Animated.Text>
        <Animated.View
          entering={FadeIn.duration(500).delay(300)}
          style={[styles.inputContainer, inputAnimatedStyle]}
        >
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Paste TeraBox URL here..."
              placeholderTextColor={theme.text + "60"}
              value={url}
              onChangeText={seturl}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={handlePasteFromClipboard}
              // onPress={() => {
              //   router.push({
              //     pathname: "/player/native/[url]",
              //     params: {
              //       url: "https://plain-grass-58b2.comprehensiveaquamarine.workers.dev/?url=aHR0cHMlM0ElMkYlMkZkNi50ZXJhYm94LmNvbSUyRmZpbGUlMkZmYzIwYmQ4OTIwZjM1NDY1OWRmY2FiZDFiOWFjZmVjNSUzRmJrdCUzRGVuLWM1OGEyMTdjNWI1YmY3YjIyNGJmZTFjYjMyMzk5Nzg3MmE2ZjRkZWI0YWI4ODc4N2VkN2QwMjdlMjA3MWMzMWVjNjljNzc2NTE4NGMyOTcyJTI2eGNvZGUlM0QzODE4YWUxODE0NWE2YTFkNmVmZTc1Zjk0N2VjYmRiY2Q4MTgyMGZiMDdhNDVlMDRkMWE0N2U2YTdmMWUwMjVlNzk2Mzg3NjQ2MTU4NGUyZmZlYzEzMzEyM2EwOTdhYzFiYWMxNTk4ZjYyYzM0NzhkJTI2ZmlkJTNENDM5ODMxMDAzNDM1Mi0yNTA1MjgtMTA5Nzg0NDc4NjY3MTIwOCUyNnRpbWUlM0QxNzQxNzEwODczJTI2c2lnbiUzREZEVEFYVUdFUkxRbEJIU0tmYW9uLURDYjc0MGNjYzU1MTFlNWU4ZmVkY2ZmMDZiMDgxMjAzLWlxeVExTkEwODdSSldaMlJlVXpHQzEwRThkRSUyNTNEJTI2dG8lM0RkNiUyNnNpemUlM0QzMjE0NTIxNzAlMjZzdGFfZHglM0QzMjE0NTIxNzAlMjZzdGFfY3MlM0QyNCUyNnN0YV9mdCUzRG1rdiUyNnN0YV9jdCUzRDElMjZzdGFfbXQlM0QxJTI2Zm0yJTNETUglMjUyQ3RreSUyNTJDQW55d2hlcmUlMjUyQyUyNTJDVFdGb1lYSmhjMmgwY21FJTI1M0QlMjUyQ2FueSUyNnJlZ2lvbiUzRHRreSUyNmN0aW1lJTNEMTc0MTUyNTAyOCUyNm10aW1lJTNEMTc0MTUyNTAyOCUyNnJlc3YwJTNELTElMjZyZXN2MSUzRDAlMjZyZXN2MiUzRHJsaW0lMjZyZXN2MyUzRDUlMjZyZXN2NCUzRDMyMTQ1MjE3MCUyNnZ1ayUzRDQ0MDE1MTQzNDQwMDUlMjZpdiUzRDAlMjZodHlwZSUzRCUyNnJhbmR0eXBlJTNEJTI2bmV3dmVyJTNEMSUyNm5ld2ZtJTNEMSUyNnNlY2ZtJTNEMSUyNmZsb3dfdmVyJTNEMyUyNnBrZXklM0Rlbi01NzBkMThmOGIxYWQwYjQ4NjZmM2Q4ZTMwZmU4ZWFlM2RkODc1MDY1YTI2MGZlNTIwMmFmOTdlN2Y2M2IzZjUyZjI1ZTQ3NzVjMDE1ZDk5NSUyNnNsJTNENzA3MTM0MjElMjZleHBpcmVzJTNEMTc0MTczOTY3MyUyNnJ0JTNEc2glMjZyJTNEODgyMzcxNDg0JTI2c2glM0QxJTI2dmJkaWQlM0QtJTI2ZmluJTNEJTI1NUIlMjU0MENpbmVtYWFfQm94b2Zmb2NlJTI1NURfU29sb19MZXZlbGluZ19TMDJFMDdfMTA4MFBfV0VCLURMXyUyNTdCTXVsdC5ta3YlMjZydHlwZSUzRDElMjZkcC1sb2dpZCUzRDQ3MTEzMjgxNjY4MjA3MjcxMiUyNmRwLWNhbGxpZCUzRDAuMSUyNmhwcyUzRDElMjZ0c2wlM0QxMDAwJTI2Y3NsJTNEMTAwMCUyNmZzbCUzRC0xJTI2Y3NpZ24lM0RtbmFSNW9WZDV2eDJiR0RvJTI1MkZjJTI1MkJ6c3klMjUyQkRidm8lMjUzRCUyNnNvJTNEMCUyNnV0JTNENiUyNnV0ZXIlM0QzJTI2c2VydiUzRDElMjZ1YyUzRDEwMTAxNzU3NjAlMjZ0aSUzRDE0YTMwMTAzODRjMWNhM2NiZTZhMDBmMGEzNDVkMmZlNjkxOTg0NjBlMzM0YWFkNzMwNWE1ZTEyNzU2NTczMjAlMjZ0dXNlJTNEJTI2cmF3X2FwcGlkJTNEMCUyNm9nciUzRDAlMjZycmVnaW9uJTNEWFZWaSUyNmFkZyUzRCUyNnJlcWxhYmVsJTNEMjUwNTI4X2ZfNGU0M2Y1ZGI4YzlmNzlkNzQ4NDcwN2UwOTA4MjYzZDVfLTFfYTk1YzVhNThmMjhjNWJmNjMzMDYxYzc1OTBlZDQ4MTYlMjZjY24lM0RJTiUyNmJ5JTNEdGhlbWlzJTI2VVJMUHJlZml4JTNEYUhSMGNITTZMeTlrTmk1MFpYSmhZbTk0TG1OdmJTOW1hV3hsTDJaak1qQmlaRGc1TWpCbU16VTBOalU1WkdaallXSmtNV0k1WVdObVpXTTElMjZFeHBpcmVzJTNEMTc0MTczOTY3MyUyNktleU5hbWUlM0Rkb3dubG9hZC12aWRlby1rZXlzZXQlMjZTaWduYXR1cmUlM0RVc3dUa2V5LUtPR2twQ3JUMjBXZzhDODQ0S2VBaDNNSWhKQXJ1em4yNkthQWVMdXppbm01QTUtS044RFI0eU0tbVR6OHlIQ2s5bnFadFF6dEtJdkdBUQ==",
              //     },
              //   });
              // }}
              style={[styles.pasteButton, { backgroundColor: theme.card }]}
            >
              <Ionicons
                name="clipboard-outline"
                size={20}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: theme.primary }]}
            onPress={() => handlePlay({ url: url })}
            activeOpacity={0.8}
          >
            <Text style={styles.playButtonText}> Play</Text>
            <Ionicons
              name="play"
              size={18}
              color="#FFFFFF"
              style={styles.playIcon}
            />
            {/* {!isLoading && <Ionicons name="play" size={18} color="#FFFFFF" style={styles.playIcon} />} */}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Recent Links
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/history")}
              style={[styles.viewAllButton, { backgroundColor: theme.card }]}
            >
              <Text style={[styles.viewAllText, { color: theme.primary }]}>
                View All
              </Text>
              {/* <Ionicons name="chevron-forward" size={16} color={theme.primary} /> */}
            </TouchableOpacity>
          </View>

          {recentLinks.length > 0 ? (
            recentLinks.flatMap((links) => (
              <LinkItem
                id={links.id.toString()}
                url={links.url}
                timestamp={links.date}
                onPress={() =>
                  handleOpenLink({ id: Number(links.id), url: links.url })
                }
                key={links.date}
              />
            ))
          ) : (
            <EmptyState
              message="No recent links. Paste a TeraBox URL to get started!"
              icon="time-outline"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 12,
    marginBottom: 8,
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
    marginBottom: 6,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  pasteButton: {
    padding: 8,
    borderRadius: 10,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  playIcon: {
    marginLeft: 8,
  },
  recentContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  linksList: {
    paddingBottom: 16,
  },
});
