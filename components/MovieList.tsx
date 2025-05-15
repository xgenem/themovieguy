import { fetchAllMovies } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

export default function MovieList() {
  const { data: movies } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchAllMovies,
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Movies</Text>
    </View>
  );
}
