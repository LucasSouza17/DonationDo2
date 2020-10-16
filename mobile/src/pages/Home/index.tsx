import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/build/Feather";
import MapView, { Marker } from "react-native-maps";
import IconAwesome from "@expo/vector-icons/build/FontAwesome5";
import { DrawerActions, useNavigation } from '@react-navigation/native';

function Home() {

    const navigation = useNavigation();

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
                        <Text style={styles.name}>Luan Vinicius Simão</Text>
                        <Text style={styles.points}>25 pontos</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleDrawerOpen}>
                    <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.headerMain}>
                    <Text style={styles.title}>Filtre sua busca para doar</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.textButton}>Filtrar</Text>
                        <Icon name="filter" color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -20.805321,
                            longitude: -49.4363367,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: -20.805321,
                                longitude: -49.4363367
                            }}
                            style={styles.mapMarker}
                            onPress={handleNavigateToDescriptionNeed}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage} source={require("../../assets/doacao1.png")} />
                                <Text style={styles.mapMarkerTitle}>Assis Social</Text>
                            </View>
                            <IconAwesome
                                style={styles.sortDown}
                                name="sort-down"
                                size={18}
                            />
                        </Marker>
                        <Marker
                            coordinate={{
                                latitude: -20.8105527,
                                longitude: -49.4266407
                            }}
                            style={styles.mapMarker}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage} source={require("../../assets/doacao1.png")} />
                                <Text style={styles.mapMarkerTitle}>Assis Social</Text>
                            </View>
                            <IconAwesome
                                style={styles.sortDown}
                                name="sort-down"
                                size={18}
                            />
                        </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.containerList}>
                <ScrollView
                    style={styles.listPoints}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: wp('2%') }}
                >
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.List}>
                        <Image style={styles.imageList} source={require("../../assets/doacao1.png")} />
                        <Text style={styles.namePoint}>Assis Social</Text>
                    </TouchableOpacity>
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
        flex: 1,
        resizeMode: "contain",
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
        backgroundColor: "#300C4B",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
    },

    mapMarkerImage: {
        width: wp('9%'),
        resizeMode: "contain",
    },

    mapMarkerTitle: {
        flex: 1,
        textAlign: "center",
        width: '100%',
        color: "#FFF",
        fontSize: 8,
        fontWeight: "bold",
        lineHeight: 23,
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