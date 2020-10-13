import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "@expo/vector-icons/build/Feather";
import IconAwesome from "@expo/vector-icons/build/FontAwesome5";

function DrawerContent(props: any) {

    const navigation = useNavigation();

    function handleNavigateToHome () {
        navigation.navigate("Home")
    }

    function handleSignOut () {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Icon name="arrow-left" color="#fff" size={28} style={styles.arrowIcon} />
                    <View style={styles.perfilContainer}>
                        <View style={styles.perfil}>
                            {/* <Image source="" /> */}
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.name}>Luan Vinicius Simão</Text>
                            <Text style={styles.points}>25 pontos</Text>
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
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="user" color="#fff" size={24} />
                            )}
                            label="Meu Perfil"
                            onPress={() => props.navigation.navigate('')}
                            labelStyle={styles.drawerLabel}
                            style={styles.drawerItem}
                        />
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="history" color="#fff" size={24} />
                            )}
                            label="Histórico de doações"
                            onPress={() => props.navigation.navigate('')}
                            labelStyle={styles.drawerLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="hand-holding-heart" color="#fff" size={24} />
                            )}
                            label="Instituições acessadas"
                            onPress={() => props.navigation.navigate('')}
                            labelStyle={styles.drawerLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="award" color="#fff" size={24} />
                            )}
                            label="Meus pontos"
                            onPress={() => props.navigation.navigate('')}
                            labelStyle={styles.drawerLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="trophy" color="#fff" size={24} />
                            )}
                            label="Ranking"
                            onPress={() => props.navigation.navigate('')}
                            labelStyle={styles.drawerLabel}
                        />
                        <DrawerItem
                            icon={() => (
                                <IconAwesome name="sign-out-alt" color="#fff" size={24} />
                            )}
                            label="Sair"
                            onPress={handleSignOut}
                            labelStyle={styles.drawerLabel}
                        />
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
        marginTop: wp('8%'),
    },

    drawerItem: {
        marginRight: 12
    },

    drawerLabel: {
        color: "#fff",
        fontSize: wp('4%'),
        fontWeight: "bold",
        marginLeft: wp('-5%'),
        width: wp('52%')
    }
})

export default DrawerContent;