import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RectButton } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Picker } from '@react-native-community/picker'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';

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
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

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

    function clearInput() {
        setEmail("");
        setSenha("");
        setNome("");
        setConfirmSenha("");
        setSelectedCity("0");
        setSelectedUf("0");
    }

    async function handleRegister() {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        const Nome = nome;
        const Email = email.toLowerCase();
        const Senha = senha;
        const Cidade = selectedCity;
        const UF = selectedUf;

        const data = {
            Nome,
            Email,
            Senha,
            Cidade,
            UF
        }

        if (Nome === "" && Email === "" && Senha === "" && confirmSenha === "" && Cidade === "0" && UF === "0") {
            Toast.show({
                type: 'error',
                text1: 'Ooopss...',
                text2: 'Você precisa preencher os campos para cadastrar.',
                visibilityTime: 3000,
                topOffset: 60
            })
        } else if (Nome !== "" && Email === "" && Senha === "" && confirmSenha === "" && Cidade === "0" && UF === "0") {
            Toast.show({
                type: 'error',
                text1: 'Cadê seu email?',
                text2: 'Faltam só 5 campos para preencher, e seu email é essencial.',
                visibilityTime: 3200,
                topOffset: 50
            })
        } else if (Nome !== "" && Email !== "" && Senha === "" && confirmSenha === "" && Cidade === "0" && UF === "0") {
            Toast.show({
                type: 'error',
                text1: 'De qual estado você?',
                text2: 'Faltam só 4 campos para preencher, e sua localização não pode faltar.',
                visibilityTime: 3200,
                topOffset: 50
            })
        } else if (Nome !== "" && Email !== "" && Senha === "" && confirmSenha === "" && Cidade === "0" && UF !== "0") {
            Toast.show({
                type: 'error',
                text1: 'E a cidade, você é de onde?',
                text2: 'Faltam só 3 campos para preencher, e sua cidade é muito importante.',
                visibilityTime: 3200,
                topOffset: 50
            })
        } else if (Nome !== "" && Email !== "" && Senha === "" && confirmSenha === "" && Cidade !== "0" && UF !== "0") {
            Toast.show({
                type: 'error',
                text1: 'Restam 2 campos',
                text2: 'Agora falta só criar sua senha, vamos lá!',
                visibilityTime: 3000,
                topOffset: 50
            })
        } else if (Nome !== "" && Email !== "" && Senha !== "" && confirmSenha === "" && Cidade !== "0" && UF !== "0") {
            Toast.show({
                type: 'error',
                text1: 'Confirme sua senha',
                text2: 'Só confirmar sua senha e clicar em "Finalizar cadastro".',
                visibilityTime: 3200,
                topOffset: 50
            })
        } else if (!expression.test(String(Email).toLowerCase())) {
            Toast.show({
                type: 'error',
                text1: 'Seu email está correto?',
                text2: 'exemplo@exemplo.com - Seu email está seguindo essas normas, verifique por favor.',
                visibilityTime: 4000,
                topOffset: 50
            })
        }
        else if (Senha.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Sua senha é maior que 8 caracteres?',
                text2: 'Suas senhas precisam ser maiores que 8 caracteres para prosseguir.',
                visibilityTime: 4000,
                topOffset: 50
            })
        }
        else if (Senha !== confirmSenha) {
            Toast.show({
                type: 'error',
                text1: 'Suas senhas estão iguais?',
                text2: 'Suas senhas precisam ser idênticas, pode confirmar pra gente?',
                visibilityTime: 4000,
                topOffset: 50
            })
        } else {
            try {
                await api.post("doador", data).then(response => {
                    AsyncStorage.setItem(
                        "isLoggedId",
                        JSON.stringify(Number(response.data.id_Doador))
                    );
                    
                    Toast.show({
                        type: 'success',
                        text1: 'Cadastrado com sucesso!!',
                        text2: 'Boooooaaaa!!! Bora doar!',
                        visibilityTime: 2000,
                        topOffset: 50
                    })


                    setTimeout(() => {
                        navigation.navigate("OnBoarding1");
                    }, 1800)
                    clearInput();
                })
            }
           catch (err) {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: 'Algo de errado',
                    text2: 'Confira todas suas informações e tente novamente.',
                    visibilityTime: 3000,
                    topOffset: 50
                })
            }
        }
    }

    return (
        <ImageBackground source={require('../../assets/background/back.jpg')} style={styles.container}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, width: wp("100%"), justifyContent: "center", alignItems: "center", paddingBottom: wp("5%") }}>
                <View style={{ justifyContent: "flex-start", alignItems: "center", marginBottom: wp("5%") }}>
                    <Image style={styles.imageLogo} source={require("../../assets/logoapp/logoapp.png")} />
                </View>
                <Toast ref={(ref: any) => Toast.setRef(ref)} />
                <Text style={styles.title}>Crie sua conta, é simples e rápido.</Text>
                <TextInput
                    selectionColor="#390A5C"
                    textContentType="name"
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    value={nome}
                    placeholder="Usuário"
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput
                    selectionColor="#390A5C"
                    textContentType="emailAddress"
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <View style={styles.inputPicker}>
                    <Picker
                        itemStyle={styles.pickerIOS}
                        style={styles.picker}
                        selectedValue={selectedUf}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedUf(itemValue.toString())
                        }
                    >
                        <Picker.Item label="Estado" value="0" color="#D6CCCA" />
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
                <TextInput
                    autoCapitalize="none"
                    selectionColor="#390A5C"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    placeholder="8 a 20 caracteres"
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                    maxLength={20}
                />
                <TextInput
                    autoCapitalize="none"
                    selectionColor="#390A5C"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#4F0A83"
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    onChangeText={(text) => setConfirmSenha(text)}
                    value={confirmSenha}
                    maxLength={20}
                />
                <View style={styles.containerButtons}>
                    <RectButton style={styles.buttonSubmit} onPress={handleRegister}>
                        <Text style={styles.textSubmit}>Finalizar cadastro</Text>
                    </RectButton>
                    <Text style={styles.textFinal}>Já tem uma conta?<Text onPress={handleNavigateToLogin} style={styles.textRegister}> Clique aqui!</Text></Text>
                </View>
            </KeyboardAwareScrollView>
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
        width: wp('30%'),
    },

    inputContainer: {
        alignItems: "center",
        marginTop: wp('2%'),
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
        color: "#fff",
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