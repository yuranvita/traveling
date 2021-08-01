import React from "react";
import { useState } from "react";
import { View , StyleSheet , Text, Dimensions , ImageBackground} from "react-native";
import { TextInput  , RectButton} from "react-native-gesture-handler";
import { string } from "yargs";
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';



import imageBackGround from '../../assets/bandeiraDeRoraima200p.png';
import { navigate } from "@react-navigation/routers/lib/typescript/src/CommonActions";



export default function Login(){

  const navigation = useNavigation();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [name , setName] = useState('') ;

  async function handleLogin() {

    const data = new FormData();


    data.append('name' , name)
    data.append('email' , email);
    data.append('password' , password);

   
    try {
      console.log("entrei aqui")
      const response = await api.post('/user' , data);

      localStorage.setItem('token', response.data);

      navigation.navigate('/AttractionsMap');

    } catch (error) {
      alert("Algo deu errado, por favor tente novamente!")
    }
     
  }

  async function handleSingUp() {
    navigation.navigate('/SingUp')
  }


  return(
    <View style={styles.container}>
      <View style={styles.boxSize}>
      <Text style={styles.text}>Name</Text>
         <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setEmail}
        ></TextInput>
      <Text style={styles.text}>E-Mail</Text>
        <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        ></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        ></TextInput>
        <View style={styles.boxButtons}>
          <RectButton style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.signInButtonText}>Sign-In</Text>
          </RectButton>
          <RectButton style={styles.signUpButton} onPress={handleSingUp}>
            <Text style={styles.signUpButtonText}>Sign-Up</Text>
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
    alignItems : 'center',
    backgroundColor : "#c4c5c6",
    width : Dimensions.get('window').width,
    justifyContent : 'center',
    flexDirection : 'column',
    padding : 20,
    borderRadius : 20
  },
    input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    width : 250,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  }, 
  signInButton: {
    backgroundColor: '#FF37a1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width : 100,
    marginRight : 20
  },
  signUpButton :{
    backgroundColor: '#a11aff',
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
  }
})