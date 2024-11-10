import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
const Page = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  useEffect(() => {
    changeScreenOrientation();
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    });
  }, [navigation]);

  return (
    <SafeAreaView
      edges={{
        right: "off",
        top: "off",
        left: "off",
        bottom: "off",
      }}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <StatusBar translucent={true} hidden={true} />

      <WebView
        style={{
          flex: 1,
        }}
        source={{
          uri: `https://www.1024terabox.com/sharing/embed?surl=${id}&autoplay=true&mute=false`,
        }}
        allowsFullscreenVideo
      />
    </SafeAreaView>
  );
};

export default Page;
