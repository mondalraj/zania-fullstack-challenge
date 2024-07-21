"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function TanStackQueryWrapper({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
