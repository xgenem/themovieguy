import { fetchAllMovies } from "@/api/movies";
import MovieCard from "@/components/MovieCard";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, Pressable, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [filter, setFilter] = useState("tv");
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", filter],
    queryFn: async () => await fetchAllMovies(filter),
    select: (data) => data.results as Movie[],
  });

  const onSelectFilter = (filter: string) => {
    setFilter(filter);
  };

  const handlePressMovie = useCallback(
    (movieId: number) => {
      console.log("Movie ID", movieId);
      router.push(`/movies/${movieId}`);
    },
    [router]
  );

  const renderItem = useCallback<ListRenderItem<Movie>>(
    ({ item }) => (
      <Pressable key={item.id} onPress={() => handlePressMovie(item.id)}>
        <MovieCard movie={item} />
      </Pressable>
    ),
    [handlePressMovie]
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
      ListHeaderComponent={<Filters onPress={onSelectFilter} />}
      showsVerticalScrollIndicator={false}
      numColumns={2}
    />
  );
}

const Filters = ({ onPress }: { onPress: (filter: string) => void }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <Button title="TV" onPress={() => onPress("tv")} />
      <Button title="Movies" onPress={() => onPress("movie")} />
    </View>
  );
};
