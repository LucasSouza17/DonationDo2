import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

interface HistoryI {
    id_Receptor: number;
    Nome: string;
    Acesso: number;
}

function HistoryReceiver() {

    const navigation = useNavigation();

    const [history, setHistory] = useState<HistoryI[]>([]);

    useEffect(() => {
        async function History() {
            const id = await AsyncStorage.getItem("isLoggedId");
            try {
                api.get(`doador/${id}/historico`).then(response => {
                    setHistory(response.data);
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        History();
    }, [])
        
    function handleNavigateGoBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Instituições acessadas</Text>

                <View style={styles.containerHistory}>
                    <Text style={styles.textHistory}>Buscas Recentes</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {history.map(data => (
                            <View style={styles.containerList} key={data.id_Receptor}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>{data.Nome}</Text>
                                    <View style={styles.dataAcessos}>
                                        <Text style={styles.AcessosTitle}>Acessos</Text>
                                        <Text style={styles.numberAcesso}>{data.Acesso}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
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
        paddingHorizontal: wp("3%"),
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: wp("0.4%"),
        borderColor: "#74009E",
        width: wp("82%"),
        height: hp("8%"),
        borderRadius: 5,
        marginBottom: wp("2%"),
        flexDirection: 'row'
    },


    dataAcessos: {
        justifyContent: "center",
        alignItems: "center",
    },

    AcessosTitle: {
        color: "#74009E"
    },

    numberAcesso: {
        fontWeight: "bold",
        color: "#74009E"
    },

    textButton: {
        fontWeight: "bold",
        color: "#74009E"
    }


});

export default HistoryReceiver;