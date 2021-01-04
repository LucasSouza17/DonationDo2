import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import Icon from "@expo/vector-icons/build/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

function Perfil() {

    const navigation = useNavigation();

    const [nome, setNomeUser] = useState<string | null>("");
    const [idUser, setIdUser] = useState<string | null>("");
    const [uf, setUfUser] = useState<string | null>("");
    const [city, setCityUser] = useState<string | null>("");
    const [avatar, setAvatar] = useState("");

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function getDataUser() {
            const Id = await AsyncStorage.getItem("isLoggedId");
            setIdUser(Id);
            try {
                setLoading(true);
                await api.get(`doador/${Number(idUser)}`).then((response) => {
                    setNomeUser(response.data.Nome);
                    setUfUser(response.data.UF);
                    setCityUser(response.data.Cidade);
                    setAvatar(response.data.avatar_url);
                })
            } catch (err) {
                console.log(err)
            }
        }
        getDataUser();
    }, [nome, uf, city, avatar, loading])

    function handleGoBack() {
        navigation.goBack();
    }

    function handleNavigateToUpdatePerfil() {
        navigation.navigate("PerfilUpdate")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="arrow-left" color="#fff" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main} >
                <Text style={styles.title}>Meu Perfil</Text>
                <View style={styles.containerAvatar}>
                    <View style={styles.avatar}>
                        <Image
                            source={{
                                uri: avatar
                                    ? avatar
                                    : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
                            }}
                            style={styles.avatar}
                        />
                    </View>
                </View>
                <Text style={styles.name}>{nome}</Text>
                <Text style={styles.adress}>{city} - {uf}</Text>
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

    containerAvatar: {
        marginTop: wp("15%")
    },

    avatar: {
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