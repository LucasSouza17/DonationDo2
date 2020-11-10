import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

interface MedalhasI {
    id_Medalha: number,
    Nome: string,
    Pontos: string,
    Descricao: string
}

function MyPoints() {

    const navigation = useNavigation();

    const [pontuacao, setPontuacao] = useState();
    const [medalhas, setMedalhas] = useState<MedalhasI[]>([]);
    const [categoria, setCategoria] = useState();

    useEffect(() => {
        async function getPointsAndMedals() {
            const id = await AsyncStorage.getItem("isLoggedId");

            try {
                api.get(`/pontuacao/${Number(id)}`,
                ).then((response) => {
                    setMedalhas(response.data.Medalhas);
                    setPontuacao(response.data.Pontos.Pontuacao);
                    setCategoria(response.data.Categoria.Nome);
                })
            } catch (err) {
                console.log(err);
            }
        }
        getPointsAndMedals();
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
                <Text style={styles.title}>Meus pontos</Text>
                <View style={styles.pointsContainer}>
                    <Text style={styles.description}>Ganhe pontos para subir de categoria.</Text>
                    <View style={styles.pointsBox}>
                        <View style={styles.box1}>
                            <Text style={styles.yourPointsText}>Sua Pontuação</Text>
                            <Text style={styles.pointNumber}>{pontuacao}<Text style={styles.pointsText}> pontos</Text></Text>
                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.yourPointsText}>Categoria</Text>
                            <Text style={styles.pointNumber}>{categoria}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.descriptionMedal}>Mural de Medalhas</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: wp("4%"), borderRadius: 50 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.medalsContainer}>
                        {medalhas.map(medals => (
                            <TouchableOpacity style={styles.listMedals} key={medals.id_Medalha}>
                                <Text style={styles.titleMedal}>{medals.Nome}</Text>
                                <Image source={require('../../assets/icons/medal.png')} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
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
        paddingHorizontal: wp("6.5%"),
        marginTop: wp('4%'),
    },

    title: {
        fontSize: wp('7%'),
        color: "#300C4B",
        fontWeight: "bold"
    },

    pointsContainer: {
        marginTop: wp("4%"),
    },

    description: {
        color: "#8A8A8A"
    },

    pointsBox: {
        backgroundColor: "#300C4B",
        marginTop: wp("2%"),
        padding: wp("5%"),
        borderRadius: 8
    },

    box1: {
        justifyContent: "center",
    },

    box2: {
        marginTop: wp("2%")
    },

    yourPointsText: {
        color: "#F90CC5",
        fontWeight: "bold"
    },

    pointNumber: {
        fontSize: wp("7%"),
        color: "#fff",
        fontWeight: "bold"
    },

    pointsText: {
        fontSize: wp("5%"),
    },

    descriptionMedal: {
        color: "#8A8A8A",
        marginTop: wp("4%")
    },

    medalsContainer: {
        marginTop: wp("0%")
    },

    listMedals: {
        backgroundColor: "#74009E",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: wp("3.8%"),
        marginTop: wp("3%")
    },

    titleMedal: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: wp("4.5%")
    }
})

export default MyPoints;