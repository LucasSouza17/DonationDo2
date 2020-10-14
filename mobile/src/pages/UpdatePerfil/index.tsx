import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Picker } from '@react-native-community/picker'


interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

function UpdatePerfil() {

    const navigation = useNavigation();

    const [image, setImage] = useState("");

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");

    useEffect(() => {
        axios
            .get<IBGEUFResponse[]>(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            )
            .then((response) => {
                const ufInitials = response.data.map((uf) => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === "0") return;

        axios
            .get<IBGECityResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )
            .then((response) => {
                const cityNames = response.data.map((city) => city.nome);
                setCities(cityNames);
            });
    }, [selectedUf]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function handleNavigateGoBack () {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavigateGoBack}>
                    <Icon name="arrow-left" color="#fff" size={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Atualizar Dados</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.description}>Trocar a imagem de perfil</Text>
                    <TouchableOpacity style={styles.avatar} onPress={pickImage}>
                        {image && <Image source={{ uri: image }} style={{ width: 130, height: 130, borderRadius: wp('100%') }} />}
                    </TouchableOpacity>
                    <View style={styles.containerPicker}>
                        <View style={styles.inputPicker}>
                            <Picker
                                itemStyle={styles.pickerIOS}
                                style={styles.picker}
                                selectedValue={selectedUf}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedUf(itemValue.toString())
                                }
                            >
                                <Picker.Item label="Estado" value="0" color="#D6CCCA" />
                                {ufs.map((uf) => (
                                    <Picker.Item label={uf} value={uf} key={uf} color="#000" />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputPicker}>
                            <Picker
                                itemStyle={styles.pickerIOS}
                                style={styles.picker}
                                selectedValue={selectedCity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCity(itemValue.toString())
                                }
                            >
                                <Picker.Item label="Cidade" value="0" color="#D6CCCA" />
                                {cities.map((city) => (
                                    <Picker.Item
                                        label={city}
                                        value={city}
                                        key={city}
                                        color="#000"
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.containerButton}>
            <RectButton style={styles.buttonSubmit}>
                <Text style={styles.textButton}>Salvar dados</Text>
                </RectButton>
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
        marginTop: wp('3%'),
        backgroundColor: "#B1A0F4",
        width: 140,
        height: 140,
        borderRadius: wp('100%')
    },

    formContainer: {
        marginTop: wp("12%"),
        alignItems: "center",
        justifyContent: "center"
    },

    description: {
        fontSize: wp("4.5%"),
        color: "#fff"
    },

    containerPicker: {
        marginTop: wp("6%")
    },

    inputPicker: {
        marginTop: wp('3%'),
        backgroundColor: "#200237",
        borderRadius: 8,
    },

    picker: {
        width: wp("80%"),
        height: hp("6%"),
        color: "#4F0A83"
    },

    pickerIOS: {
        width: wp("80%"),
        height: hp("6%"),
    },

    containerButton: {
        alignItems: "center",
        justifyContent: "center", 
        marginBottom: wp("15%")
    },

    buttonSubmit: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#15C211",
        width: wp("80%"),
        height: hp("7%"),
        borderRadius: 50
    },
    
    textButton: {
        fontSize: wp("5%"),
        color: "#fff",
        fontWeight: "bold"
    }
})

export default UpdatePerfil