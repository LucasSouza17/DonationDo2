import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "@expo/vector-icons/build/Feather";
import IconAwesome from "@expo/vector-icons/build/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

function DrawerContent(props: any) {

    const navigation = useNavigation();

    const [nomeUser, setNomeUser] = useState<string | null>("");
    const [pointsUser, setPointsUser] = useState("");
    const [idUser, setIdUser] = useState<string | null>("");
    const [avatar, setAvatar] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getDataUser() {
            const Id = await AsyncStorage.getItem("isLoggedId");
            setIdUser(Id);
            try {
                setLoading(true)
                await api.get(`doador/${Number(idUser)}`).then(response => {
                    setPointsUser(response.data.Pontuacao);
                    setNomeUser(response.data.Nome);
                    setAvatar(response.data.avatar_url);
                })
            } catch (err) {
                console.log(err);
            }
        }

        getDataUser();
    }, [nomeUser, pointsUser, idUser, avatar, loading])

    function handleNavigateToHome() {
        navigation.navigate("Home");
    }

    function handleNavigateToPerfil() {
        navigation.navigate("Perfil");
    }

    function handleNavigateToHistoryReceivers() {
        navigation.navigate("HistoryReceivers")
    }

    function handleNavigateToHistoryDonation() {
        navigation.navigate("HistoryDonation");
    }

    function handleNavigateToRanking() {
        navigation.navigate("Ranking");
    }

    function handleNavigateToInviteFriends() {
        navigation.navigate("InviteFriends");
    }

    function handleNavigateToMyPoints() {
        navigation.navigate("MyPoints");
    }

    async function handleSignOut() {
        await AsyncStorage.clear();
        navigation.navigate("UserNotAuth");
    }

    function handleCloseMenu() {
        navigation.dispatch(DrawerActions.closeDrawer());
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableOpacity onPress={handleCloseMenu}>
                        <Icon name="arrow-left" color="#fff" size={28} style={styles.arrowIcon} />
                    </TouchableOpacity>
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
                        <View style={styles.userData}>
                            <Text style={styles.name}>{nomeUser}</Text>
                            <Text style={styles.points}>{pointsUser} pontos</Text>
                        </View>
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="map-marked-alt" color="#fff" size={24} />
                            )}
                            label="Tela Inicial"
                            onPress={handleNavigateToHome}
                            labelStyle={styles.drawerLabel}
                            style={styles.drawerItem}

                        />

                        <View style={styles.separator}>
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="user" color="#fff" size={24} />
                                )}
                                label="Meu Perfil"
                                onPress={handleNavigateToPerfil}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="history" color="#fff" size={24} />
                                )}
                                label="Histórico de doações"
                                onPress={handleNavigateToHistoryDonation}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="hand-holding-heart" color="#fff" size={24} />
                                )}
                                label="Instituições acessadas"
                                onPress={handleNavigateToHistoryReceivers}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                        </View>

                        <View style={styles.separator}>
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="award" color="#fff" size={24} />
                                )}
                                label="Meus pontos"
                                onPress={handleNavigateToMyPoints}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="trophy" color="#fff" size={24} />
                                )}
                                label="Ranking"
                                onPress={handleNavigateToRanking}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="user-plus" color="#fff" size={24} />
                                )}
                                label="Convide amigos"
                                onPress={handleNavigateToInviteFriends}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                        </View>

                        <View style={styles.separator}>
                            <DrawerItem
                                icon={() => (
                                    <IconAwesome name="sign-out-alt" color="#fff" size={24} />
                                )}
                                label="Sair"
                                onPress={handleSignOut}
                                labelStyle={styles.drawerLabel}
                                style={styles.drawerItem}
                            />
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B"
    },

    drawerContent: {
        flex: 1
    },

    arrowIcon: {
        padding: wp('4%')
    },

    perfilContainer: {
        paddingLeft: wp('4%'),
        flexDirection: "row",
        alignItems: "center",
    },

    perfil: {
        width: 70,
        height: 70,
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

    drawerSection: {
        marginTop: wp('5%'),
    },

    drawerItem: {
        marginRight: wp('3%'),
        marginTop: wp('3%')
    },

    drawerLabel: {
        color: "#fff",
        fontSize: wp('4%'),
        fontWeight: "bold",
        marginLeft: wp('-5%'),
        width: wp('52%')
    },

    separator: {
        marginTop: wp("4%")
    }
})

export default DrawerContent;