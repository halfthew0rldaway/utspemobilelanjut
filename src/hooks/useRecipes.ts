import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../api/recipeApi';
import { Recipe, RecipesResponse, SearchMode } from '../types/recipe';

/**
 * Hook TanStack Query untuk mengambil daftar resep masakan secara utuh.
 * Dilengkapi konfigurasi caching (staleTime 5 menit, gcTime 30 menit).
 */
export function useRecipesList() {
  return useQuery<RecipesResponse, Error>({
    queryKey: ['recipes', 'list'],
    queryFn: () => recipeApi.getRecipes(50, 0),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}

/**
 * Hook TanStack Query untuk pencarian resep melalui API (Server-side Search by Name).
 */
export function useRecipeSearch(query: string) {
  const trimmed = query.trim();
  return useQuery<RecipesResponse, Error>({
    queryKey: ['recipes', 'search', trimmed],
    queryFn: () => recipeApi.searchRecipesByName(trimmed),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}

/**
 * Hook TanStack Query untuk memuat data detail satu resep berdasarkan ID.
 */
export function useRecipeDetail(recipeId: number) {
  return useQuery<Recipe, Error>({
    queryKey: ['recipes', 'detail', recipeId],
    queryFn: () => recipeApi.getRecipeById(recipeId),
    enabled: Number.isInteger(recipeId) && recipeId > 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}

/**
 * Helper logika untuk menyaring daftar resep berdasarkan bahan makanan (Client-side Filter).
 * Digunakan karena DummyJSON /recipes/search?q= hanya mencakup nama dan tag resep di server.
 */
export function filterRecipesByIngredient(recipes: Recipe[], ingredientQuery: string): Recipe[] {
  const term = ingredientQuery.trim().toLowerCase();
  if (!term) return recipes;

  return recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(term)
    )
  );
}
