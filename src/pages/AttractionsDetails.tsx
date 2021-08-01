import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import mapMarkerImg from '../images/map-marker.png';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { ImageStore } from 'react-native';


interface AttractionDetailsParamsID{
  id : number ;
}

interface Attraction {
  id : number ;
  name : string;
  latitude : number;
  longitude : number ;
  about : string ;
  instruction : string ;
  opening_hours : string ;
  open_on_weekends : boolean;
  whatsapp : string;
  images : Array<{
    id: number;
    url : string;
  }>;
}


export default function AttractionsDetails() {

  function handleOpenGoogleMapsRoutes(){
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${attraction?.latitude},${attraction?.longitude}`)
  }

  function handleOpenWhatsAppSendMessage(){
    Linking.openURL(`https://api.whatsapp.com/send?phone=55${attraction?.whatsapp}&text=Olá,Tudo Bem?`)
  }


  // const [token, setToken] = useState("");
  
  // const load = async () => {
  //   let token = await AsyncStorage.getItem("myToken");

  //   if(token !== null){
  //     setToken(token);
  //   }
  // }
 
  
  
  const route = useRoute();

  const params = route.params as AttractionDetailsParamsID;
  const [attraction , setAttraction] = useState<Attraction>();



  async function data() {
    const token = await AsyncStorage.getItem("myToken");
    api.get(`attractions/${params.id}` , { headers : {"authorization":"Bearer "+token}}).then(Response =>{
      setAttraction(Response.data);
    })
  }

  
    useEffect(()=>{
      data()
    }, [params.id]);
  
 

  if(!attraction) {
    <View style={styles.container}>
      <Text style={styles.description}>
        Carregando...
      </Text>
    </View>
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
      <ScrollView horizontal pagingEnabled>
          {attraction?.images.map(images => {
            return (
              <Image 
              key={images.id}
              style={styles.image} 
              source={{ uri: images.url}} 
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
  <Text style={styles.title}>{attraction?.name}</Text>
  <Text style={styles.description}>{attraction?.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: 2.8246016,
              longitude : -60.6732288,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: 2.8246016,
                longitude : -60.6732288,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
            <Text style={styles.description}>{attraction?.instruction}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{attraction?.opening_hours}</Text>
          </View>
         {attraction?.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}> atendemos fim de semana{attraction?.open_on_weekends}</Text>
          </View>
         ) :
         (
          <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
          <Feather name="info" size={40} color="#FF6690" />
          <Text style={[styles.scheduleTextRed, styles.scheduleTextRed]}>{attraction?.open_on_weekends}não atendemos fim de semana</Text>
        </View>
         )}
        </View>

        <RectButton style={styles.contactButton} onPress={handleOpenWhatsAppSendMessage}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },
  scheduleItemRed :{
    backgroundColor: '#FEF6f9',
    borderWidth: 1,
    borderColor: '#Fef0e0',
    borderRadius: 20,
  },
  

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },
  scheduleTextRed:{
    color:'#ff6690'
   },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
    
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})