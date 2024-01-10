import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MealDetails from './MealDetails';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Breakfast = () => {
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
        mealType: 'Breakfast',
        mealName: selectedImage,
        addToPlan: handleAddToPlan,
      });
      navigation.navigate('DaySelection', { mealType: 'Breakfast', mealName: selectedImage, addToPlan: handleAddToPlan });
    } else {
      console.warn('Please select a meal before adding to the plan.');
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select your breakfast</Text>

      <View >
        <TouchableOpacity onPress={() => handlePress('pancake')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'pancake' ,
              !showAllImages && selectedImage !== 'pancake' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/pancake.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('avocado')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'avocado',
              !showAllImages && selectedImage !== 'avocado' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/avocado.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('waffles')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'waffles' ,
              !showAllImages && selectedImage !== 'waffles' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/waffles.jpg')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('eggs benedict')}>
          <Image
            style={[
              styles.image,
              selectedImage === 'eggs benedict' ,
              !showAllImages && selectedImage !== 'eggs benedict' && styles.hiddenImage,
            ]}
            source={require('/home/nidhighatge/MealPlanner/assets/eggs.jpg')}
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
    marginTop: 20,
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
  button:{
    marginVertical: 30,
    width:100,
  },
});

export default Breakfast;
