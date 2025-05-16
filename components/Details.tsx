import { blurhash } from "@/constants/blurhash";
import dayjs from "dayjs";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Space from "./ui/Space";

export default function Details({
  isLoading,
  show,
}: {
  isLoading: boolean;
  show?: Show;
}) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const backdrop = `${process.env.EXPO_PUBLIC_TMDB_IMG_PATH}${show?.backdrop_path}`;
  const poster = `${process.env.EXPO_PUBLIC_TMDB_IMG_PATH}${show?.poster_path}`;

  return (
    <ImageBackground
      source={backdrop}
      style={{
        flex: 1,
      }}
      blurRadius={10}
      placeholder={{ blurhash: blurhash }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#00000055" }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <Space size={insets.top + 50} />
            <Image
              source={poster}
              style={{
                width: width - 40,
                height: 600,
                borderRadius: 15,
              }}
              // placeholder={{ blurhash: blurhash }}
              transition={1000}
              contentFit="contain"
            />
            <Space size={16} />
            <Text
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {show?.media_type === "tv" ? show?.name : show?.title} (
              {dayjs(show?.release_date).year()})
            </Text>
            <Space size={16} />
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
              }}
            >
              {show?.overview}
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
