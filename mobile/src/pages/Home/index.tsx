import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/build/Feather";
import MapView, { Marker } from "react-native-maps";
import IconAwesome from "@expo/vector-icons/build/FontAwesome5";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message';

interface PointI {
    id_Necessidade: string;
    Nome: string;
    image_url: string;
    Latitude: number;
    Longitude: number;
    Img_Local: string;
}

function Home() {

    const navigation = useNavigation();

    const [nomeUser, setNomeUser] = useState<string | null>("");
    const [idUser, setIdUser] = useState<string | null>("");
    const [ufUser, setUfUser] = useState<string | null>("");
    const [cityUser, setCityUser] = useState<string | null>("");
    const [pointsUser, setPointsUser] = useState("");

    const [points, setPoints] = useState<PointI[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    useEffect(() => {
        async function getDataUser() {
            const Id = await AsyncStorage.getItem("isLoggedId");
            const UF = await AsyncStorage.getItem("isLoggedUF");
            const Cidade = await AsyncStorage.getItem("isLoggedCity");
            setIdUser(Id);
            setUfUser(UF);
            setCityUser(Cidade);
            try {
                await api.get(`doador/${Number(idUser)}`).then(response => {
                    setPointsUser(response.data.Pontuacao);
                    setNomeUser(response.data.Nome);
                })
            } catch (err) {
                console.log(err);
            }
        }

        getDataUser();
    }, [Number(idUser), nomeUser, pointsUser, cityUser, ufUser])

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== "granted") {
                Toast.show({
                    type: 'error',
                    text1: 'Ooopss...',
                    text2: 'Você precisa preencher os campos para entrar.',
                    visibilityTime: 3000,
                    topOffset: 60
                })
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInitialPosition([latitude, longitude]);
        }
        loadPosition();
    }, []);

    useEffect(() => {
        async function getNecessidade() {
            try {
                await api.get("filternecessidades", {
                    params: {
                        UF: 'SP',
                        Cidade: 'São José do Rio Preto',
                        id_Item: 1
                    },
                }).then(response => {
                    setPoints([response.data]);
                    console.log(response.data);
                })
            } catch (err) {
                console.log(err);
            }
        }

        getNecessidade();
    }, [])

    function handleDrawerOpen() {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    function handleNavigateToDescriptionNeed() {
        navigation.navigate("DescriptionNeed");
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.perfilContainer}>
                    <View style={styles.perfil}>
                        {/* <Image source="" /> */}
                    </View>
                    <View style={styles.userData}>
                        <Text style={styles.name}>{nomeUser}</Text>
                        <Text style={styles.points}>{pointsUser} pontos</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleDrawerOpen}>
                    <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
            <View style={styles.mainContainer}>
                <View style={styles.headerMain}>
                    <Text style={styles.title}>Filtre sua busca para doar</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.textButton}>Filtrar</Text>
                        <Icon name="filter" color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            loadingEnabled={initialPosition[0] === 0}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {points.map((point) => (
                                <Marker
                                    key={point.id_Necessidade}
                                    coordinate={{
                                        latitude: point.Latitude,
                                        longitude: point.Longitude
                                    }}
                                    style={styles.mapMarker}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage} source={{ uri: point.Img_Local }} />
                                        <Text style={styles.mapMarkerTitle}>{point.Nome}</Text>
                                    </View>
                                    <IconAwesome
                                        style={styles.sortDown}
                                        name="sort-down"
                                        size={18}
                                    />
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.containerList}>
                <ScrollView
                    style={styles.listPoints}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: wp('2%') }}
                >
                    {points.map((point) => (
                        <TouchableOpacity style={styles.List} key={point.id_Necessidade}>
                            <Image style={styles.imageList} source={{ uri: point.Img_Local }} />
                            <Text style={styles.namePoint}>{point.Nome}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B"
    },

    headerContainer: {
        marginTop: StatusBar.currentHeight,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },

    perfilContainer: {
        padding: wp('4%'),
        flexDirection: "row",
        alignItems: "center",
        marginTop: wp('2%')
    },

    perfil: {
        width: 50,
        height: 50,
        backgroundColor: "#B1A0F4",
        borderRadius: wp('100%'),
    },

    userData: {
        marginLeft: wp('2%'),
    },

    name: {
        color: "#fff",
        fontWeight: "bold"
    },

    points: {
        color: "#F90CC5",
        fontWeight: "bold"
    },

    menuIcon: {
        padding: wp('4%')
    },

    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: wp('4%')
    },

    headerMain: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: wp('4%'),
        marginTop: wp('4%'),
    },

    title: {
        fontSize: wp('5.2%'),
        color: "#300C4B",
        fontWeight: "bold"
    },

    filterButton: {
        backgroundColor: "#F90CC5",
        width: wp('25%'),
        height: hp('4.5%'),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20
    },

    textButton: {
        marginHorizontal: wp('1.5%'),
        color: "#fff"
    },

    mapContainer: {
        flex: 1,
        padding: wp('4%'),
        marginTop: wp('-2%')
    },

    map: {
        width: '100%',
        height: '100%'
    },

    containerList: {
        backgroundColor: "#fff",
    },

    listPoints: {
        //paddingHorizontal: wp("4%"),
        marginBottom: wp("6%"),
        //marginRight: wp('4%')
    },

    List: {
        borderRadius: 8,
        backgroundColor: "#300C4B",
        width: wp('35%'),
        height: hp('15%'),
        marginHorizontal: wp('1%'),
    },

    imageList: {
        width: wp("35%"),
        height: hp("15%"),
        borderRadius: 8,
        flex: 1,
        resizeMode: "cover",
        alignSelf: "center",
    },

    namePoint: {
        padding: wp('0.5%'),
        backgroundColor: "#F90CC5",
        textAlign: "center",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        color: "#fff"
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: "#F90CC5",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
    },

    mapMarkerImage: {
        width: 90,
        height: 52,
        resizeMode: "cover",
    },

    mapMarkerTitle: {
        flex: 1,
        textAlign: "center",
        width: '100%',
        color: "#FFF",
        fontSize: 8,
        fontWeight: "bold",
        lineHeight: 17,
        backgroundColor: "#F90CC5"
    },

    sortDown: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        bottom: 3,
        color: "#F90CC5",
    },

});

export default Home;