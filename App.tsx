import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';

// Inisialisasi QueryClient TanStack Query dengan konfigurasi server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data dianggap segar selama 5 menit
      gcTime: 1000 * 60 * 30, // Data disimpan di cache memori selama 30 menit
      retry: 2, // Coba ulang maksimal 2 kali jika request gagal
      refetchOnWindowFocus: false, // Menghindari refetch berlebihan saat pergantian window
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
