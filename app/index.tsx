import { fetchAllMovies } from "@/api/movies";
import ShowCard from "@/components/ShowCard";
import Button from "@/components/ui/Button";
import Space from "@/components/ui/Space";
import { ShowTypes } from "@/constants/showTypes";
import { Colors } from "@/theme/colors";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [filter, setFilter] = useState<ShowType>(ShowTypes.MOVIE);
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", filter],
    queryFn: async () => await fetchAllMovies(filter),
    select: (data) => data.results as Show[],
  });

  const onSelectFilter = (filter: ShowType) => {
    setFilter(filter);
  };

  const handlePressMovie = useCallback(
    (id: number) => {
      if (filter === "movie") {
        router.push(`/movies/${id}`);
      } else {
        router.push(`/tv/${id}`);
      }
    },
    [filter, router]
  );

  const renderItem = useCallback<ListRenderItem<Show>>(
    ({ item }) => (
      <Pressable key={item.id} onPress={() => handlePressMovie(item.id)}>
        <ShowCard show={item} />
      </Pressable>
    ),
    [handlePressMovie]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <FlashList
      data={movies}
      renderItem={renderItem}
      estimatedItemSize={200}
      contentContainerStyle={{
        backgroundColor: Colors.BACKGROUND,
        paddingBottom: 100,
      }}
      ListHeaderComponent={<Filters filter={filter} onPress={onSelectFilter} />}
      showsVerticalScrollIndicator={false}
      numColumns={2}
    />
  );
}

const Filters = ({
  filter,
  onPress,
}: {
  filter: ShowType;
  onPress: (filter: ShowType) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        // justifyContent: "space-around",
        padding: 10,
      }}
    >
      <Button.Primary
        title="Movie"
        active={filter === ShowTypes.MOVIE}
        onPress={() => onPress(ShowTypes.MOVIE)}
      />
      <Space size={10} />
      <Button.Primary
        title="TV"
        active={filter === ShowTypes.TV}
        onPress={() => onPress(ShowTypes.TV)}
      />
    </View>
  );
};
