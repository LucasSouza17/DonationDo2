import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/build/Feather";
import IconAwesome from "@expo/vector-icons/build/FontAwesome";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';


function DonationProgress() {

    const navigation = useNavigation();

    let Status = "pendente";
    const [colorStatus, setColorStatus] = useState("");
    const [textStatus, setTextStatus] = useState("");
    const [iconUri, setIconUri] = useState(require("../../assets/icons/pendent.png"));

    useEffect(() => {
        if (Status === "pendente") {
            setColorStatus("#FFB800");
            setTextStatus("Doação pendente");
            setIconUri(require("../../assets/icons/pendent.png"));
        } else if (Status === "concluido") {
            setColorStatus("#15C211");
            setTextStatus("Doação concluida")
            setIconUri(require("../../assets/icons/correct.png"));
        } else {
            setColorStatus("#C21111");
            setTextStatus("Doação recusada")
            setIconUri(require("../../assets/icons/recusado.png"));
        }
    }, [])





    function handleNavigateGoBack() {
        navigation.goBack();
    }

    function handleNavigateToConfirmDonation() {
        navigation.navigate("ConfirmDonation");
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
                    <Image style={styles.image} source={require('../../assets/us.png')} />
                </View>

                <View style={styles.receptorData}>
                    <Text style={styles.nomeReceptor}>Assistência Social Gonzaga</Text>
                    <Text style={styles.tipoReceptor}>ONG</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: wp("5%") }}>
                    <View style={styles.dataNeed}>
                        <Text style={styles.titleNeed}>Roupas</Text>
                        <View style={styles.descriptionData}>
                            <Text style={styles.titleText}>Descrição da necessidade</Text>
                            <Text style={styles.descriptionText}>Precisamos de roupas para a Casa de Idosos
                            da cidade
                            </Text>
                        </View>
                        <View style={styles.addressData}>
                            <Text style={styles.titleText}>Endereço</Text>
                            <Text style={styles.descriptionText}>São José do Rio Preto - SP</Text>
                            <Text style={styles.descriptionText}>Rua Raul de Carvalho</Text>
                            <Text style={styles.descriptionText}>Nº 210</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerButton}>
                    <View style={{ borderColor: colorStatus, borderRadius: 50, borderWidth: wp("0.4%") }}>
                        <RectButton style={styles.button} onPress={handleNavigateToConfirmDonation}>
                            <Text style={{
                                color: colorStatus,
                                fontSize: wp("5%"),
                                fontWeight: "bold"
                            }}>{textStatus}
                            </Text>
                            <Image style={styles.iconButton}  source={iconUri} />
                        </RectButton>
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

    button: {
        width: wp("85.5%"),
        height: hp("6%"),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },

    iconButton: {
        marginLeft: wp("2%")
    }


})

export default DonationProgress;