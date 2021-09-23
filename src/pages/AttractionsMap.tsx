import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View , PermissionsAndroid ,SafeAreaView} from 'react-native';
import MapView, { Marker ,Callout } from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import Permission from 'expo-permissions';

interface Attraction {
    id : number ;
    name : string ; 
    latitude : number ;
    longitude : number ;

}

interface Region {
  latitude : number,
  longitude : number,
}



export default function AttractionMap(){
  const [attraction, setAttraction] = useState<Attraction[]>([]);
  const [region, setRegion] = useState<Region>();
 
 
  async function requestGeolocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        
        );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const location = await Location.getCurrentPositionAsync();

       
        
        console.log("You can use the geolocation")
      } else {
        console.log("Geolocation permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  
 

  async function feed() {
    const token = await AsyncStorage.getItem("my-Token");

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
    }, []);
    
    useEffect(() => {
      requestGeolocationPermission();
    }, []);
    

    const navigation = useNavigation() as any;

    function handleNavigateToCreateAttraction(){
        navigation.navigate('SelectMapPosition' );
    }

    function handleNavigateToDetails(id : number){
        navigation.navigate('AttractionsDetails' , {id});
    }

    if(!attraction){
      alert("carregando");
    }


    return (
        <View style={styles.container}>
          <MapView
          style={styles.map}
          provider='google'
          initialRegion={{
            latitude: region?.latitude || 2.8246016 ,
            longitude : region?.longitude || -60.6732288,
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
                    <View style = {styles.calloutContainer}>
                          <Text style = {styles.calloutText}>{attraction.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
          })}
          </MapView>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{attraction.length}</Text>
            <RectButton style={styles.createAttractionButton} onPress={handleNavigateToCreateAttraction}>
              <Feather name="plus" size={20} color="#111" />
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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 20 ,
      justifyContent: 'center',
      alignItems : 'center',
    },
  
    calloutText :{
      color:'#FFF',
      fontSize: 18 ,
      fontFamily : 'Nunito_700Bold',
      justifyContent : 'center',
      alignItems : 'center'
  
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
  
    createAttractionButton:{
      width : 56 ,
      height : 56 ,
      backgroundColor : '#FFD700',
      borderRadius :28,
      justifyContent :'center',
      alignItems : 'center'
    }
  
  });