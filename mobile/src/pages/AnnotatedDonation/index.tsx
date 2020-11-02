import React from 'react';
import { View, ImageBackground, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function AnnotatedDonation() {

    const navigation = useNavigation();

    function handleNavigateToHome() {
        navigation.dispatch(StackActions.push("Home"));
    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/background/doacao_anotada.jpg')}>
            <View style={styles.section}>
                <Image source={require("../../assets/icons/right.png")} />
                <Text style={styles.title}>Doação anotada!</Text>
                <Text style={styles.description}>Você pode visualizar as informações de
                suas doações no menu em
                </Text>
                <Text style={styles.destaque}> Histório de doações</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToHome}>
                <Text style={styles.textButton}>Voltar à página principal</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

    section: {
        alignItems: "center",
        marginTop: wp("30%")
    },

    title: {
        fontSize: wp("6%"),
        color: "#fff",
        fontWeight: "bold"
    },

    description: {
        paddingHorizontal: wp("10%"),
        textAlign: "center",
        fontSize: wp("4%"),
        color: "#DA73FF",
        fontWeight: "bold"
    },

    destaque: {
        paddingHorizontal: wp("10%"),
        textAlign: "center",
        fontSize: wp("4%"),
        color: "#fff",
        fontWeight: "bold"
    },

    button: {
        width: wp("80%"),
        height: hp("6.5%"),
        backgroundColor: "#F90CC5",
        alignSelf: "center",
        marginTop: wp("50%"),
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    textButton: {
        color: "#fff",
        fontWeight: "bold"
    }
});

export default AnnotatedDonation;