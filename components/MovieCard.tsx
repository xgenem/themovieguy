import { blurhash } from "@/constants/blurhash";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import Space from "./ui/Space";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { title, name, poster_path: cover } = movie;
  const imageSource = `${process.env.EXPO_PUBLIC_TMDB_IMG_PATH}${cover}`;
  const displayTitle = title || name || "Unknown Title";

  return (
    <View
      style={{
        borderRadius: 15,
        margin: 10,
      }}
    >
      <Image
        source={imageSource}
        style={{
          width: 200,
          height: 300,
          borderRadius: 15,
        }}
        placeholder={{ blurhash: blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Space size={10} />
      <Text
        style={{
          fontWeight: "700",
        }}
      >
        {displayTitle}
      </Text>
    </View>
  );
}
