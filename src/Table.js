import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { firebase } from '../config';

const Table = () => {
  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.log('User is not authenticated. Handle accordingly.');
      setLoading(false);
      return;
    }

    const userId = user.uid;
    const userMealPlanRef = ref(getDatabase(), `users/${userId}/mealPlan`);

    const fetchMealPlan = (snapshot) => {
      // Log the raw snapshot data
      console.log('Raw snapshot data:', snapshot.val());

      // Set the meal plan state
      setMealPlan(snapshot.val() || {});
      setLoading(false);
    };

    const handleError = (error) => {
      console.error('Error retrieving meal plan:', error);
      setLoading(false);
    };

    // Listen for changes in real-time
    const unsubscribe = onValue(userMealPlanRef, fetchMealPlan, { errorCallBack: handleError });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(unsubscribe);
    };
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Define days and meal types
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meal Plan</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          {mealTypes.map((mealType) => (
            <View style={styles.cell} key={mealType}>
              <Text>{mealType}</Text>
            </View>
          ))}
        </View>

        {days.map((day) => (
          <View style={styles.row} key={day}>
            <View style={styles.cell}>
              <Text>{day}</Text>
            </View>
            {mealTypes.map((mealType) => (
              <View style={styles.cell} key={mealType}>
                <Text>
                  {mealPlan[mealType] && mealPlan[mealType][day] && mealPlan[mealType][day]}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Table;
