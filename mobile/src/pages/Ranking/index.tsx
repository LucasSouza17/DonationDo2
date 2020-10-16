import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function Ranking() {

    const navigation = useNavigation();

    function handleNavigateGoBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#36004A" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Ranking</Text>

                <View style={styles.containerHistory}>
                    <Text style={styles.textHistory}>Veja o ranking de doadores da sua região</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                                <View style={styles.containerList}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.textNumberRanking}>1</Text>
                                        <Text style={styles.textButton}>Luan Vinícius Simão</Text>
                                        <Text style={styles.textPoints}>26</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerList}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.textNumberRanking}>2</Text>
                                        <Text style={styles.textButton}>Frangolino Pinto</Text>
                                        <Text style={styles.textPoints}>13</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerList}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.textNumberRanking}>3</Text>
                                        <Text style={styles.textButton}>Aroizin Del Rey</Text>
                                        <Text style={styles.textPoints}>9</Text>
                                    </TouchableOpacity>
                                </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
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
        paddingHorizontal: wp("6.5%"),
        marginTop: wp('3%'),
    },

    title: {
        fontSize: wp('7%'),
        color: "#300C4B",
        fontWeight: "bold"
    },

    containerHistory: {
        marginTop: wp("4%"),
    },

    textHistory: {
        fontWeight: "bold",
        color: "#8A8A8A"
    },

    containerList: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('2%')
    },

    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#74009E",
        width: wp("82%"),
        height: hp("8%"),
        borderRadius: 5,
        marginBottom: wp("2%")
    },

    textNumberRanking: {
        color: "#263238",
        fontSize: wp("5%"),
        fontWeight: "bold",
    },

    textButton: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: wp("3.7%"),
    },

    textPoints: {
        color: "#fff",
        fontSize: wp("5%"),
        fontWeight: "bold"
    }


});

export default Ranking;