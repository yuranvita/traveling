import React, { useState , useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View , ScrollView , Image, FlatList} from 'react-native';
import {Feather} from '@expo/vector-icons';
import api from '../services/api';

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

  const token = localStorage.getItem("token");

  async function  loadPage(pageNumber  = page) {

    if(total && pageNumber> total){
      return
    }

    console.log(pageNumber);
    
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
    console.log(total);
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
                {item?.images.map(images => {
                  return (
                    <Image 
                    key={images.id}
                    style={styles.image} 
                    source={{ uri: images.url}}
                    />
                  );
                })}
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