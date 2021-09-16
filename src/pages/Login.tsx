import React from "react";
import { useState } from "react";
import { View , StyleSheet , Text, Dimensions } from "react-native";
import { TextInput  , RectButton, RotationGestureHandler} from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LinearGradient } from "expo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { color } from "react-native-reanimated";




const token = AsyncStorage.getItem("myToken");



export default function Login(){


  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const  navigation  = useNavigation();

  const token = AsyncStorage.getItem("my-Token");

   if(token["_W"] != null){
     console.log(token);
     navigation.navigate('AttractionsMap');
   }

  async function handleLogin() {
    try {
      const response = await api.post('/session' , {email , password},{
        headers : {
          'Content-Type' : 'application/json',
        }
      });

      const token = await response.data;


      await AsyncStorage.setItem("my-Token" , token);


      navigation.navigate('AttractionsMap' , response.data);

    } catch (error) {
      alert("E-Mail ou Senha Incorreto! " + error)
    }

  }

  async function handleSingUp() {
   navigation.navigate('SignUp')
  }


  return(
    <View style={styles.container}>
      <View style={styles.starfive}>
        <View style={styles.starfiveTop}/>
        <View style={styles.starfiveBefore}/>
        <View style={styles.starfiveAfter}/>
      </View>
      <View style={styles.blue}></View>
      <View style={styles.green}></View>
      <View style={styles.red}></View>  
      <View style={styles.boxSize}>
      <Text style={styles.text}>E-Mail</Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        ></TextInput>
        <Text style={styles.text}>Senha</Text>
        <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        ></TextInput>
        <View style={styles.boxButtons}>
          <RectButton style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.signInButtonText}>Logar</Text>
          </RectButton>
          <RectButton style={styles.signUpButton} onPress={handleSingUp}>
            <Text style={styles.signUpButtonText}>Cadastrar</Text>
          </RectButton>
        </View>
      </View>       
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  green :{
    backgroundColor : "#29FF26",
    width : 300,
    height : 700,
    transform : [{rotate : "50deg"}],
    
  },
  blue : {
    backgroundColor : "#15c3d6",
    width : 300,
    height : 700,
    transform : [{rotate : "50deg"}],
  },
  red :{
    position : 'absolute',
    bottom : 80 ,
    height: 5,
    width: '120%',
    backgroundColor: '#ff0000',
  },
  boxSize : {
    position: 'absolute',
    alignItems : 'center',
    backgroundColor : 'transparent',
    justifyContent : 'center',
    flexDirection : 'column',
    padding : 20,
    borderRadius : 20
    
  },
    input: {
    backgroundColor: '#fff',
    borderWidth:3,
    borderColor: '#111',
    borderRadius: 20,
    height: 56,
    width : 250,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    
  },
  signInButton: {
    backgroundColor: '#29FF26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width : 100,
    marginRight : 20
  },
  signUpButton :{
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width : 100,
    marginLeft: 20
  },
  signUpButtonText:{
    color : "#000",
    fontSize : 20,
    fontFamily  : 'Nunito_700Bold'
  },
  signInButtonText:{
    color : "#000",
    fontSize : 20,
    fontFamily  : 'Nunito_700Bold'
  },
  text:{
    color : "#000",
    fontSize : 20,
    fontFamily  : 'Nunito_700Bold'
  }
  ,
  boxButtons :{
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  starfive: {
    position : 'absolute',
    width: 150,
    height: 150,
  },
  starfiveTop: {
    position: 'absolute',
    width: 0,
    height: 0,
    left :35,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 75,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "yellow"
  },
  starfiveBefore: {
    backgroundColor: "transparent",
    position: "absolute",
    left: -30,
    top: 50,
    borderStyle: "solid",
    borderRightWidth: 100,
    borderRightColor: "transparent",
    borderBottomWidth: 70,
    borderBottomColor: "yellow",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    transform: [{ rotate: "35deg" }],
  },
  starfiveAfter: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 50,
    left: -30,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 100,
    borderRightColor: "transparent",
    borderBottomWidth: 70,
    borderBottomColor: "yellow",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    transform: [{ rotate: "-35deg" }],
  },
})