import fetchTrailer from "@/api/trailer";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Trailer({ id, type }: { id?: number; type: string }) {
  const { width: deviceWidth } = Dimensions.get("window");
  const width = deviceWidth - 40;
  const height = width * 0.5625;

  const { data: trailer, isLoading } = useQuery({
    queryKey: ["trailer", id],
    queryFn: async () => fetchTrailer(`${id}`, type),
    select: (data) =>
      data.results
        .sort((a: Trailer, b: Trailer) => {
          // Sort by published_at date, newest first
          if (a.published_at && b.published_at) {
            return (
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
            );
          } else if (a.published_at) {
            return -1; // a has date, b doesn't, so a comes first
          } else if (b.published_at) {
            return 1; // b has date, a doesn't, so b comes first
          }
          // If neither has published_at, don't change order
          return 0;
        })
        .filter(
          (trailer: Trailer) =>
            trailer.site === "YouTube" && trailer.type === "Trailer"
        )[0] as Trailer,
  });

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

  if (isLoading || !id) {
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
    <View style={{ width, height, marginHorizontal: 20 }}>
      <WebView
        style={{ backgroundColor: "transparent", overflow: "hidden" }}
        scrollEnabled={false}
        source={{
          html: getHTMLContent(),
        }}
      />
    </View>
  );
}
