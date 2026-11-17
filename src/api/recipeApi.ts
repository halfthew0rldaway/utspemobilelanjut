import { Recipe, RecipesResponse } from '../types/recipe';

const BASE_URL = 'https://dummyjson.com/recipes';

/**
 * Service API untuk komunikasi dengan DummyJSON Recipes Endpoint.
 * Menyediakan fungsi untuk mengambil daftar resep, pencarian resep, dan detail resep.
 */
export const recipeApi = {
  /**
   * Mengambil daftar seluruh resep masakan dari REST API.
   * Endpoint: GET https://dummyjson.com/recipes?limit=50
   */
  async getRecipes(limit: number = 50, skip: number = 0): Promise<RecipesResponse> {
    const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Gagal memuat resep masakan (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Mencari resep masakan berdasarkan nama melalui server REST API.
   * Endpoint: GET https://dummyjson.com/recipes/search?q={query}
   */
  async searchRecipesByName(query: string): Promise<RecipesResponse> {
    const trimmed = query.trim();
    if (!trimmed) {
      return recipeApi.getRecipes();
    }
    const url = `${BASE_URL}/search?q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Gagal mencari resep "${trimmed}" (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Mengambil informasi detail resep masakan berdasarkan ID.
   * Endpoint: GET https://dummyjson.com/recipes/{id}
   */
  async getRecipeById(id: number): Promise<Recipe> {
    const url = `${BASE_URL}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Resep dengan ID ${id} tidak ditemukan (HTTP ${response.status})`);
    }
    return response.json();
  },
};
