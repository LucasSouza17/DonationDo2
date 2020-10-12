import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function Login() {

    const navigation = useNavigation();

    function handleNavigateToRegister() {
        navigation.navigate("Register");
    }

    function handleNavigateToOnBoarding() {
        navigation.navigate("OnBoarding");
    }

    return (
        <ImageBackground source={require('../../assets/background/back.jpg')} style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../assets/logoapp/logoapp.png")} />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Faça login com sua conta</Text>
                <TextInput selectionColor="#390A5C" textContentType="emailAddress" placeholderTextColor="#4F0A83" style={styles.input} placeholder="E-mail" />
                <TextInput selectionColor="#390A5C" textContentType="password" secureTextEntry={true} placeholderTextColor="#4F0A83" style={styles.input} placeholder="Senha" />
            </View>
            <View style={styles.containerButtons}>
                <RectButton style={styles.buttonSubmit} onPress={handleNavigateToOnBoarding}>
                    <Text style={styles.textSubmit}>Entrar</Text>
                </RectButton>
                <Text style={styles.textFinal}>Não tem conta? <Text onPress={handleNavigateToRegister} style={styles.textRegister}> Cadastre-se</Text></Text>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    },

    imageLogo: {
        resizeMode: "contain",
        width: wp('35%'),
    },

    inputContainer: {
        alignItems: "center",
        marginTop: wp('17%'),
    },

    title:{
        color: "#fff",
        fontSize: wp('4%'),
        marginBottom: wp('2%')
    },

    input: {
        backgroundColor: "#200237",
        width: wp('80%'),
        height: hp('6%'),
        marginTop: wp('3%'),
        paddingLeft: wp('3%'),
        fontWeight: "bold",
        color: "#4F0A83",
        borderRadius: 8
    },

    containerButtons:{
        marginTop: wp('6%'),
        alignItems:"center",
    },

    buttonSubmit:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#F90CC5",
        width: wp('78%'),
        height: hp('5.80%'),
        borderRadius: 20,
        marginBottom: wp('4%')
    },

    textSubmit:{
        color: "#fff",
        fontSize: wp('4.20%')
    },

    textFinal:{
        color: "#fff",
        fontSize: wp('3.5%')
    },

    textRegister:{
        color:"#FF54D9",
    }

})

export default Login;