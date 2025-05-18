import fetchTrailer from "@/api/trailer";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Trailer() {
  const { width } = Dimensions.get("window");
  const height = width * 0.5625;

  const { id, type } = useLocalSearchParams<{
    id: string;
    type: string;
  }>();

  console.log("id", id);
  console.log("type", type);

  const { data: trailer, isLoading } = useQuery({
    queryKey: ["trailer", id],
    queryFn: async () => fetchTrailer(id, type),
    select: (data) =>
      data.results.find(
        (i: Trailer) => i.name === "Official Trailer" && i.type === "Trailer"
      ) as Trailer,
  });

  useEffect(() => {
    console.log(
      "trailer",
      trailer
      // trailer?.find((i: Trailer) => i.name === "OfficialTrailer")
    );
  }, [trailer]);

  const getHTMLContent = () => {
    return `
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/${trailer?.key}?si=qD4mns8ZeqCW5trC&amp;controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
    `;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width, height }}>
        <WebView
          style={{ flex: 1, backgroundColor: "#000" }}
          javaScriptEnabled={true}
          onLayout={(e) => {
            console.log("onLayout", e.nativeEvent.layout.width);
          }}
          source={{
            html: getHTMLContent(),
          }}
        />
      </View>
    </View>
  );
}
