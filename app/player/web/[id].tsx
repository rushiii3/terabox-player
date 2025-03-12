import React, { useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

const Page = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const changeToLandscape = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  const changeToPortrait = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }, []);

  useEffect(() => {
    changeToLandscape();
    return () => {
      changeToPortrait();
    }; // Reset orientation on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "beforeRemove",
      changeToPortrait
    );
    return unsubscribe;
  }, [navigation]);

  console.log(
    `https://www.1024terabox.com/sharing/embed?surl=${id}&autoplay=true&mute=false`
  );

  const htmlContent = `
      <html>
        <body style="margin: 0; background-color: black;">
          <iframe 
            id="iframe"
            src="https://www.1024terabox.com/sharing/embed?surl=${id}&autoplay=true&mute=false"
            scrolling="no"
            allow="autoplay; fullscreen"
            allowfullscreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
            style="width: 100vw; height: 100vh; border: none;">
          </iframe>
        </body>
      </html>
  `;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar translucent hidden />
      <WebView
        style={{ flex: 1 }}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsAirPlayForMediaPlayback
        allowsPictureInPictureMediaPlayback
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
        allowsProtectedMedia
        // userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      />
      
    </SafeAreaView>
  );
};

export default Page;
