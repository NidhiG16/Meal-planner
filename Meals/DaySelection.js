import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { firebase } from '../config';

const DaySelection = ({ route, navigation }) => {
  const { mealType, mealName } = route.params;
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleAddToPlan = () => {
    if (selectedDay && currentUser) {
      const userMealPlanRef = ref(getDatabase(), `users/${currentUser.uid}/mealPlan/${mealType}/${selectedDay}`);
      const newData = mealName;

      set(userMealPlanRef, newData)
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Error adding meal to plan:', error);
        });
    } else {
      console.warn('Please select a day before adding to the plan');
    }
  };

  return (
    <View>
      <Text>Select a day for {mealType}</Text>
      <Button title="Sunday" onPress={() => handleDaySelect('Sunday')} />
      <Button title="Monday" onPress={() => handleDaySelect('Monday')} />
      <Button title="Tuesday" onPress={() => handleDaySelect('Tuesday')} />
      <Button title="Wednesday" onPress={() => handleDaySelect('Wednesday')} />
      <Button title="Thursday" onPress={() => handleDaySelect('Thursday')} />
      <Button title="Friday" onPress={() => handleDaySelect('Friday')} />
      <Button title="Saturday" onPress={() => handleDaySelect('Saturday')} />
      <Button title="Add to Plan" onPress={handleAddToPlan} />
    </View>
  );
};

export default DaySelection;
