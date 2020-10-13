import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

function Register() {
    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");

    useEffect(() => {
        axios
            .get<IBGEUFResponse[]>(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            )
            .then((response) => {
                const ufInitials = response.data.map((uf) => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === "0") return;

        axios
            .get<IBGECityResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )
            .then((response) => {
                const cityNames = response.data.map((city) => city.nome);
                setCities(cityNames);
            });
    }, [selectedUf]);


    function handleNavigateToLogin() {
        navigation.navigate("Login");
    }

    function handleNavigateToOnBoarding() {
        navigation.navigate("OnBoarding1");
    }

    return (
        <ImageBackground source={require('../../assets/background/back.jpg')} style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../assets/logoapp/logoapp.png")} />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Crie sua conta, é simples e rápido.</Text>
                <TextInput selectionColor="#390A5C" textContentType="name" placeholderTextColor="#4F0A83" style={styles.input} placeholder="Nome completo" />
                <TextInput selectionColor="#390A5C" textContentType="emailAddress" secureTextEntry={true} placeholderTextColor="#4F0A83" style={styles.input} placeholder="E-mail" />
                <View style={styles.inputPicker}>
                    <Picker
                        itemStyle={styles.pickerIOS}
                        style={styles.picker}
                        selectedValue={selectedUf}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedUf(itemValue.toString())
                        }
                    >
                        <Picker.Item label="UF" value="0" color="#D6CCCA" />
                        {ufs.map((uf) => (
                            <Picker.Item label={uf} value={uf} key={uf} color="#000" />
                        ))}
                    </Picker>
                </View>
                <View style={styles.inputPicker}>
                    <Picker
                        itemStyle={styles.pickerIOS}
                        style={styles.picker}
                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue.toString())
                        }
                    >
                        <Picker.Item label="Cidade" value="0" color="#D6CCCA" />
                        {cities.map((city) => (
                            <Picker.Item
                                label={city}
                                value={city}
                                key={city}
                                color="#000"
                            />
                        ))}
                    </Picker>
                </View>
                <TextInput selectionColor="#390A5C" textContentType="password" placeholderTextColor="#4F0A83" style={styles.input} placeholder="Senha" />
                <TextInput selectionColor="#390A5C" textContentType="password" secureTextEntry={true} placeholderTextColor="#4F0A83" style={styles.input} placeholder="Confirmar senha" />
            </View>
            <View style={styles.containerButtons}>
                <RectButton style={styles.buttonSubmit} onPress={handleNavigateToOnBoarding}>
                    <Text style={styles.textSubmit}>Finalizar cadastro</Text>
                </RectButton>
                <Text style={styles.textFinal}>Já tem uma conta?<Text onPress={handleNavigateToLogin} style={styles.textRegister}> Clique aqui!</Text></Text>
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
        marginTop: wp('10%'),
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
        color: "#4F0A83",
        borderRadius: 8
    },

    inputPicker: {
        marginTop: wp('3%'),
        backgroundColor: "#200237",
        borderRadius: 8,
    },

    picker: {
        width: wp("80%"),
        height: hp("6%"),
        color: "#4F0A83"
    },

    pickerIOS: {
        width: wp("80%"),
        height: hp("6%"),
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

export default Register;