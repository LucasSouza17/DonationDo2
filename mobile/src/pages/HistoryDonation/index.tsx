import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface historyI {
    id_Doacao: string,
    NomeReceptor: string,
    Titulo: string,
    DescricaoNecessidade: string,
    image_url: string,
    Tipo: string,
    Cidade: string,
    UF: string,
    Rua: string,
    Bairro: string,
    CEP: string,
    Numero: string,
    Status: string,
    Telefone: string,
    Whatsapp: string,
    Email: string,
    Latitude: number,
    Longitude: number,
}

function HistoryDonation() {

    const navigation = useNavigation();

    const [history, setHistory] = useState<historyI[]>([]);

    useEffect(() => {
        async function getHistory() {
            const id = await AsyncStorage.getItem("isLoggedId");
            try {
                api.get(`doador/${Number(id)}/doacoes/`).then((response) => {
                    setHistory(response.data);
                    console.log(response.data);
                })
            } catch (err) {
                console.log(err);
            }
        }
        getHistory();
    }, [])

    function handleNavigateGoBack() {
        navigation.goBack();
    }

    function handleNavigateDonationProgress(
        id_Doacao: string,
        NomeReceptor: string,
        Titulo: string,
        DescricaoNecessidade: string,
        image_url: string,
        Tipo: string,
        Cidade: string,
        UF: string,
        Rua: string,
        Bairro: string,
        CEP: string,
        Numero: string,
        Status: string,
        Telefone: string,
        Whatsapp: string,
        Email: string,
        Latitude: number,
        Longitude: number,
    ) {
        navigation.navigate("DonationProgress", {
            id_Doacao: id_Doacao,
            NomeReceptor: NomeReceptor,
            Titulo: Titulo,
            DescricaoNecessidade: DescricaoNecessidade,
            image_url: image_url,
            Tipo: Tipo,
            Cidade: Cidade,
            UF: UF,
            Rua: Rua,
            Bairro: Bairro,
            CEP: CEP,
            Numero: Numero,
            Status: Status,
            Telefone: Telefone,
            Whatsapp: Whatsapp,
            Email: Email,
            Latitude: Latitude,
            Longitude: Longitude,
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Histórico de doações</Text>

                <View style={styles.containerHistory}>
                    <Text style={styles.textHistory}>Doações Recentes</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {history.map((data) => (
                            <View style={styles.containerList} key={data.id_Doacao}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleNavigateDonationProgress(
                                        data.id_Doacao,
                                        data.NomeReceptor,
                                        data.Titulo,
                                        data.DescricaoNecessidade,
                                        data.image_url,
                                        data.Tipo,
                                        data.Cidade,
                                        data.UF,
                                        data.Rua,
                                        data.Bairro,
                                        data.CEP,
                                        data.Numero,
                                        data.Status,
                                        data.Telefone,
                                        data.Whatsapp,
                                        data.Email,
                                        data.Latitude,
                                        data.Longitude
                                    )}
                                >
                                    <Text style={styles.textButton}>{data.NomeReceptor}</Text>
                                    <Icon name="chevron-right" color="#74009E" size={24} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View >
    );
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
        paddingHorizontal: wp("6.5%"),
        marginTop: wp('3%'),
    },

    title: {
        fontSize: wp('7%'),
        color: "#300C4B",
        fontWeight: "bold"
    },

    containerHistory: {
        marginTop: wp("4%"),
    },

    textHistory: {
        fontWeight: "bold",
        color: "#8A8A8A"
    },

    containerList: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('2%')
    },

    button: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: wp("3%"),
        justifyContent: "space-between",
        borderWidth: wp("0.4%"),
        borderColor: "#74009E",
        width: wp("82%"),
        height: hp("6%"),
        borderRadius: 5,
        marginBottom: wp("2%")
    },

    textButton: {
        fontWeight: "bold",
        color: "#74009E"
    }


});

export default HistoryDonation;