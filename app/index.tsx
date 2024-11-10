import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useExtratID } from "@/hooks/useExtratID";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Index() {
  const router = useRouter();
  const { extractCodeFromURL } = useExtratID();
  const [url, seturl] = useState("");
  const handlePlay = () => {
    if (!url) {
      Alert.alert("URL is required");
      return;
    }
    const id = extractCodeFromURL(url);
    if (id) {
      router.push({
        pathname: "/player/[id]",
        params: {
          id: id,
        },
      });
    }
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    seturl(text);
  };
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={{
          uri: "https://www.airexplorer.net/en/wp-content/uploads/sites/2/2023/10/nubes_terabox.png",
        }}
        style={{ height: 200, width: 200, borderRadius: 100, marginBottom: 10 }}
      />
      <ThemedText style={{ fontWeight: "800", fontSize: 20, marginBottom: 20 }}>
        TeraBox Player and Downloader
      </ThemedText>
      <View style={styles.input}>
        <ThemedText style={styles.inputLabel}>TeraBox Link</ThemedText>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardType="url"
          onChangeText={seturl}
          placeholder="TeraBox link here"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={url}
        />
      </View>
      <View style={styles.contentActions}>
        {!url && (
          <TouchableOpacity
            onPress={fetchCopiedText}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Paste URL</Text>
            </View>
          </TouchableOpacity>
        )}
        {url && (
          <TouchableOpacity
            onPress={() => {
              seturl('');
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Clear URL</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handlePlay}
          style={{ flex: 1, paddingHorizontal: 6 }}
        >
          <View style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Play</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    width: "100%",
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  contentActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginHorizontal: -6,
    marginBottom: 0,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#266EF1",
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#266EF1",
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "#266EF1",
    borderColor: "#266EF1",
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#fff",
  },
});
