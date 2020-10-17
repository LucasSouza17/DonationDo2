import React from 'react'
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


function DescriptionNeed() {

    const navigation = useNavigation();

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

                            <View style={styles.contact}>
                                <Text style={{ padding: wp("2%"), marginTop: wp("2%"), fontWeight: "bold" }}>Navegação rápida</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.containerButtonAddress}>
                                        <TouchableOpacity style={styles.buttonMap}>
                                            <Icon name="map" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <Text style={styles.titleButton}>GoogleMaps</Text>
                                    </View>
                                    <View style={styles.containerButtonAddress}>
                                        <TouchableOpacity style={styles.buttonZap}>
                                            <IconAwesome name="whatsapp" color="#fff" size={20} />
                                        </TouchableOpacity>
                                        <Text style={styles.titleButton}>Whatsapp</Text>
                                    </View>
                                    <View style={styles.containerButtonAddress}>
                                        <TouchableOpacity style={styles.buttonPhone}>
                                            <Icon name="phone" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <Text style={styles.titleButton}>Telefone</Text>
                                    </View>
                                    <View style={styles.containerButtonAddress}>
                                        <TouchableOpacity style={styles.buttonMail}>
                                            <Icon name="mail" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <Text style={styles.titleButton}>E-mail</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerButton}>
                    <RectButton style={styles.button} onPress={handleNavigateToConfirmDonation}>
                        <Text style={styles.textButton}>Doar</Text>
                    </RectButton>
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

    containerButton: {
        marginTop: wp("5%"),
        height: hp("6%"),
        backgroundColor: "#15C211",
        marginBottom: wp("5%"),
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    button: {
        width: wp("85.5%"),
        height: hp("6%"),
        alignItems: "center",
        justifyContent: "center"
    },
    
    textButton: {
        color: "#fff",
        fontSize: wp("5%"),
        fontWeight: "bold"
    }
})

export default DescriptionNeed;