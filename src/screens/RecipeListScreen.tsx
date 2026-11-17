import React, { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingSkeletonList } from '../components/LoadingSkeleton';
import { RecipeCard } from '../components/RecipeCard';
import { SearchBar } from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import {
  filterRecipesByIngredient,
  useRecipeSearch,
  useRecipesList,
} from '../hooks/useRecipes';
import { Recipe, RootStackParamList, SearchMode } from '../types/recipe';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecipeList'>;

export const RecipeListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // State untuk pencarian
  const [inputText, setInputText] = useState<string>('');
  const [searchMode, setSearchMode] = useState<SearchMode>('name');
  const debouncedQuery = useDebounce(inputText, 400);

  // TanStack Query: Mengambil data daftar seluruh resep
  const listQuery = useRecipesList();

  // TanStack Query: Mengambil hasil pencarian nama via API server jika mode 'name' aktif dan ada kata kunci
  const isServerSearchActive = searchMode === 'name' && debouncedQuery.trim().length > 0;
  const searchQuery = useRecipeSearch(isServerSearchActive ? debouncedQuery : '');

  // Menentukan sumber data utama berdasarkan mode pencarian
  const activeQuery = isServerSearchActive ? searchQuery : listQuery;
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;
  const errorMessage = activeQuery.error?.message;
  const isFetching = activeQuery.isFetching;

  // Menentukan daftar resep yang akan ditampilkan
  const displayedRecipes: Recipe[] = useMemo(() => {
    // Mode 1: Pencarian Nama via Server API
    if (isServerSearchActive) {
      return searchQuery.data?.recipes || [];
    }

    const allRecipes = listQuery.data?.recipes || [];

    // Mode 2: Pencarian Bahan Makanan via Client-side Filter
    if (searchMode === 'ingredient' && debouncedQuery.trim().length > 0) {
      return filterRecipesByIngredient(allRecipes, debouncedQuery);
    }

    // Default: Tampilkan seluruh resep
    return allRecipes;
  }, [
    isServerSearchActive,
    searchQuery.data,
    listQuery.data,
    searchMode,
    debouncedQuery,
  ]);

  // Handler Refresh
  const handleRefresh = () => {
    if (isServerSearchActive) {
      searchQuery.refetch();
    } else {
      listQuery.refetch();
    }
  };

  const handleClearSearch = () => {
    setInputText('');
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    navigation.navigate('RecipeDetail', {
      recipeId: recipe.id,
      recipeTitle: recipe.name,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>Resep Nusantara</Text>
          <Text style={styles.brandSubtitle}>
            Koleksi Resep & Panduan Memasak Harian
          </Text>
        </View>
      </View>

      {/* Search Bar with Mode Toggle */}
      <SearchBar
        value={inputText}
        onChangeText={setInputText}
        onClear={handleClearSearch}
        searchMode={searchMode}
        onSelectMode={(mode) => {
          setSearchMode(mode);
        }}
      />

      {/* Status Bar Informasi Pencarian / Hasil */}
      <View style={styles.infoBar}>
        <Text style={styles.infoBarText}>
          {searchMode === 'name' && isServerSearchActive
            ? `Hasil pencarian nama: "${debouncedQuery}" (${displayedRecipes.length} resep)`
            : searchMode === 'ingredient' && debouncedQuery.trim().length > 0
            ? `Filter bahan makanan: "${debouncedQuery}" (${displayedRecipes.length} resep)`
            : `Menampilkan ${displayedRecipes.length} resep pilihan`}
        </Text>
        {isFetching && !isLoading && (
          <Text style={styles.syncingText}>Memperbarui...</Text>
        )}
      </View>

      {/* Konten Utama */}
      {isLoading ? (
        <LoadingSkeletonList count={5} />
      ) : isError ? (
        <ErrorState
          message={errorMessage || 'Terjadi gangguan koneksi ke server resep.'}
          onRetry={handleRefresh}
        />
      ) : (
        <FlatList
          data={displayedRecipes}
          keyExtractor={(item) => `recipe-${item.id}`}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => handleSelectRecipe(item)}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            displayedRecipes.length === 0 && styles.listContentEmpty,
          ]}
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={handleRefresh}
              colors={['#C2410C']}
              tintColor="#C2410C"
            />
          }
          ListEmptyComponent={
            <EmptyState
              title={
                debouncedQuery.trim()
                  ? 'Tidak Ada Resep yang Cocok'
                  : 'Katalog Resep Kosong'
              }
              message={
                debouncedQuery.trim()
                  ? `Tidak menemukan resep untuk "${debouncedQuery}". Silakan coba kata kunci lain atau ganti mode pencarian.`
                  : 'Belum ada data resep yang tersedia saat ini.'
              }
              actionLabel={debouncedQuery.trim() ? 'Reset Pencarian' : 'Muat Ulang'}
              onAction={
                debouncedQuery.trim() ? handleClearSearch : handleRefresh
              }
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
  },
  infoBarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  syncingText: {
    fontSize: 11,
    color: '#C2410C',
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 12,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
