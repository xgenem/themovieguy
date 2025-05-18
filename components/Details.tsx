import { blurhash } from "@/constants/blurhash";
import { Colors } from "@/theme/colors";
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
import Trailer from "./Trailer";
import Space from "./ui/Space";

export default function Details({
  isLoading,
  show,
  type,
}: {
  isLoading: boolean;
  show?: Show;
  type: string;
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
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#00000055" }}>
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
              {show?.name || show?.title || ""} (
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
          <Space size={20} />

          {/* <View
            style={{
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Button.Secondary
              iconLeft={<Ionicons name="play" size={50} color="#fff" />}
              title="Play Trailer"
              onPress={() => {
                router.push(`/trailer/${show?.id}?type=${type}`);
              }}
            />
          </View> */}
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: Colors.WHITE,
              }}
            >
              Watch Trailer:
            </Text>
          </View>
          <Space size={8} />
          <Trailer id={show?.id} type={type} />
          <Space size={100} />
        </ScrollView>
      )}
    </ImageBackground>
  );
}
