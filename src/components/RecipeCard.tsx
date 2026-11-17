import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Recipe } from '../types/recipe';
import { Badge } from './Badge';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  const totalCookingMinutes = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const timeDisplay = totalCookingMinutes > 0 ? `${totalCookingMinutes} mnt` : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`Resep ${recipe.name}`}
    >
      {/* Recipe Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>

      {/* Recipe Information */}
      <View style={styles.infoWrapper}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {recipe.name}
        </Text>

        <View style={styles.metaRow}>
          {recipe.cuisine ? (
            <Badge label={recipe.cuisine} variant="secondary" />
          ) : null}

          {timeDisplay ? (
            <Badge label={`⏱ ${timeDisplay}`} variant="accent" />
          ) : null}

          {recipe.difficulty ? (
            <Badge
              label={recipe.difficulty}
              variant={recipe.difficulty === 'Easy' ? 'accent' : 'warning'}
            />
          ) : null}
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.servingText}>
            🍽 {recipe.servings} porsi
          </Text>
          {recipe.rating ? (
            <Text style={styles.ratingText}>
              ★ {recipe.rating.toFixed(1)}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: 105,
    height: 105,
    backgroundColor: '#E2E8F0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  infoWrapper: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  servingText: {
    fontSize: 12,
    color: '#64748B',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
});
