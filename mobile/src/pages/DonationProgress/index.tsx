import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
    Linking
} from "react-native";
import Icon from "@expo/vector-icons/build/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from '@react-navigation/native';
import IconAwesome from "@expo/vector-icons/build/FontAwesome";
import * as MailComposer from 'expo-mail-composer'

interface Params {
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

function DonationProgress() {

    const navigation = useNavigation();

    const route = useRoute();
    const routeParams = route.params as Params;

    let Status = routeParams.Status;
    const [colorStatus, setColorStatus] = useState("");
    const [textStatus, setTextStatus] = useState("");
    const [textColor, setTextColor] = useState("");
    const [iconUri, setIconUri] = useState(require("../../assets/icons/pendent.png"));

    useEffect(() => {
        if (Status === "Doação pendente") {
            setColorStatus("#FFB800");
            setTextColor("#FFB800");
            setTextStatus("Doação pendente");
            setIconUri(require("../../assets/icons/pendent.png"));
        }
        if (Status === "Doação concluida") {
            setColorStatus("#15C211");
            setTextColor("#15C211");
            setTextStatus("Doação concluida")
            setIconUri(require("../../assets/icons/correct.png"));
        }
        if (Status === "Doação recusada") {
            setColorStatus("#C21111");
            setTextColor("#C21111");
            setTextStatus("Doação recusada")
            setIconUri(require("../../assets/icons/recusado.png"));
        }
    }, [])

    function handleNavigateGoBack() {
        navigation.goBack();
    }

    function handleWhatsapp() {
        Linking.openURL(
            `whatsapp://send?phone=55${routeParams.Whatsapp}&text=Olá vim por meio do DonationDo e estou interessado em fazer uma doação!`
        );
    }

    function handleEmail() {
        MailComposer.composeAsync({
            subject: "Olá vim por meio do DonationDo e estou interessado em fazer uma doação!",
            recipients: [routeParams.Email],
        });
    }

    function handlePhone() {
        Linking.openURL(`tel:${routeParams.Telefone}`);
    }

    function handleMap() {
        Linking.openURL(
            `google.navigation:q=${routeParams.Latitude}+${routeParams.Longitude}`
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={{ uri: routeParams.image_url }} />
                </View>

                <View style={styles.receptorData}>
                    <Text style={styles.nomeReceptor}>{routeParams.NomeReceptor}</Text>
                    <Text style={styles.tipoReceptor}>{routeParams.Tipo}</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: wp("5%") }}>
                    <View style={styles.dataNeed}>
                        <Text style={styles.titleNeed}>{routeParams.Titulo}</Text>
                        <View style={styles.descriptionData}>
                            <Text style={styles.titleText}>Descrição da necessidade</Text>
                            <Text style={styles.descriptionText}>{routeParams.DescricaoNecessidade}
                            </Text>
                        </View>
                        <View style={styles.addressData}>
                            <Text style={styles.titleText}>Endereço</Text>
                            <Text style={styles.descriptionText}>{routeParams.Cidade} - {routeParams.UF}</Text>
                            <Text style={styles.descriptionText}>{routeParams.Rua}</Text>
                            <Text style={styles.descriptionText}>Nº {routeParams.Numero}</Text>
                        </View>
                    </View>

                    <View style={styles.contact}>
                        <Text style={{ padding: wp("2%"), marginTop: wp("2%"), fontWeight: "bold" }}>Navegação rápida</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.containerButtonAddress}>
                                <TouchableOpacity style={styles.buttonMap} onPress={handleMap}>
                                    <Icon name="map" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.titleButton}>GoogleMaps</Text>
                            </View>
                            <View style={styles.containerButtonAddress}>
                                <TouchableOpacity style={styles.buttonZap} onPress={handleWhatsapp}>
                                    <IconAwesome name="whatsapp" color="#fff" size={20} />
                                </TouchableOpacity>
                                <Text style={styles.titleButton}>Whatsapp</Text>
                            </View>
                            <View style={styles.containerButtonAddress}>
                                <TouchableOpacity style={styles.buttonPhone} onPress={handlePhone}>
                                    <Icon name="phone" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.titleButton}>Telefone</Text>
                            </View>
                            <View style={styles.containerButtonAddress}>
                                <TouchableOpacity style={styles.buttonMail} onPress={handleEmail}>
                                    <Icon name="mail" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.titleButton}>E-mail</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerButton}>
                    <View style={{
                        backgroundColor: "", width: wp("85.5%"), height: hp("6%"), alignItems: "center", justifyContent: "center", flexDirection: "row", borderColor: colorStatus, borderRadius: 50, borderWidth: wp("0.4%")
                    }}>
                        <Text style={{
                            fontSize: wp("5%"),
                            fontWeight: "bold",
                            color: textColor !== "" ? textColor : "white"
                        }}>{textStatus}
                        </Text>
                        <Image style={styles.iconButton} source={iconUri} />
                    </View>
                </View>
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
        paddingHorizontal: wp("7%"),
    },

    containerImage: {
        backgroundColor: "#300C4B",
        width: wp("85%"),
        height: hp("20%"),
        marginTop: wp("5%"),
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    image: {
        width: wp("85%"),
        height: hp("20%"),
        borderRadius: 7,
        resizeMode: "contain"
    },

    receptorData: {
        alignItems: "flex-start",
        marginTop: wp("3%")
    },

    nomeReceptor: {
        fontSize: wp("7%"),
        fontWeight: "bold",
        color: "#300C4B"
    },

    tipoReceptor: {
        color: "#8A8A8A",
        marginTop: wp("-0.5%")
    },

    dataNeed: {
        flex: 1,
        marginTop: wp("4.5%")
    },

    titleNeed: {
        color: "#F90CC5",
        fontSize: wp("5.5%"),
        fontWeight: "bold"
    },

    descriptionData: {
        marginTop: wp("3%")
    },

    addressData: {
        marginTop: wp("4%")
    },

    titleText: {
        color: "#000",
        fontWeight: "bold"
    },

    descriptionText: {
        color: "#8A8A8A",
        fontWeight: "bold"
    },

    containerButton: {
        marginTop: wp("5%"),
        height: hp("6%"),
        marginBottom: wp("5%"),
        alignItems: "center",
        justifyContent: "center"
    },


    iconButton: {
        marginLeft: wp("2%")
    },

    contact: {
        marginTop: wp("5%"),
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: wp("1%"),
        paddingBottom: wp("4%")
    },

    containerButtonAddress: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("4%"),
        marginTop: wp("4%"),
    },

    buttonMap: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#148A2E",
        width: 44,
        height: 44,
        borderRadius: 50
    },

    buttonZap: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#33CC66",
        width: 44,
        height: 44,
        borderRadius: 50
    },

    buttonPhone: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7633CC",
        width: 44,
        height: 44,
        borderRadius: 50
    },

    buttonMail: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#33A1CC",
        width: 44,
        height: 44,
        borderRadius: 50
    },

    titleButton: {
        fontSize: wp("2.7%"),
        marginTop: wp("1%")
    },

})

export default DonationProgress;