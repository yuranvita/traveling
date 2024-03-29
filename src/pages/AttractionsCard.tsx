import React, { useState , useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View , ScrollView , Image, FlatList , ImageBackground} from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import img from '../images/in_construct.png';


interface Attraction {
    id : number ;
    name : string ; 
    instruction : string;
    about : string,
    images : Array<{
      id : string,
      url : string;
    }>;

    
    

}

export default function AttractionCard(){

  

  const [total , setTotal] = useState(0);
  const [page , setPage] = useState (1);
  const [loading , setLoading] = useState(false);
  const [feed, setFeed] = useState<Attraction[]>([]);


  async function  loadPage(pageNumber  = page) {
    const token = await AsyncStorage.getItem("my-Token");
    if(total && pageNumber> total){
      return
    }
    
    const response = await api.get(`/cards/${page}` , {
      headers : {
        "authorization" : "Bearer "+token
      }
    });
    const data = response.data;
    const totalItems = response.headers["x-total-count"];

    setTotal(Math.floor(totalItems/5)+1)
    setFeed([...feed, ...data]);
    setPage(pageNumber + 1);
  }
  
  useEffect(()=>{
    loadPage()
  }, []);

    return (
      <View style={styles.container}>
        <FlatList
        data={feed}
        keyExtractor={(post=> String(post.id))}
        onEndReached={()=> loadPage()}
        onEndReachedThreshold={0.1}
        renderItem={({item})=>(
          <View style={styles.card_container}>
            <View style={styles.body_card}>
              <Text style={styles.title}>{item.name}</Text>
              <ScrollView horizontal pagingEnabled>
                {/* {item?.images.map(images => {
                  return (
                    <Image 
                    key={images.id}
                    style={styles.image} 
                    source={{ uri: images.url}}
                    />
                  );
                })}  */}
                <ImageBackground
                source={img}
                style={styles.image}
                >
                </ImageBackground>
                <ImageBackground
                source={img}
                style={styles.image}
                >
                </ImageBackground>
              </ScrollView>
              <View style={styles.title}>
                <Text style={styles.scheduleText}>{item.about}</Text>
                <Text style={styles.scheduleText}>{item.instruction}</Text>
              </View>
            </View>
          </View>
        )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card_container:{
      paddingBottom : 20,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#B3DAE2',
      backgroundColor: '#E6F7FB',
    },
    card_title:{
      left : 20,
      color: '#4D6F80',
      fontSize: 20,
      fontFamily: 'Nunito_700Bold'
    },
    body_card:{
      justifyContent : 'center',
      alignItems : 'flex-start',
    },
    scheduleText: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 20,
      marginLeft : 10
      
    },
    title: {
      paddingLeft : 20,
      color: '#4D6F80',
      fontSize: 30,
      fontFamily: 'Nunito_600SemiBold',
    },
    image: {
      width: Dimensions.get('window').width,
      height: 500,
      resizeMode : 'cover'
    },


  });