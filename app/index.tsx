import { fetchAllMovies } from "@/api/movies";
import MovieCard from "@/components/MovieCard";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchAllMovies,
    select: (data) => data.results as Movie[],
  });

  const renderItem = useCallback<ListRenderItem<Movie>>(
    ({ item }) => <MovieCard key={item.id} movie={item} />,
    []
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#003f02" />
      </View>
    );
  }

  return (
    <FlashList
      data={movies}
      extraData={movies}
      renderItem={renderItem}
      estimatedItemSize={200}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      numColumns={2}
    />
  );
}
