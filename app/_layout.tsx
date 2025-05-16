import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          title: "The Movie Guy",
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
            presentation: "modal",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
