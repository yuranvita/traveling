import React, { useState , useEffect} from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  jwtDecode  from 'jwt-decode';



interface AttractionDataRouteParams{
  position : {
    latitude : number ;
    longitude : number ;
  }
}

interface Municipality{
  name : string,
}


const token = AsyncStorage.getItem("my-Token");


export default function AttractionData() {

  const[name ,setName] =useState('');
  const[about ,setAbout] =useState('');
  const[instruction ,setInstructions] =useState('');
  const[opening_hours ,setOpeninghours] =useState('');
  const[open_on_weekends ,setOpenonweekeds] =useState(true);
  const[whatsapp , setWhatsapp] = useState('')
  //const[images , setImages] = useState<string[]>([]);
  //ID de BOA-VISTA ALTERAR NO CÓDIGO DEPOIS;
  const[municipality_id , setMunicipality_id] = useState('37b5f7c4-7f81-4ad7-a12a-b805387df2ff');

  
  interface user{
    email : string;
    sub : string;
    iat : number;
    
  }
  
  
  
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as AttractionDataRouteParams;

  
  

 

 async function handleCreateAttraction(){

  
 
  const user =   jwtDecode( token["_W"]) as user ;
  const user_id = user.sub;
  
   
    const {latitude , longitude} = params.position;
    
    console.log({
      name,
      user_id,
      about,
      instruction,
      opening_hours,
      open_on_weekends,
      latitude,
      longitude,
      whatsapp,
      municipality_id
    });

    const data = {
      name,
      user_id,
      about,
      instruction,
      opening_hours,
      open_on_weekends : String(open_on_weekends),
      latitude,
      longitude,
      whatsapp,
      municipality_id
    }

    // const data = new FormData();

    // data.append('user_ir', user_id);
    // data.append('name' , name);
    // data.append('latitude' , String(latitude));
    // data.append('longitude' , String(longitude));
    // data.append('about' , about);
    // data.append('instruction' , instruction);
    // data.append('opening_hours' , opening_hours);
    // data.append('open_on_weekends' , String(open_on_weekends));
    // data.append('whatsapp', whatsapp);
    // data.append('municipality_id' , municipality_id);
    

    // images.forEach((image , index)=>{
    //   data.append('images',{
    //     name : `image_${index}.jpg`,
    //     type: 'image/jpg',
    //     uri : image,
    //   }as any)
    // });

    try{
      await api.post('/attractions'  , data  , { 
        headers : {
        "authorization" : "Bearer "+token["_W"]     
       }});

       navigation.navigate('AttractionsMap');
    }catch (err){
      alert(err);
    }
    
  }

// Removendo para o backend -- Em construção par AWS
//  async  function handleSelectImages(){
//     const {status} = await  ImagePicker.requestCameraRollPermissionsAsync();

//     if (status !== 'granted'){
//       alert ('eita , precisamos de acesso ás suas fotos...')
//       return ;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing:true,
//       quality : 1,
//       mediaTypes : ImagePicker.MediaTypeOptions.Images,
//     });
    
//     if(result.cancelled){
//       return;
//     }else{

//     const {uri : image} = result;

//     setImages([...images, image])
//   }
// }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      
       {
       //AWS server from images upload
       /* <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image 
            key={image}
            source={{uri : image}}
            style={styles.uploadedImage}
            ></Image>
          );
        })}
      </View> 
      

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#FFD700" />
      </TouchableOpacity>  */}

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instruction}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeninghours}
      />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />


      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenonweekeds}
        />
      </View>

      <RectButton style={styles.nextButton}  onPress={handleCreateAttraction}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.4,
    borderColor: '#FFD700',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  uploadedImagesContainer :{
    flexDirection : 'row',

  },
  uploadedImage :{
    width : 64 ,
    height : 64 ,
    borderRadius : 20 ,
    marginBottom : 32,
    marginRight:8
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#FFD700',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#29FF26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#111',
  }
})