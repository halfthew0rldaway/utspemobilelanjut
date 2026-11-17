import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import { RecipeListScreen } from '../screens/RecipeListScreen';
import { RootStackParamList } from '../types/recipe';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#C2410C',
        headerTitleStyle: {
          fontWeight: '700',
          color: '#0F172A',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}
    >
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{
          headerShown: false, // Custom safe area header implemented in screen
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={({ route }) => ({
          title: route.params.recipeTitle || 'Detail Resep',
          headerBackTitle: 'Kembali',
        })}
      />
    </Stack.Navigator>
  );
};
