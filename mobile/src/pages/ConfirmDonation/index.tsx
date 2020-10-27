import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '@expo/vector-icons/build/Feather';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';




interface Params {
    id_Necessidade: number;
    Nome: string;
}

function ConfirmDonation() {

    const navigation = useNavigation();

    const route = useRoute();
    const routeParams = route.params as Params;

    const [idDoador, setIdDoador] = useState<string | null>("");

    useEffect(() => {
        async function getIdDoador() {
            const id = await AsyncStorage.getItem("isLoggedId")
            setIdDoador(id);
        }

        getIdDoador();
    }, [idDoador])

    function handleNavigateGoBack() {
        navigation.goBack();
    }

    async function handleSubmitDonation() {
        try {
            await api.post(`doador/necessidade/${routeParams.id_Necessidade}/doar`, {}, {
                headers: {
                    authorization: idDoador
                }
            })
            navigation.navigate("AnnotatedDonation")
            console.log("Deu bom!")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Confirmar sua doação</Text>
            <View style={styles.section1}>
                <Text style={styles.titleSection1}>Você está doando para:</Text>
                <Text style={styles.nameReceptor}>{routeParams.Nome}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.containerDonation}>
                    <View style={styles.section2}>
                        <Image style={styles.image} source={require('../../assets/donation/donation.png')} />
                    </View>

                    <View style={styles.section3}>
                        <Text style={styles.message}>Após a confirmação de entrega
                        da sua doação no local, seus pontos
                        contabilizarão no ranking e no seu perfil.
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmitDonation}>
                <Text style={styles.textButton}>Confirmar doação</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
    },

    header: {
        marginTop: StatusBar.currentHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp('5%'),
        paddingTop: wp('4%')
    },

    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        fontSize: wp('7%'),
        color: "#300C4B",
        fontWeight: "bold",
        alignSelf: "center"
    },

    containerDonation: {
        alignItems: "center",
    },

    section1: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp("10%")
    },

    titleSection1: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: "#646464"
    },

    nameReceptor: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: "#300C4B"
    },

    section2: {
        marginBottom: wp("20%"),
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        resizeMode: "contain",
    },

    section3: {

        alignItems: "center",
        justifyContent: "center",
    },

    message: {
        paddingHorizontal: wp("10%"),
        fontSize: wp("4%"),
        fontWeight: "bold",
        textAlign: "center",
        color: "#DA73FF"
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: wp("0.3%"),
        borderColor: "#15C211",
        width: wp("90%"),
        height: hp("6%"),
        marginBottom: wp("5%"),
        alignSelf: "center",
        borderRadius: 50
    },

    textButton: {
        color: "#15C211",
        fontSize: wp("4%"),
        fontWeight: "bold"
    }

});

export default ConfirmDonation;