import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { firebase } from '../config';

const MealDetails = ({ mealName }) => {
  const [meal, setMeal] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    // Check if the user is authenticated
    const user = firebase.auth().currentUser;

    if (user) {
      // User is authenticated, proceed with fetching meal data
      const mealsRef = ref(getDatabase(), 'meals');
      const mealRef = child(mealsRef, mealName);

      get(mealRef).then((snapshot) => {
        if (snapshot.exists()) {
          const mealData = snapshot.val();
          setMeal(mealData);

          // Calculate total calories for the ingredients
          const total = Object.values(mealData.ingredients).reduce(
            (sum, ingredient) => sum + ingredient.calories,
            0
          );
          setTotalCalories(total);
        } else {
          console.log(`No data found for meal: ${mealName}`);
        }
      }).catch((error) => {
        console.error('Error retrieving meal data:', error);
      });
    } else {
      // User is not authenticated, handle accordingly (e.g., show a message or redirect to login)
      console.log('User is not authenticated. Handle accordingly.');
    }
  }, [mealName]);

  return (
    <View>
      <Text>Recipe for {mealName}</Text>
      {meal && (
        <View>
          <Text>Ingredients: </Text>
          {Object.values(meal.ingredients).map((ingredient) => (
            <View key={ingredient.name}>
              <Text>{ingredient.name}</Text>
              <Text>Calories: {ingredient.calories}</Text>
            </View>
          ))}
          {/* Display total calories */}
          <Text>Total Calories: {totalCalories}</Text>
        </View>
      )}
    </View>
  );
};

export default MealDetails;
