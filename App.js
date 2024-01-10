import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React,{useState,useEffect} from 'react';
import {firebase} from './config';
import {db} from './config';

import Login from './src/Login';
import Register from "./src/Register";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";
import Breakfast from "./Meals/Breakfast";
import Lunch from "./Meals/Lunch";
import Dinner from "./Meals/Dinner";
import DaySelection from "./Meals/DaySelection";
import Table from "./src/Table";


const Stack = createStackNavigator();

function App(){
  const [initializing,setInitializing] = useState(true);
  const [user,setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    },[]);

    if(initializing) return null;

    if(!user){
        return(
            <Stack.Navigator>
                <Stack.Screen
                name="Login"
                component={Login}
                options = {{
                    headerTitle: () =><Header name="Meal Planner"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                />
                <Stack.Screen
                name="Register"
                component={Register}
                options = {{
                    headerTitle: () =><Header name="Meal Planner"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                />
                
            </Stack.Navigator>
            
        );
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options = {{
                    headerTitle: () =><Header name="Dashboard"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                />
                <Stack.Screen
                name="Breakfast"
                component={Breakfast}
                options = {{
                    headerTitle: () =><Header name="Breakfast"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                />
                <Stack.Screen
                name="Lunch"
                component={Lunch}
                options = {{
                    headerTitle: () =><Header name="Lunch"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                />
                <Stack.Screen
                name="Dinner"
                component={Dinner}
                options = {{
                    headerTitle: () =><Header name="Dinner"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                
                />
               <Stack.Screen
                name="DaySelection"
                component={DaySelection}
                options = {{
                    headerTitle: () =><Header name="DaySelection"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                
                />
                <Stack.Screen
                name="Table"
                component={Table}
                options = {{
                    headerTitle: () =><Header name="Table"/>,
                    headerStyle:{
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor:"#00e4d0",
                        shadowColor:"#000",
                        elevation:25
                    }
                }}
                
                />
        </Stack.Navigator>
        
    );

}
export default () =>{
    return (
        <NavigationContainer>
        <App />
    </NavigationContainer>
    );
}

