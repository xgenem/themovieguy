import { blurhash } from "@/constants/blurhash";
import { Colors } from "@/theme/colors";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import Space from "./ui/Space";

export default function ShowCard({ show }: { show: Show }) {
  const { title, name, poster_path: cover } = show;
  const imageSource = `${process.env.EXPO_PUBLIC_TMDB_IMG_PATH}${cover}`;
  const displayTitle = title || name || "Unknown Title";

  return (
    <View
      style={{
        borderRadius: 15,
        margin: 10,
      }}
    >
      <View>
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
        <View
          style={{
            position: "absolute",
            width: 45,
            height: 45,
            bottom: -20,
            left: 10,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: Colors.PRIMARY,
            borderWidth: 3,
            padding: 5,
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {(show.vote_average * 10).toFixed(0)}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 8,
                fontWeight: "bold",
              }}
            >
              %
            </Text>
          </View>
        </View>
      </View>
      <Space size={25} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {displayTitle}
      </Text>
      <Text>{dayjs(show.release_date).format("MMM D, YYYY")}</Text>
    </View>
  );
}
