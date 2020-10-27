import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/build/Feather";
import MapView, { Callout, Marker } from "react-native-maps";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message';
import { Modalize } from 'react-native-modalize';

interface PointI {
    id_Necessidade: string;
    Titulo: string;
    Descricao: string;
    Tipo: string;

    Nome: string;
    Latitude: number;
    Longitude: number;
    image_url: string;
    Cidade: string;
    UF: string;
    Rua: string;
    Bairro: string;
    CEP: string;
    Numero: string;
    Telefone: string;
    Whatsapp: string;
    Email: string;
}

function Home() {

    const modalizeRef = useRef<Modalize>(null);

    const navigation = useNavigation();

    const [nomeUser, setNomeUser] = useState("");
    const [idUser, setIdUser] = useState<string | null>("");
    const [ufUser, setUfUser] = useState("");
    const [cityUser, setCityUser] = useState("");
    const [avatar, setAvatar] = useState("");
    const [pointsUser, setPointsUser] = useState("");

    const [loading, setLoading] = useState(false);

    const [points, setPoints] = useState<PointI[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    useEffect(() => {
        async function getDataUser() {
            const Id = await AsyncStorage.getItem("isLoggedId");
            setIdUser(Id);
            try {
                setLoading(true);
                await api.get(`doador/${Number(idUser)}`).then((response) => {
                    setPointsUser(response.data.Pontuacao);
                    setNomeUser(response.data.Nome);
                    setUfUser(response.data.UF);
                    setCityUser(response.data.Cidade);
                    setAvatar(response.data.avatar_url)
                }).catch(error => {
                    console.log(error)
                })
            } catch (err) {
                console.log(err);
            }
        }
        getDataUser();
    }, [nomeUser, loading, ufUser, cityUser, avatar])


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
                    setPoints(response.data);
                }).catch(error => {
                    console.log(error)
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

    function handleNavigateToDescriptionNeed(
        id_Necessidade: string,
        Nome: string,
        Latitude: number,
        Longitude: number,
        Titulo: string,
        Descricao: string,
        image_url: string,
        Tipo: string,
        Cidade: string,
        UF: string,
        Rua: string,
        Bairro: string,
        CEP: string,
        Numero: string,
        Telefone: string,
        Whatsapp: string,
        Email: string
    ) {
        navigation.navigate("DescriptionNeed", {
            id_Necessidade: id_Necessidade,
            Nome: Nome,
            Latitude: Latitude,
            Longitude: Longitude,
            Titulo: Titulo,
            Descricao: Descricao,
            image_url: image_url,
            Tipo: Tipo,
            Cidade: Cidade,
            UF: UF,
            Rua: Rua,
            Bairro: Bairro,
            CEP: CEP,
            Numero: Numero,
            Telefone: Telefone,
            Whatsapp: Whatsapp,
            Email: Email
        });
    }

    function onOpenModalize() {
        modalizeRef.current?.open();
    };

    if (points.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Carregando</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {/* {doador.map(data => ( */}
                    <View style={styles.perfilContainer}>
                        <View style={styles.perfil}>
                            <Image
                                source={{
                                    uri: avatar
                                        ? avatar
                                        : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
                                }}
                                style={styles.perfil}
                            />
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
                        <TouchableOpacity style={styles.filterButton} onPress={onOpenModalize}>
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
                                        image={require('../../assets/icons/Location.png')}
                                    >
                                        <Callout
                                            tooltip
                                            onPress={() => handleNavigateToDescriptionNeed(
                                                point.id_Necessidade,
                                                point.Nome,
                                                point.Latitude,
                                                point.Longitude,
                                                point.Titulo,
                                                point.Descricao,
                                                point.image_url,
                                                point.Tipo,
                                                point.Cidade,
                                                point.UF,
                                                point.Rua,
                                                point.Bairro,
                                                point.CEP,
                                                point.Numero,
                                                point.Telefone,
                                                point.Whatsapp,
                                                point.Email
                                            )}
                                        >
                                            <View style={styles.calloutBackground}>
                                                <View style={styles.callout}>
                                                    <View>
                                                        <Text
                                                            style={
                                                                {
                                                                    color: "#fff",
                                                                    fontWeight: "bold",
                                                                    fontSize: wp("4%")
                                                                }
                                                            }>
                                                            {point.Nome}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                {
                                                                    color: "#F90CC5",
                                                                    fontSize: wp("3%")
                                                                }
                                                            }>
                                                            {point.Titulo}
                                                        </Text>
                                                    </View>
                                                    <Text style={{color: "#fff", fontSize: wp("2%"), marginLeft: wp("4%"), fontWeight: "bold"}}>Clique Aqui!</Text>
                                                </View>
                                            </View>
                                        </Callout>
                                    </Marker>
                                ))}
                            </MapView>
                        )}
                    </View>
                </View>
                {initialPosition[0] !== 0 && (
                    <View style={styles.containerList}>
                        <ScrollView
                            style={styles.listPoints}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: wp('2%') }}
                        >
                            {points.map((point) => (
                                <TouchableOpacity style={styles.List} key={point.id_Necessidade}
                                    onPress={() => handleNavigateToDescriptionNeed(
                                        point.id_Necessidade,
                                        point.Nome,
                                        point.Latitude,
                                        point.Longitude,
                                        point.Titulo,
                                        point.Descricao,
                                        point.image_url,
                                        point.Tipo,
                                        point.Cidade,
                                        point.UF,
                                        point.Rua,
                                        point.Bairro,
                                        point.CEP,
                                        point.Numero,
                                        point.Telefone,
                                        point.Whatsapp,
                                        point.Email
                                    )}>
                                    <Image style={styles.imageList} source={{ uri: point.image_url }} />
                                    <Text style={styles.namePoint}>{point.Titulo.replace("Precisamos de", "")}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
                <Modalize ref={modalizeRef}></Modalize>
            </View >
        )
    }
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

    calloutBackground: {
        resizeMode: "cover",
        borderRadius: 10,
        marginBottom: wp("0.5%"),
        backgroundColor: "#300C4B",
        justifyContent: "center",
        paddingHorizontal: wp("2.5%"),
        paddingVertical: wp("3%")
    },

    callout: {
        width: wp("45%"),
        flexDirection: "row",
        alignItems: "center"
    },



});

export default Home;