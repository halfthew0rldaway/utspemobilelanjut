import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchMode } from '../types/recipe';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  searchMode: SearchMode;
  onSelectMode: (mode: SearchMode) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  searchMode,
  onSelectMode,
  placeholder,
}) => {
  const dynamicPlaceholder =
    placeholder ||
    (searchMode === 'name'
      ? 'Cari nama resep (contoh: Pizza, Pasta)...'
      : 'Cari bahan makanan (contoh: Cheese, Garlic)...');

  return (
    <View style={styles.container}>
      {/* Input Field Container */}
      <View style={styles.inputWrapper}>
        <Text style={styles.searchIconText}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={dynamicPlaceholder}
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Hapus pencarian"
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mode Selector Tabs */}
      <View style={styles.modeRow}>
        <TouchableOpacity
          style={[
            styles.modeChip,
            searchMode === 'name' && styles.modeChipActive,
          ]}
          onPress={() => onSelectMode('name')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.modeChipText,
              searchMode === 'name' && styles.modeChipTextActive,
            ]}
          >
            Nama Resep (API)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeChip,
            searchMode === 'ingredient' && styles.modeChipActive,
          ]}
          onPress={() => onSelectMode('ingredient')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.modeChipText,
              searchMode === 'ingredient' && styles.modeChipTextActive,
            ]}
          >
            Bahan Makanan (Filter)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIconText: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
  },
  clearButtonText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
  },
  modeRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  modeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modeChipActive: {
    backgroundColor: '#C2410C',
    borderColor: '#C2410C',
  },
  modeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  modeChipTextActive: {
    color: '#FFFFFF',
  },
});
