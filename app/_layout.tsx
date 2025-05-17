import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 1000,
    },
  },
});

export default function RootLayout() {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          title: "The Movie Guy by xgenem",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerBlurEffect: undefined,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            animation: "fade",
            headerTransparent: true,
            headerTitle: "",
            headerBackVisible: false,
            headerRight: () => {
              return (
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="close" size={28} color="#fff" />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="tv/[id]"
          options={{
            animation: "fade",
            headerTransparent: true,
            headerTitle: "",
            headerBackVisible: false,
            headerRight: () => {
              return (
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="close" size={28} color="#fff" />
                </Pressable>
              );
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
