import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const { Navigator , Screen} = createStackNavigator();

import AttractionsMap from './pages/AttractionsMap';
import AttractionsDetails from './pages/AttractionsDetails';
import AttractionData from './pages/CreateAttractions/AttractionData';
import SelectMapPosition from './pages/CreateAttractions/SelectMapPosition';
import Header from './components/Header';
import NavigationOnCard from './components/NavigationOnCard';
import AttractionsCard from './pages/AttractionsCard';
import Login from './pages/Login';
import SignUp from './pages/SignUp' ;
export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown : false , cardStyle : {backgroundColor:'#f2f3f5'}}}>
               
                <Screen
                name="Login"
                component={Login}
                options={{
                    headerShown : false,
                }}
                />
                 <Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown : false,
                }}
                />
                <Screen 
                name="AttractionsMap"
                component={AttractionsMap}
                options={{
                    headerShown : true ,
                    header: ()=> <NavigationOnCard showCancel={false} title="Mapa"/>
                }}/>
                <Screen 
                name="AttractionsCard" 
                component={AttractionsCard}
                options={{
                    headerShown : true,
                    header: ()=> <NavigationOnCard showCancel={true} title="Feed"/>
                }}
                />
                <Screen 
                name="AttractionsDetails" 
                component={AttractionsDetails} 
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Atração" />
                }}/>
                <Screen name="AttractionData" component={AttractionData} 
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os Dados"/>
                }}/>
                <Screen name="SelectMapPosition" component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa"/>
                }}/>


            </Navigator>
        </NavigationContainer>
    );
}
