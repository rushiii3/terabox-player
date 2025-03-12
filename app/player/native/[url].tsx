import { StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native-safe-area-context";

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
    player.allowsExternalPlayback;
    player.audioMixingMode;
    player.showNowPlayingNotification;
    player.availableSubtitleTracks;
    player.currentLiveTimestamp;
    player.currentTime;
    player.duration;
    player.staysActiveInBackground;
    player.volume;
  });

  return (
    <SafeAreaView style={[styles.container]} edges={["left", "right"]}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        startsPictureInPictureAutomatically
      />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  video: { width: "100%", height: "100%", backgroundColor: "black" },
});
