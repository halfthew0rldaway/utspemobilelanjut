import React from 'react';
import { StyleSheet, View } from 'react-native';

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.contentContainer}>
        <View style={styles.lineTitle} />
        <View style={styles.lineSubtitle} />
        <View style={styles.badgeRow}>
          <View style={styles.badgePlaceholder} />
          <View style={styles.badgePlaceholderSmall} />
        </View>
      </View>
    </View>
  );
};

export const LoadingSkeletonList: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={`skeleton-${index}`} />
      ))}
    </View>
  );
};

export const RecipeDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailImagePlaceholder} />
      <View style={styles.detailBody}>
        <View style={styles.lineTitleLong} />
        <View style={styles.badgeRow}>
          <View style={styles.badgePlaceholder} />
          <View style={styles.badgePlaceholder} />
          <View style={styles.badgePlaceholder} />
        </View>
        <View style={styles.sectionHeaderPlaceholder} />
        <View style={styles.lineParagraph} />
        <View style={styles.lineParagraph} />
        <View style={styles.lineParagraphShort} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E2E8F0',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  lineTitle: {
    height: 16,
    width: '85%',
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  lineSubtitle: {
    height: 12,
    width: '50%',
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badgePlaceholder: {
    height: 20,
    width: 65,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  badgePlaceholderSmall: {
    height: 20,
    width: 50,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  detailImagePlaceholder: {
    width: '100%',
    height: 240,
    backgroundColor: '#E2E8F0',
  },
  detailBody: {
    padding: 16,
  },
  lineTitleLong: {
    height: 24,
    width: '75%',
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    marginBottom: 14,
  },
  sectionHeaderPlaceholder: {
    height: 18,
    width: '40%',
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginTop: 24,
    marginBottom: 12,
  },
  lineParagraph: {
    height: 14,
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginBottom: 8,
  },
  lineParagraphShort: {
    height: 14,
    width: '70%',
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
  },
});
