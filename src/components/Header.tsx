import React from 'react';
import { View , StyleSheet , Text} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title : string;
    showCancel ?: boolean;
}


export default function Header( {title ,showCancel =true }  : HeaderProps){
    const navigation = useNavigation() as any;

    function handleGoBackToAttractionMap(){
        navigation.navigate('AttractionsMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#FFD700"/>
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToAttractionMap}>
                <Feather name="x" size={24} color="#FF669D"/>
            </BorderlessButton>
            ) :
            (
                <View/>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding :25,
        backgroundColor : '#15c3d6',
        borderBottomWidth : 1 ,
        borderColor : '#dde3f0',
        paddingTop : 44 ,

        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },

    title : {
        fontFamily : 'Nunito_600SemiBold',
        color: '#fff',
        fontSize : 16,
    }
});