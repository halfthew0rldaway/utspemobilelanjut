import React from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Badge } from '../components/Badge';
import { ErrorState } from '../components/ErrorState';
import { RecipeDetailSkeleton } from '../components/LoadingSkeleton';
import { useRecipeDetail } from '../hooks/useRecipes';
import { RootStackParamList } from '../types/recipe';

type RouteProps = RouteProp<RootStackParamList, 'RecipeDetail'>;

export const RecipeDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const { recipeId } = route.params;

  const {
    data: recipe,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useRecipeDetail(recipeId);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <RecipeDetailSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          message={error?.message || 'Gagal memuat rincian resep.'}
          onRetry={handleRefresh}
        />
      </SafeAreaView>
    );
  }

  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={handleRefresh}
            colors={['#C2410C']}
            tintColor="#C2410C"
          />
        }
      >
        {/* Foto Resep */}
        <View style={styles.heroImageWrapper}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Informasi Utama Resep */}
        <View style={styles.mainInfoCard}>
          <Text style={styles.title}>{recipe.name}</Text>

          <View style={styles.badgeRow}>
            {recipe.cuisine ? (
              <Badge label={recipe.cuisine} variant="primary" />
            ) : null}
            {recipe.difficulty ? (
              <Badge
                label={`Tingkat: ${recipe.difficulty}`}
                variant={recipe.difficulty === 'Easy' ? 'accent' : 'warning'}
              />
            ) : null}
            {totalTime > 0 ? (
              <Badge label={`⏱ ${totalTime} menit`} variant="secondary" />
            ) : null}
          </View>

          {/* Grid Statistik Ringkas */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Persiapan</Text>
              <Text style={styles.statValue}>
                {recipe.prepTimeMinutes ? `${recipe.prepTimeMinutes} mnt` : '-'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Memasak</Text>
              <Text style={styles.statValue}>
                {recipe.cookTimeMinutes ? `${recipe.cookTimeMinutes} mnt` : '-'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Porsi</Text>
              <Text style={styles.statValue}>
                {recipe.servings ? `${recipe.servings} org` : '-'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Kalori</Text>
              <Text style={styles.statValue}>
                {recipe.caloriesPerServing ? `${recipe.caloriesPerServing} kkal` : '-'}
              </Text>
            </View>
          </View>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsLabel}>Kategori / Tag:</Text>
              <View style={styles.tagsRow}>
                {recipe.tags.map((tag, idx) => (
                  <View key={`tag-${idx}`} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Bagian Bahan-Bahan */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
            <Text style={styles.sectionSubtitle}>
              {recipe.ingredients.length} bahan
            </Text>
          </View>

          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={`ing-${index}`} style={styles.ingredientItem}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bagian Langkah-Langkah Memasak */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Langkah Memasak</Text>
            <Text style={styles.sectionSubtitle}>
              {recipe.instructions.length} tahap
            </Text>
          </View>

          <View style={styles.instructionsList}>
            {recipe.instructions.map((step, index) => (
              <View key={`step-${index}`} style={styles.instructionStep}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepInstructionText}>{step}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroImageWrapper: {
    width: '100%',
    height: 250,
    backgroundColor: '#E2E8F0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  mainInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tagsContainer: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  tagsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagPillText: {
    fontSize: 11,
    color: '#475569',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  ingredientsList: {
    gap: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C2410C',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    flex: 1,
  },
  instructionsList: {
    gap: 14,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C2410C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepInstructionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
});
