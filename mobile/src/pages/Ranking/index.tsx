import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper'
import api from '../../services/api';

interface RankingI {
    id_Doador: number,
    Nome: string,
    Pontuacao: number,
    avatar_url: string
}

function Ranking() {

    const navigation = useNavigation();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [ranking, setRanking] = useState<RankingI[]>([]);
    const [total, setTotal] = useState(0);

    async function loadRanking() {
        if (loading) {
            return;
        }

        if (total > 0 && ranking.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('/ranking/doador', {
            params: { page }
        });

        setRanking([...ranking, ...response.data] as any);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadRanking();
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
                <Text style={styles.title}>Ranking</Text>

                <View style={styles.containerHistory}>
                    <Text style={styles.textHistory}>Veja o ranking de doadores da sua região</Text>

                    <FlatList
                        data={ranking}
                        keyExtractor={ranking => String(ranking.id_Doador)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadRanking}
                        onEndReachedThreshold={0.2}
                        renderItem={({ item: ranking, index: index }) => (
                            <>
                                <View style={styles.containerList}>
                                    <TouchableOpacity style={styles.button}>
                                        {index + 1 < 4 ? (
                                            <View style={styles.positionContainer}>
                                                {index + 1 === 1 ? (
                                                    <Image source={require("../../assets/icons/crow.png")} />
                                                ) : (
                                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>{index + 1}</Text>
                                                    )}
                                            </View>
                                        ) : (
                                                <View style={styles.positionContainerCondition}>
                                                    {index + 1 === 1 ? (
                                                        <Image source={require("../../assets/icons/crow.png")} />
                                                    ) : (
                                                            <Text style={{ color: "#fff", fontWeight: "bold" }}>{index + 1}</Text>
                                                        )}
                                                </View>
                                            )}
                                        <View style={styles.containerPerfil}>
                                            <Image style={{ resizeMode: "cover", width: 45, height: 45, borderRadius: 50 }} source={{ uri: ranking.avatar_url }} />
                                        </View>
                                        <Text style={styles.nomeUser}>{ranking.Nome}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.containerDataPoints}>
                                        <Text style={styles.points}>{ranking.Pontuacao}</Text>
                                        <Text style={styles.pointsTitle}>pontos</Text>
                                    </View>
                                </View>
                                <Divider />
                            </>
                        )}
                    />
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
        flex: 1,
        marginTop: wp("4%"),
    },

    textHistory: {
        fontWeight: "bold",
        color: "#8A8A8A",
        marginBottom: wp("5%")
    },

    containerList: {
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: wp('8%'),
        marginBottom: wp("4%"),
        flexDirection: "row"
    },

    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    positionContainer: {
        backgroundColor: "#FFD93B",
        width: 22,
        height: 22,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    positionContainerCondition: {
        backgroundColor: "#74009E",
        width: 22,
        height: 22,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    containerPerfil: {
        width: 45,
        height: 45,
        borderRadius: wp("100%"),
        backgroundColor: "#300C4B",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp("3%"),
        marginRight: wp("3%")
    },

    nomeUser: {
        fontWeight: "bold",
        color: "#300C4B",
        fontSize: wp("2.8%")
    },

    containerDataPoints: {
        justifyContent: "center"
    },

    points: {
        color: "#300C4B",
        fontWeight: "bold",
        fontSize: wp("4.5%"),
        textAlign: "right"
    },

    pointsTitle: {
        marginTop: wp("-2%"),
        fontSize: wp("2.5%"),
        fontWeight: "bold",
        color: "#300C4B"
    }



});

export default Ranking;