import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, FlatList, LogBox, ImageBackground } from 'react-native';
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
import { Picker } from '@react-native-community/picker'
import axios from 'axios';
import { SvgCssUri } from "react-native-svg";


LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

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

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

interface Item {
    id: number;
    Nome: string;
    image_mob: string;
}

function Home() {

    const modalizeRef = useRef<Modalize>(null);

    const navigation = useNavigation();

    const ToastModalize = Toast;

    const [nomeUser, setNomeUser] = useState(null);
    const [idUser, setIdUser] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [pointsUser, setPointsUser] = useState(null);
    const [userUf, setUserUf] = useState<string | number | null>(null);
    const [userCity, setUserCity] = useState<string | number | null>(null);

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState<string | number | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | number | null>(null);
    const [filterUf, setFilterUf] = useState<string | number | null>(null);
    const [filterCity, setFilterCity] = useState<string | number | null>(null);

    const [itens, setItens] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([1]);
    const [filterItem, setFilterItem] = useState<number>(0);

    const [points, setPoints] = useState<PointI[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    const [loadingData, setLoadingData] = useState(true);
    const [loadingPoints, setLoadingPoints] = useState(true);
    const [refresh, setRefresh] = useState(false);

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
    }, [selectedUf, selectedCity]);

    useEffect(() => {
        setRefresh(false);
        let isSubscribed = true;
        AsyncStorage.getItem("isLoggedId").then(id => {
            setIdUser(id)
        });
        try {
            api.get(`doador/${Number(idUser)}`).then((response) => {
                setTimeout(() => {
                    if (isSubscribed) {
                        setSelectedUf(response.data.UF);
                        setSelectedCity(response.data.Cidade);
                        setUserUf(response.data.UF);
                        setUserCity(response.data.Cidade);
                        setPointsUser(response.data.Pontuacao);
                        setNomeUser(response.data.Nome);
                        setAvatar(response.data.avatar_url);
                        setLoadingData(false);
                    }
                }, 200);
            }).catch(error => {
                if (isSubscribed) {
                    console.log(error)
                    setSelectedUf(null);
                    setSelectedCity(null);
                    setPointsUser(null);
                    setNomeUser(null);
                    setAvatar(null);
                    setLoadingData(true);
                }
            })
        } catch (err) {
            console.log(err);
        }

        return function cleanup() {
            isSubscribed = false;
        }

    }, [avatar, pointsUser, userUf, userCity, refresh])

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

        let isSubscribed = true;
        try {
            if (filterItem === 0 && filterUf === null && filterCity === null) {
                api.get("filternecessidades", {
                    params: {
                        UF: userUf,
                        Cidade: userCity,
                        id_Item: 1
                    },
                }).then(response => {
                    setTimeout(() => {
                        if (isSubscribed) {
                            setPoints(response.data);
                            setLoadingPoints(false);
                        }
                    }, 400)
                }).catch(error => {
                    if (isSubscribed) {
                        console.log(error)
                        setPoints([]);
                        setLoadingPoints(true);
                    }
                })
            } else if (filterItem !== 0 && filterUf !== null && filterCity !== null) {
                api.get("filternecessidades", {
                    params: {
                        UF: filterUf,
                        Cidade: filterCity,
                        id_Item: filterItem
                    },
                }).then(response => {
                    setTimeout(() => {
                        if (isSubscribed) {
                            setPoints(response.data);
                            setLoadingPoints(false);
                        }
                    }, 400)
                }).catch(error => {
                    if (isSubscribed) {
                        console.log(error)
                        setPoints([]);
                        setLoadingPoints(true);
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }

        return function cleanup() {
            isSubscribed = false;
        }

    }, [filterItem, filterUf, filterCity, userCity, userUf])

    useEffect(() => {
        api.get("itens").then((response) => {
            setItens(response.data);
        });
    }, []);

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

    function ItensList({ id, icone, nome }) {
        return (
            <View style={styles.itensContainer}>
                <TouchableOpacity
                    key={String(id)}
                    style={[
                        styles.item,
                        selectedItems.includes(id) ? styles.selectedItem : {},
                    ]}
                    activeOpacity={0.6}
                    onPress={() => handleSelectItem(id)}
                >
                    <SvgCssUri width={36} height={36} uri={icone} />
                    <Text style={styles.nomeItem}>{nome}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function handleSelectItem(id: number) {
        if (selectedItems >= [0]) {
            setSelectedItems([0]);
        }
        setSelectedItems([id]);
    }

    function handleFilter() {
        if (selectedCity === userCity && selectedUf !== userUf) {
            ToastModalize.show({
                type: 'error',
                text1: 'Preencha a cidade',
                text2: 'Você esqueceu de preencher a cidade correspondente',
                visibilityTime: 2000,
                topOffset: 7
            })
        } else {
            setFilterUf(selectedUf);
            setFilterCity(selectedCity);
            setFilterItem(Number(selectedItems));
            modalizeRef.current?.close();
        }
    }

    function handleRefresh() {
        setRefresh(true);
    }


    return (
        <View style={styles.container}>
            {!loadingData && (
                <View style={styles.headerContainer}>
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
                        <View style={styles.containerUserData}>
                            <View style={styles.userData}>
                                <Text style={styles.name}>{nomeUser}</Text>
                                <Text style={styles.points}>{pointsUser} pontos</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleRefresh}>
                                    <Icon name="rotate-ccw" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleDrawerOpen}>
                        <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
            )}
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
            <View style={styles.mainContainer}>
                {!loadingData && (
                    <View style={styles.headerMain}>
                        <Text style={styles.title}>Filtre sua busca para doar</Text>
                        <TouchableOpacity style={styles.filterButton} onPress={onOpenModalize}>
                            <Text style={styles.textButton}>Filtrar</Text>
                            <Icon name="filter" color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
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
                                    pinColor="#280046"
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
                                                                fontSize: wp("2.8%"),
                                                                fontWeight: "bold"
                                                            }
                                                        }>
                                                        {point.Nome}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            {
                                                                color: "#F90CC5",
                                                                fontWeight: "bold",
                                                                fontSize: wp("3%")
                                                            }
                                                        }>
                                                        {point.Titulo}
                                                    </Text>
                                                </View>
                                                <Text style={{ color: "#fff", fontSize: wp("2%"), marginLeft: wp("4%"), fontWeight: "bold" }}>Clique Aqui!</Text>
                                            </View>
                                        </View>
                                    </Callout>
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
                            <ImageBackground imageStyle={{ opacity: 0.22, resizeMode: "cover", borderRadius: 8 }} style={styles.imageList} source={{ uri: point.image_url }}>
                                <Text style={styles.namePoint}>{point.Nome}</Text>
                                <Text style={styles.titlePoint}>{point.Titulo}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Modalize snapPoint={hp("100%")} modalHeight={hp("100%")} ref={modalizeRef} handleStyle={{ backgroundColor: "#B95FF9" }}>
                <View style={styles.containerModalize}>
                    <View style={styles.headerModalize}>
                        <Text style={styles.titleModalize}>Filtrar busca</Text>
                    </View>
                    <ToastModalize ref={(ref: any) => ToastModalize.setRef(ref)} />
                    <View style={styles.containerPicker}>
                        <Text style={styles.descriptionPicker}>Escolha um estado e em seguida uma cidade</Text>
                        <View style={styles.inputPicker}>
                            <Picker
                                itemStyle={styles.pickerIOS}
                                style={styles.picker}
                                selectedValue={String(selectedUf)}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedUf(itemValue.toString())
                                }
                            >
                                <Picker.Item label="Estado" value="0" color="#D6CCCA" />
                                {ufs.map((uf) => (
                                    <Picker.Item
                                        label={uf}
                                        value={uf}
                                        key={uf}
                                        color="#000" />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputPicker}>
                            <Picker
                                itemStyle={styles.pickerIOS}
                                style={styles.picker}
                                selectedValue={String(selectedCity)}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCity(String(itemValue))
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
                    </View>
                </View>
                <View style={{ paddingLeft: wp("10%"), marginTop: wp("3.5%") }}>
                    <Text style={styles.descriptionitem}> Selecione apenas um tipo que deseja doar </Text>
                    <FlatList
                        data={itens}
                        renderItem={({ item }) => <ItensList id={item.id} nome={item.Nome} icone={item.image_mob} />}
                        numColumns={3}
                        columnWrapperStyle={{ flex: 1, justifyContent: "flex-start" }}
                    />
                </View>
                <TouchableOpacity onPress={handleFilter} style={{ width: wp("80%"), height: hp("5%"), backgroundColor: "#15C211", alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: wp("7%"), borderRadius: 20 }}>
                    <Text style={{ color: "#fff" }}>Filtrar Busca</Text>
                </TouchableOpacity>
            </Modalize>
        </View>
    )
};

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

    containerUserData: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    userData: {
        marginLeft: wp('2%'),
        marginRight: wp('4%')
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
        marginTop: wp('1%')
    },

    headerMain: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: wp('4%'),
        marginTop: wp('3%'),
    },

    title: {
        fontSize: wp('4.5%'),
        color: "#300C4B",
        fontWeight: "bold"
    },

    filterButton: {
        backgroundColor: "#F90CC5",
        width: wp('23%'),
        height: hp('4%'),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20
    },

    textButton: {
        marginHorizontal: wp('1.3%'),
        color: "#fff"
    },

    mapContainer: {
        flex: 1,
        padding: wp('4%'),
        marginTop: wp('-4%')
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
        width: "100%",
        height: "100%",
        borderRadius: 8,
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    titlePoint: {
        padding: wp('0.5%'),
        textAlign: "center",
        color: "#F90CC5",
        fontSize: wp("2.8%"),
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontWeight: "bold",
    },

    namePoint: {
        padding: wp('0.5%'),
        textAlign: "center",
        color: "#fff",
        fontSize: wp("2.7%"),
        fontWeight: "bold",
    },

    calloutBackground: {
        borderRadius: 10,
        marginBottom: wp("0.5%"),
        backgroundColor: "#300C4B",
        justifyContent: "center",
        paddingHorizontal: wp("2.5%"),
        paddingVertical: wp("3%")
    },

    callout: {
        flexDirection: "row",
        alignItems: "center",
    },

    containerModalize: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    },

    headerModalize: {
        marginTop: StatusBar.currentHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp('5%'),
    },

    titleModalize: {
        color: "#300C4B",
        fontSize: wp("7%"),
        fontWeight: "bold"
    },

    containerPicker: {
        marginTop: wp("6%"),
        paddingHorizontal: wp("10%")
    },

    descriptionPicker: {
        color: "#8A8A8A",
        fontSize: wp("3.5%")
    },

    inputPicker: {
        marginTop: wp('4%'),
        backgroundColor: "#CCCCCC",
        borderRadius: 8,
    },

    picker: {
        width: wp("80%"),
        height: hp("6%"),
        color: "#000"
    },

    pickerIOS: {
        width: wp("80%"),
        height: hp("6%"),
    },

    itensContainer: {
        flexDirection: "row",
        marginTop: wp('5%'),
    },

    item: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#eee",
        height: hp('13%'),
        width: wp('23%'),
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: wp('7%'),
        paddingBottom: wp('6%'),
        marginRight: wp('3%'),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },

    selectedItem: {
        backgroundColor: "#EACEFE",
        borderColor: "#B95FF9",
    },

    nomeItem: {
        marginTop: wp("1%"),
        fontSize: hp('1.3%'),
        alignSelf: "center"
    },

    descriptionitem: {
        color: "#8A8A8A",
        fontSize: wp("3.5%"),
    }
});

export default Home;