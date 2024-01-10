import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MealDetails from './MealDetails';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Dinner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(true);

  const handlePress = (imageKey) => {
    if (selectedImage === imageKey) {
      setSelectedImage(null);
      setShowAllImages(true); 
    } else {
      setSelectedImage(imageKey);
      setShowAllImages(false); 
    }
  };
  const navigation = useNavigation();
  const handleAddToPlan = () => {
    if (selectedImage) {
      console.log('Navigating to DaySelection with parameters:', {
        mealType: 'Dinner',
        mealName: selectedImage,
        addToPlan: handleAddToPlan,
      });
      navigation.navigate('DaySelection', { mealType: 'Dinner', mealName: selectedImage, addToPlan: handleAddToPlan });
    } else {
      console.warn('Please select a meal before adding to the plan.');
    }
  };
  const handleShowAllImages = () => {
    setSelectedImage(null); 
    setShowAllImages(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select your Dinner</Text>

      <View >
        <TouchableOpacity onPress={() => handlePress('pizza')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'pizza' ,
              !showAllImages && selectedImage !== 'pizza' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/pizza.jpg')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('burger')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'burger' ,
              !showAllImages && selectedImage !== 'burger' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/burger.jpg')}
          />
          <Button onPress={handleAddToPlan} style={styles.button} title="Add to Plan"/>
        </TouchableOpacity>
      </View>

      {!showAllImages && (
        <View>
          {selectedImage && <MealDetails mealName={selectedImage}/>}
          <Button title="Show All Images" onPress={handleShowAllImages} style={styles.showAllButton} />
          </View>
        
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  image: {
    marginTop: 30,
    width: 100,
    height: 100,
    margin: 5,
  },
  hiddenImage: {
    display: 'none',
  },
  showAllButton: {
    marginVertical: 20,
  },
});

export default Dinner;
