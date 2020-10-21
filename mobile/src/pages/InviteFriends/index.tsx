import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, ScrollView, Linking, Share, Platform } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconAwesome from "@expo/vector-icons/build/FontAwesome5";
import Icon from "@expo/vector-icons/build/Feather";
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-x/clipboard';
import * as MailComposer from "expo-mail-composer";


function InviteFriends() {

    const navigation = useNavigation();

    const [code, setCode] = useState("");

    const shareLinkContent = {
        contentType: 'link',
        contentUrl: "https://facebook.com",
        contentDescription: 'Facebook sharing is easy!',
    };

    useEffect(() => {
        async function GetCode() {
            const id_Doador = await AsyncStorage.getItem("isLoggedId");
            try {
                api.get(`doador/${id_Doador}`).then(response => {
                    setCode(response.data.Codigo_Convite);
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        GetCode();
    }, [])

    function handleGoBack() {
        navigation.goBack();
    }

    function copyText() {
        Clipboard.setString(code);
        Toast.show({
            type: 'info',
            text1: 'Copiado',
            text2: 'Agora é só compartilhar!',
            visibilityTime: 3000,
            topOffset: 20
        })
    }

    function shareToWhatsAppp() {
        Linking.openURL(`whatsapp://send?text=Descobri uma forma de fazer o bem de uma forma rápida e divertida! Bora mudar o mundo comigo? Usando meu código *${code}* você ganha 10 pontos logo de cara!💜💜`);
    }

    function sharePlus() {
        Share.share({
            title: 'Convide amigos para o DonationDo',
            message: `Descobri uma forma de fazer o bem de uma forma rápida e divertida! Bora mudar o mundo comigo? Usando meu código *${code}* você ganha 10 pontos logo de cara!💜💜`,
        })
    }

    function shareEmail() {
        MailComposer.composeAsync({
            subject: "Você recebeu um convite DonationDo",
            body: `Descobri uma forma de fazer o bem de uma forma rápida e divertida! Bora mudar o mundo comigo? Usando meu código (${code}) você ganha 10 pontos logo de cara!💜💜`
          });
    }

    function shareSMS() {
        Linking.openURL(`sms:${Platform.OS === "ios" ? "&" : "?"}body=Descobri uma forma de fazer o bem de uma forma rápida e divertida! Bora mudar o mundo comigo? Usando meu código (${code}) você ganha 10 pontos logo de cara!💜💜`)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Convide amigos</Text>

                <View style={styles.containerDescription}>
                    <View style={styles.section1}>
                        <Text style={styles.text1}>Bora chamar mais gente pra nos
                        ajudar a mudar o mundo?
                        </Text>
                    </View>
                    <View style={styles.section2}>
                        <Text style={styles.text2}>Convide um amigo compartilhando esse
                        código, e ainda ganha um bônus de <Text style={styles.textPoint}>50 pontos!</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.containerShare}>
                    <View style={styles.containerCode}>
                        <Text style={styles.code}>{code.toUpperCase()}</Text>
                        <TouchableOpacity style={styles.copyButton} onPress={copyText}>
                            <Text style={styles.copyText}>Copiar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerShareCode}>
                        <Text style={styles.titleShare}>Ou compartilhe pelas redes</Text>
                        <View style={styles.containerButtonsShare}>
                            <View style={styles.sectionButtons}>
                                <TouchableOpacity style={styles.containerZap} onPress={shareToWhatsAppp}>
                                    <IconAwesome name="whatsapp" color="#fff" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.appName}>Whatsapp</Text>
                            </View>
                            <View style={styles.sectionButtons}>
                                <TouchableOpacity style={styles.containerFace} onPress={shareSMS} >
                                    <Icon name="phone" color="#fff" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.appName}>SMS</Text>
                            </View>
                            <View style={styles.sectionButtons}>
                                <TouchableOpacity style={styles.containerMail} onPress={shareEmail}>
                                    <IconAwesome name="envelope" color="#fff" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.appName}>E-mail</Text>
                            </View>
                            <View style={styles.sectionButtons}>
                                <TouchableOpacity style={styles.containerPlus} onPress={sharePlus}>
                                    <IconAwesome name="ellipsis-h" color="#fff" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.appName}>Mais</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerPostCode}>
                    <View style={styles.content}>
                        <Text style={styles.titleInput}>Insira o código abaixo:</Text>
                        <TextInput style={styles.inputCode} />
                        <View style={styles.buttonSubmitCode}>
                            <RectButton>
                                <Text style={styles.textButton}>Resgatar código</Text>
                            </RectButton>
                        </View>
                    </View>
                </View>
            </View>
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "#F1F1F1",
    },

    header: {
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
        color: "#36004A",
        fontWeight: "bold"
    },

    containerDescription: {
        marginTop: wp("8%"),
        padding: wp("5%"),
        backgroundColor: "#300C4B",
        width: wp("85%"),
        borderRadius: 8
    },

    section1: {
        alignItems: "center",
        justifyContent: "center"
    },

    text1: {
        color: "#F90CC5",
        fontSize: wp("5%"),
        textAlign: "center",
        fontWeight: "bold"
    },

    section2: {
        marginTop: wp("2%"),
        alignItems: "center",
        justifyContent: "center",
    },

    text2: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: wp("3.5%")
    },

    textPoint: {
        color: "#AB0BFF"
    },

    containerShare: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp("5%"),
        padding: wp("5%"),
        backgroundColor: "#fff",
        width: wp("85%"),
        borderRadius: 8
    },

    containerCode: {
        alignItems: "center",
        justifyContent: "center"
    },

    code: {
        fontSize: wp("7%"),
        fontWeight: "bold",
        color: "#F90CC5"
    },

    copyButton: {
        borderWidth: wp("0.3%"),
        borderColor: "#74009E",
        width: wp("25%"),
        height: hp("4%"),
        borderRadius: wp("100%"),
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp("3%")
    },

    copyText: {
        color: "#74009E",
        fontWeight: "bold"
    },

    containerShareCode: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp("5%")
    },

    titleShare: {
        fontSize: wp("3%"),
        color: "#8A8A8A"
    },

    containerButtonsShare: {
        marginTop: wp("6%"),
        flexDirection: "row"
    },

    sectionButtons: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("3.5%")
    },

    containerZap: {
        backgroundColor: "#33CC66",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },

    containerFace: {
        backgroundColor: "#74009E",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },

    containerMail: {
        backgroundColor: "#33A1CC",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },

    containerPlus: {
        backgroundColor: "#9E33CC",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },

    appName: {
        fontSize: wp("3%"),
        fontWeight: "bold",
        color: "#300C4B",
        marginTop: wp("1%")
    },

    containerPostCode: {
        marginBottom: wp("5%"),
        marginTop: wp("5%"),
        padding: wp("5%"),
        backgroundColor: "#fff",
        width: wp("85%"),
        borderRadius: 8
    },

    content: {
        justifyContent: "center"
    },

    titleInput: {
        textAlign: "left",
        fontSize: wp("3%"),
        color: "#8A8A8A"
    },

    inputCode: {
        borderBottomWidth: wp('0.3%'),
        borderBottomColor: "#300C4B",
        backgroundColor: 'rgba(249, 12, 197, 0.03)',
        marginTop: wp("5%")
    },

    buttonSubmitCode: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: wp("7%"),
        width: wp("45%"),
        borderWidth: wp("0.3%"),
        borderColor: "#74009E",
        height: hp("4%"),
        borderRadius: 100,
    },

    textButton: {
        color: "#74009E",
        fontWeight: "bold"
    }

})

export default InviteFriends;