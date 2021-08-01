import React from 'react';
import { View , StyleSheet , Text} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather , MaterialCommunityIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title : string;
    showCancel ?: boolean;
}


export default function Header( {title ,showCancel =true }  : HeaderProps){
    const navigation = useNavigation();

    function handleGoBackToAttractionCard(){
        navigation.navigate('AttractionsCard');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={handleGoBackToAttractionCard}>
                <MaterialCommunityIcons name="card-text-outline" size={24} color="black" />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {showCancel ? (
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b5b6"/>
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
        backgroundColor : '#f9fafc',
        borderBottomWidth : 1 ,
        borderColor : '#dde3f0',
        paddingTop : 44 ,

        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },

    title : {
        fontFamily : 'Nunito_600SemiBold',
        color: '#8fa7b5',
        fontSize : 16,
    }
});