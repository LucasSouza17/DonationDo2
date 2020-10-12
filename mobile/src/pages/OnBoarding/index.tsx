import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function OnBoarding() {
    const navigation = useNavigation();

    function handleNavigateToRegister() {
        navigation.navigate("Register");
    }

    const Next = ({ ...nextLabel }) => (
        <Button
            title={'Próximo'}
            buttonStyle={{
                backgroundColor: "#F90CC5",
                width: wp('25%'),
                height: hp('5%'),
                marginRight: wp('4%')
            }}
            titleStyle={{fontSize:wp("3%")}}
            {...nextLabel}
        />
    );

    const Done = ({ ...props }) => (
        <Button
            title={'Fim'}
            buttonStyle={{
                backgroundColor: "#15C211",
                width: wp('25%'),
                height: hp('5%'),
                marginRight: wp('4%')
            }}
            titleStyle={{fontSize:wp("3%")}}
            {...props}
        />
    );

    return (

        <ImageBackground source={require('../../assets/onboarding/onboarding.jpg')} style={styles.container}>
            <Onboarding
                showPagination={true}
                bottomBarHeight={wp('15%')}
                NextButtonComponent={Next}
                showSkip={false}
                transitionAnimationDuration={0.01}
                DoneButtonComponent={Done}
                onDone={handleNavigateToRegister}
                containerStyles={{ alignItems: "center", justifyContent: "center" }}
                pages={[
                    {
                        backgroundColor: "transparent",
                        image: <Image style={styles.imageBoard1} source={require("../../assets/onboarding/board1.png")} />,
                        title: "Ganhe pontos",
                        titleStyles: { color: "#000", fontWeight: "bold", fontSize: wp('7%') },
                        subtitle: `A cada doação realizada você ganha 10 pontos.`,
                        subTitleStyles: { color: "#646464", fontWeight: "bold", fontSize: wp('5.5%'), padding: wp('3%') }
                    },
                    {
                        backgroundColor: "transparent",
                        image: <Image style={styles.imageBoard2} source={require("../../assets/onboarding/board2.png")} />,
                        title: "Convide Amigos",
                        titleStyles: { color: "#000", fontWeight: "bold", fontSize: wp('7%') },
                        subtitle: `Convide amigos para ganhar o bônus de 50 pontos`,
                        subTitleStyles: { color: "#646464", fontWeight: "bold", fontSize: wp('5.5%'), padding: wp('3%') },
                    },
                ]}
            />
            <View style={{position: "absolute", marginTop: wp("20%"), marginLeft: wp("5%")}}>
                <TouchableOpacity onPress={handleNavigateToRegister} style={{ backgroundColor: "transparent", borderWidth: wp("0.6%"), width: wp("25%"), height: hp("4%"), alignItems:"center", justifyContent: "center", borderRadius: 5, borderColor: "#F90CC5"}}>
                    <Text style={{color: "#F90CC5", fontWeight:"bold"}}>Pular</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#300C4B",
        resizeMode: "cover",
    },

    imageBoard1: {
        resizeMode: "contain",
        width: "90%",
        alignSelf: "center"
    },

    imageBoard2: {
        resizeMode: "contain",
        width: "90%",
        alignSelf: "center"
    },

    nextButton: {
        backgroundColor: "#000",
        borderWidth: wp('1%'),
        width: wp('40%'),
        height: hp('5%')
    }

});

export default OnBoarding;