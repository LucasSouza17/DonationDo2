import React from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import Icon from "@expo/vector-icons/build/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DrawerActions, useNavigation } from '@react-navigation/native'

function Perfil() {

    const navigation = useNavigation();

    function handleGoBack () {
        navigation.goBack();
    }

    function handleNavigateToUpdatePerfil () {
        navigation.navigate("UpdatePerfil");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="arrow-left" color="#fff" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Meu Perfil</Text>

                <View style={styles.avatar}>
                    {/* <Image /> */}
                </View>
                <Text style={styles.name}>Luan Vinícius Simão</Text>
                <Text style={styles.adress}>São José do Rio Preto - SP</Text>
                <TouchableOpacity style={styles.updateButton} onPress={handleNavigateToUpdatePerfil}>
                    <Text style={styles.textButton}>Alterar dados</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Image style={styles.logoImage} source={require('../../assets/logoapp/logoapp.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B"
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
        alignItems: "center"
    },

    title: {
        fontSize: wp('7%'),
        color: "#fff",
        fontWeight: "bold"
    },

    avatar: {
        marginTop: wp('15%'),
        backgroundColor: "#B1A0F4",
        width: 110,
        height: 110,
        borderRadius: wp('100%')
    },

    name: {
        fontSize: wp('7%'),
        color: "#fff",
        fontWeight: "bold",
        marginTop: wp('5%')
    },

    adress: {
        fontSize: wp("4%"),
        color: "#DA73FF",
        fontWeight: "bold"
    },

    updateButton: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: wp('0.3%'),
        width: wp('35%'),
        height: hp('5%'),
        borderRadius: 20,
        marginTop: wp("8%"),
        borderColor: "#fff"
    },

    textButton: {
        color: "#fff"
    },

    footer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: wp("10%")
    },

    logoImage: {
        resizeMode: "contain",
    }

});

export default Perfil;