import { View, Text ,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import DaySelection from '../Meals/DaySelection'

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate('Breakfast')}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Breakfast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate('Lunch')}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Lunch</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate('Dinner')}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Dinner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate('Table')}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Meal Plan</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  button:{
    marginTop:40,
    width:100,
    height:50,
    backgroundColor:'#026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
  },
})
export default Dashboard