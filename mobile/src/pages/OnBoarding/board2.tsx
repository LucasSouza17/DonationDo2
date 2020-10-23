import React from 'react';
import { Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';

function OnBoarding2() {
    const navigation = useNavigation();

    function handleEndBoard () {
        navigation.navigate("UserAuth");
    }

    return (
        <ImageBackground source={require('../../assets/onboarding/onboarding.jpg')} style={styles.container}>
            <Image style={styles.board1} source={require("../../assets/onboarding/board2.png")} />
            <Text style={styles.title}>Convide Amigos</Text>
            <Text style={styles.description}>Convide amigos para ganhar o bonûs de<Text style={styles.destaque}> 50 pontos.</Text></Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleEndBoard}>
                <Text style={styles.textButton}>Pronto</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center"
    },

    board1: {
        width: wp("85%"),
        resizeMode: "contain"
    },

    title: {
        color: "#000",
        fontSize: wp('6.5%'),
        fontWeight: "bold"
    },

    description: {
        color: "#646464",
        fontSize: wp("5%"),
        textAlign: "center",
        fontWeight: "bold",
        paddingHorizontal: wp('10%')
    },

    destaque: {
        color: "#B000F0"
    },

    nextButton: {
        marginTop: wp("25%"),
        borderColor: "#74009E",
        borderWidth: wp("0.3%"),
        width: wp("40%"),
        height: hp("5.5%"),
        alignItems: "center",
        justifyContent:"center", 
        borderRadius: 20
    },

    textButton: {
        fontSize: wp('4.5%'),
        fontWeight:"bold",
        color: "#74009E"
    }

});

export default OnBoarding2;