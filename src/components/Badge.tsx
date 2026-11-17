import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'secondary',
  style,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
      case 'accent':
        return {
          container: styles.accentContainer,
          text: styles.accentText,
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
        };
      default:
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
    }
  };

  const current = getBadgeStyle();

  return (
    <View style={[styles.baseBadge, current.container, style]}>
      <Text style={[styles.baseText, current.text]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  baseText: {
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryContainer: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  secondaryText: {
    color: '#475569',
  },
  primaryContainer: {
    backgroundColor: '#C2410C',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  accentContainer: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderWidth: 1,
  },
  accentText: {
    color: '#15803D',
  },
  warningContainer: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  warningText: {
    color: '#B45309',
  },
});
