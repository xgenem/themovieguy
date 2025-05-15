import MovieList from "@/components/MovieList";
import React, { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  return (
    <Suspense fallback={<Loading />}>
      <MovieList />
    </Suspense>
  );
}

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#003f02" />
    </View>
  );
}
