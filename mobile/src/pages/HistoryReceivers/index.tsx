import React from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function HistoryReceiver() {

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
                <Text style={styles.title}>Instituições acessadas</Text>

                <View style={styles.containerHistory}>
                    <Text style={styles.textHistory}>Buscas Recentes</Text>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.containerList}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Assistência Social Gonzaga</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerList}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Assistência Social Gonzaga</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerList}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Assistência Social Gonzaga</Text>
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
        paddingHorizontal: wp("3%"),
        justifyContent: "center",
        borderWidth: wp("0.4%"),
        borderColor: "#74009E",
        width: wp("82%"),
        height: hp("6%"),
        borderRadius: 5,
        marginBottom: wp("2%")
    },

    textButton: {
        fontWeight: "bold",
        color: "#74009E"
    }


});

export default HistoryReceiver;