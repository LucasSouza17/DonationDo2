import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';

function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function clearInput() {
        setEmail("");
        setSenha("");
    }

    async function handleSession() {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        const Email = email;
        const Senha = senha;

        const data = {
            Email,
            Senha
        };

        if (Email === "" && Senha === "") {
            Toast.show({
                type: 'error',
                text1: 'Ooopss...',
                text2: 'Você precisa preencher os campos para entrar.',
                visibilityTime: 3000,
                topOffset: 60
            })
        } else if (Email !== "" && Senha === "") {
            Toast.show({
                color: 'red',
                type: 'error',
                text1: 'Quase lá...',
                text2: 'Só falta preencher a senha, vamos lá!',
                visibilityTime: 3000,
                topOffset: 60
            })
        } else if (!expression.test(String(Email).toLowerCase())) {
            Toast.show({
                type: 'error',
                text1: 'Seu email está correto?',
                text2: 'exemplo@exemplo.com - Seu email está seguindo essas normas, verifique por favor.',
                visibilityTime: 5000,
                topOffset: 50
            })
        }
        else {
            try {
                const response = await api.post("sessionDoador", data);

                Toast.show({
                    type: 'success',
                    text1: 'Showwwww!!',
                    text2: 'Bem vindo ao DonationDo, bora doar!!',
                    visibilityTime: 1000,
                    topOffset: 60
                })

                await AsyncStorage.setItem(
                    "isLoggedId",
                    JSON.stringify(Number(response.data.id_Doador))
                );
                await AsyncStorage.setItem("isLoggedUF", response.data.UF)
                await AsyncStorage.setItem("isLoggedCity", response.data.Cidade)

                setTimeout(() => {
                    navigation.navigate("UserAuth");
                }, 1000)
                clearInput();
            }
            catch (err) {
                console.log(err)
                console.log(data)
                Toast.show({
                    type: 'error',
                    text1: 'Confere ai',
                    text2: 'Da uma olhadinha se você digitou tudo certinho e tente novamente.',
                    visibilityTime: 3000,
                    topOffset: 60
                })
            }
        }
    }

    function handleNavigateToRegister() {
        navigation.navigate("Register");
    }

    return (
        <ImageBackground source={require('../../assets/background/back.jpg')} style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../assets/logoapp/logoapp.png")} />
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
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
        color: "#fff",
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