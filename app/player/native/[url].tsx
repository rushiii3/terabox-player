import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import * as ScreenOrientation from "expo-screen-orientation";

const Page = () => {
  const { url } = useLocalSearchParams<{ url: string }>();
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
  const player = useVideoPlayer(url, (player) => {
    player.play();
  });
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        startsPictureInPictureAutomatically
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  video: { width: "100%", height: "100%", backgroundColor:"black" },
});
