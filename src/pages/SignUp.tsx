import React from "react";
import { useState } from "react";
import { View , StyleSheet , Text, Dimensions , ImageBackground} from "react-native";
import { TextInput  , RectButton} from "react-native-gesture-handler";

import { useNavigation } from '@react-navigation/native';
import api from '../services/api';



export default function SignUp(){

  const navigation = useNavigation();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [passwordConfirme , setPasswordConfirme] = useState('');
  const [name , setName] = useState('') ;

  async function handleSingUp() {

    let response ;
    
    try {

      if(password != passwordConfirme){
        alert("a senha não confere!")
        return
      }
     //verificar se já existe usuário
      response = await api.post('/user' , {name ,email , password} );

      console.log(response.data)
      alert("Conta criada com sucesso!");

      navigation.navigate('Login');

    } catch (error) {
      
    
      alert("Algo deu errado, por favor tente novamente!"+error)
    }
     
  }



  return(
    <View style={styles.container}>
      <View style={styles.blue}></View>    
      <View style={styles.starfive}>
        <View style={styles.starfiveTop}/>
        <View style={styles.starfiveBefore}/>
        <View style={styles.starfiveAfter}/>
      </View>
      <View style={styles.green}></View>
      <View style={styles.red}></View>        
      <View style={styles.boxSize}>
        <Text style={styles.text}>Nome</Text>
        <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setName}
        ></TextInput>
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
        <Text style={styles.text}>Repita sua senha</Text>
        <TextInput 
        style={styles.input}
        value={passwordConfirme}
        secureTextEntry
        onChangeText={setPasswordConfirme}
        ></TextInput>
        <View style={styles.boxButtons}>
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
    justifyContent: 'center',
  },
  boxSize : {
    position : 'absolute',
    alignItems : 'center',
    backgroundColor : "transparent",
    width : Dimensions.get('window').width,
    justifyContent : 'center',
    flexDirection : 'column',
    padding : 20,
    borderRadius : 20
  },
    input: {
    borderWidth: 2,
    borderColor: '#111',
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    width : 250,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  }, 
  signInButton: {
    backgroundColor: '#15c3d6',
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
    width : 160,
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