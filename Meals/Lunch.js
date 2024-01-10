import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MealDetails from './MealDetails';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Lunch = () => {
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

  const handleShowAllImages = () => {
    setSelectedImage(null); 
    setShowAllImages(true);
  };
  const navigation = useNavigation();
  const handleAddToPlan = () => {
    if (selectedImage) {
      console.log('Navigating to DaySelection with parameters:', {
        mealType: 'Lunch',
        mealName: selectedImage,
        addToPlan: handleAddToPlan,
      });
      navigation.navigate('DaySelection', { mealType: 'Lunch', mealName: selectedImage, addToPlan: handleAddToPlan });
    } else {
      console.warn('Please select a meal before adding to the plan.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select your Lunch</Text>

      <View >
        <TouchableOpacity onPress={() => handlePress('meatloaf')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'meatloaf' ,
              !showAllImages && selectedImage !== 'meatloaf' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/meatloaf.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('pizza')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'pizza',
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
    width: 130,
    height: 130,
    margin: 5,
  },
  hiddenImage: {
    display: 'none',
  },
  showAllButton: {
    marginVertical: 20,
  },
});

export default Lunch;
