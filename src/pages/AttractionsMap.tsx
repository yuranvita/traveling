import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE ,Callout} from 'react-native-maps'
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Attraction {
    id : number ;
    name : string ; 
    latitude : number ;
    longitude : number ;

}


export default function AttractionMap(){
   

  // const [token, setToken] = useState("");
  
  // const load = async () => {
  //   let token = await AsyncStorage.getItem("myToken");

  //   if(token !== null){
  //     setToken(token);
  //   }
  // }
  
 
  

  const [attraction, setAttraction] = useState<Attraction[]>([]);



  async function feed() {
    const token = await AsyncStorage.getItem("myToken");
      api.get('/attractions' , {
        headers : {
          "authorization" : "Bearer "+token,
        }
      }).then(response =>{
          setAttraction(response.data);
      });


    };
  
    useEffect(()=>{
      feed();
    })
   
    

    const navigation = useNavigation();

    function handleNavigateToCreateAttraction(){
        navigation.navigate('SelectMapPosition');
    }

    function handleNavigateToDetails(id : number){
        navigation.navigate('AttractionsDetails' , {id});
    }



    return (
      <View style={styles.container}>
        <MapView
         
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType='terrain'
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: 2.8246016,
          longitude : -60.6732288,
          latitudeDelta : 0.008,
          longitudeDelta : 0.008,
        }}
        
        >
        {attraction.map(attraction =>{
            return (
                <Marker
                key={attraction.id}
                icon={mapMarker}
                calloutAnchor={{
                  x:2.7,
                  y:0.8,
                }}
                coordinate={{
                  latitude: attraction.latitude,
                  longitude : attraction.longitude,
                }}
              >
                <Callout tooltip onPress={()=>{handleNavigateToDetails(attraction.id)}}>
                  <View style = {  styles.calloutContainer}>
                        <Text style = {styles.calloutText}>{attraction.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
        })}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{attraction.length}</Text>
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateAttraction}>
            <Feather name="plus" size={20} color="#fff" />
          </RectButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    map: {
      height : Dimensions.get('window').height,
      width : Dimensions.get('window').width,
    },
  
    calloutContainer:{
      width:168 ,
      height:46,
      paddingHorizontal:16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius:16 ,
      justifyContent: 'center',
  
    },
  
    calloutText :{
      color:'#8089a5',
      fontSize: 14 ,
      fontFamily : 'Nunito_700Bold',
  
    },
  
    footer :{
      position : 'absolute',
      left : 24 ,
      right :24 ,
      bottom : 32 ,
  
      backgroundColor: '#FFF',
      borderRadius : 20,
      height :56,
      paddingLeft:24,
  
      flexDirection: 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      elevation : 3,
    },
  
    footerText : {
      color : '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton:{
      width : 56 ,
      height : 56 ,
      backgroundColor : '#15c3d6',
      borderRadius :28,
  
      justifyContent :'center',
      alignItems : 'center'
  
  
    }
  
  });