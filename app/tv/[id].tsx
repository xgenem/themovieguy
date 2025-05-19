import { fetchDetails } from "@/api/movies";
import Details from "@/components/Details";
import { ShowTypes } from "@/constants/showTypes";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["tv", id],
    queryFn: async () => fetchDetails(id, "tv"),
    select: (data) => data as Show,
  });

  return <Details isLoading={isLoading} show={data} type={ShowTypes.TV} />;
}
