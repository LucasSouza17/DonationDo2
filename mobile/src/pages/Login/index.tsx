import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';

function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [frango, setFrango] = useState("");

    function clearInput() {
        setEmail("");
        setSenha("");
    }

    async function handleSession() {
        const Email = email;
        const Senha = senha;

        const data = {
            Email,
            Senha
        };

        if (Email == "" || Senha == "") {
            Alert.alert("Oooops...", "Um ou ambos os campos não foram preenchidos.");
            console.log(data);
        } else {
            try {
                const response = await api.post("sessionDoador", data);

                await AsyncStorage.setItem(
                    "isLoggedId",
                    JSON.stringify(Number(response.data.id_Doador))
                );

                await AsyncStorage.setItem("isLoggedNome", response.data.Nome);

                navigation.navigate("Home");
                clearInput();

            }
            catch (err) {
                Alert.alert("Oooops...", "Dados inválidos");
                clearInput();
            }
        }
    }

    function handleNavigateToRegister() {
        navigation.navigate("Register");
    }

    return (
        <ImageBackground source={require('../../assets/background/back.jpg')} style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../assets/logoapp/logoapp.png")} />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Faça login com sua conta</Text>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    selectionColor="#390A5C"
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    value={email}
                    placeholder="E-mail"
                    autoCapitalize="none"
                    />
                <TextInput
                    onChangeText={(text) => setSenha(text)}
                    selectionColor="#390A5C"
                    secureTextEntry={true}
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    placeholder="Senha" 
                    value={senha}
                    />
            </View>
            <View style={styles.containerButtons}>
                <RectButton style={styles.buttonSubmit} onPress={handleSession} >
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

    title: {
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

    containerButtons: {
        marginTop: wp('6%'),
        alignItems: "center",
    },

    buttonSubmit: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F90CC5",
        width: wp('78%'),
        height: hp('5.80%'),
        borderRadius: 20,
        marginBottom: wp('4%')
    },

    textSubmit: {
        color: "#fff",
        fontSize: wp('4.20%')
    },

    textFinal: {
        color: "#fff",
        fontSize: wp('3.5%')
    },

    textRegister: {
        color: "#FF54D9",
    }

})

export default Login;