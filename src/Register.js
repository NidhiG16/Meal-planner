import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Move the useNavigation hook outside of the userLogin function
  const navigation = useNavigation();

  const userLogin = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Get the user object from userCredential
      const user = userCredential.user;

      // Add additional user details to the Realtime Database
      const usersRef = firebase.database().ref('users'); // Assuming 'users' is the node in the Realtime Database
      usersRef.child(user.uid).set({
        name: name,
        age: age,
        gender: gender,
        email: email,
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', fontSize:26}}>
        Register
      </Text>
      <View style={{marginTop:40}}> 
      <TextInput
        style={styles.textInput}
        placeholder='Name'
        onChangeText={(name)=>setName(name)}
        autoCapitalize='none'
        autoCorrect={false}
        />
        <TextInput
        style={styles.textInput}
        placeholder='Age'
        onChangeText={(age)=>setAge(age)}
        autoCapitalize='none'
        autoCorrect={false}
        />
        <TextInput
        style={styles.textInput}
        placeholder='Gender'
        onChangeText={(gender)=>setGender(gender)}
        autoCapitalize='none'
        autoCorrect={false}
        />
        <TextInput
        style={styles.textInput}
        placeholder='Email'
        onChangeText={(email)=>setEmail(email)}
        autoCapitalize='none'
        autoCorrect={false}
        />
        <TextInput
        style={styles.textInput}
        placeholder='Password'
        onChangeText={(password)=>setPassword(password)}
        autoCapitalize='none'
        autoCorrect={false}
        
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>userLogin(email,password)}>
        <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
      </TouchableOpacity>
    </View>
  );

}

export default Register;
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:100
  },
  textInput:{
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:'#000',
    marginBottom:10,
    textAlign:'center'
  },
  button:{
    marginTop:30,
    width:100,
    height:50,
    backgroundColor:'#026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
  },
})