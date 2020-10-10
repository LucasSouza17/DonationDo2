import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Login () {

    return(
        <ImageBackground source={require('../../assets/background.png')} style={styles.container}>
            <Image source={require("../../assets/logoapp/logoapp.png")} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#300C4B",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "cover",
        width: '100%', 
        height: '100%'
    },
    
})

export default Login;