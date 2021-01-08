import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "@expo/vector-icons/build/Feather";
import { StackActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Picker } from '@react-native-community/picker'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Toast from 'react-native-toast-message';


interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface AvatarI {
  uri: string | any;
  type?: "image" | "video" | undefined;
}

function PerfilUpdate() {

  const navigation = useNavigation();

  const [avatar, setAvatar] = useState<AvatarI>({
    uri: "",
    type: "image",
  });

  const [userUF, setUserUF] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userImage, setUserImage] = useState("franguinho");
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
  }, [selectedUf, selectedCity]);

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

  useEffect(() => {
    async function getDataUser() {
      const id = await AsyncStorage.getItem("isLoggedId");
      api.get(`doador/${id}`).then(response => {
        setUserImage(response.data.avatar_url);
        setUserCity(response.data.Cidade);
        setUserUF(response.data.UF);
      })
    }
    getDataUser();
  }, [userUF, userCity, userImage])

  async function imagePickerCall() {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 5],
      quality: 0.5
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function salvarDados() {
    const id = await AsyncStorage.getItem("isLoggedId");
    const UF = selectedUf;
    const Cidade = selectedCity;
    const {
      uri,
      type
    } = avatar;
    
    const dataSelected = {
      UF,
      Cidade
    }
    const nome = uri.split('/').pop();
    const data = new FormData();

    if (selectedCity === "0" && selectedUf === "0" && uri === "") {
      Toast.show({
        type: 'info',
        text1: 'Vai alterar o que?',
        text2: 'Antes de alterar seu perfil você precisa mudar algo, experimento a foto.',
        visibilityTime: 3000,
        topOffset: 30
      })
    } else if (selectedUf !== "0" && selectedCity === "0" && uri === "") {
      Toast.show({
        type: 'error',
        text1: 'Faltou a cidade',
        text2: 'Preencha uma cidade válida.',
        visibilityTime: 3000,
        topOffset: 30
      })
    } else if (selectedUf !== "0" && selectedCity !== "0" && uri === "") {
      api.put(`doador/noimage/${id}`, dataSelected);
      Toast.show({
        type: 'success',
        text1: 'Dados Salvos',
        text2: 'Seus dados foram salvos com sucesso',
        visibilityTime: 3000,
        topOffset: 30
      })
      setTimeout(() => {
        navigation.goBack()
      }, 3000)
    } else if (selectedCity === "0" && selectedUf === "0" && uri !== "") {
      data.append("Cidade", userCity);
      data.append("UF", userUF);
      data.append("Avatar", {
        uri: uri,
        name: nome,
        type: `${type}/*`,
      } as any);

      await api.put(`doador/${id}`, data)
      Toast.show({
        type: 'success',
        text1: 'Dados Atualizados',
        text2: 'Agora que seus dados estão atualizados, bora doar!?',
        visibilityTime: 3000,
        topOffset: 30
      })
      setTimeout(() => {
        navigation.dispatch(StackActions.push("Perfil"))
      }, 3000)
    } else if (selectedUf !== "0" && selectedCity === "0" && uri !== "") {
      Toast.show({
        type: 'error',
        text1: 'Faltou a cidade',
        text2: 'Preencha uma cidade válida.',
        visibilityTime: 3000,
        topOffset: 30
      })
    } else {
      data.append("Cidade", Cidade);
      data.append("UF", UF);
      data.append("Avatar", {
        uri: uri,
        name: nome,
        type: `${type}/*`,
      } as any);

      await api.put(`doador/${id}`, data)
      Toast.show({
        type: 'success',
        text1: 'Dados Atualizados',
        text2: 'Agora que seus dados estão atualizados, bora doar!?',
        visibilityTime: 3000,
        topOffset: 30
      })
      setTimeout(() => {
        navigation.dispatch(StackActions.push("Perfil"))
      }, 3000)
    }
  }

  function handleNavigateGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Toast ref={(ref: any) => Toast.setRef(ref)} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateGoBack}>
          <Icon name="arrow-left" color="#fff" size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Atualizar Dados</Text>

        <View style={styles.formContainer}>
          <Text style={styles.description}>Trocar a imagem de perfil</Text>
          <TouchableOpacity onPress={imagePickerCall}>
            <Image
              source={{
                uri: avatar.uri
                  ? avatar.uri
                  : userImage
              }}
              style={styles.avatar}
            />
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
                <Picker.Item label="Estado" value={userUF} color="#D6CCCA" />
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
                <Picker.Item label="Cidade" value={userCity} color="#D6CCCA" />
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
          <Text style={{color: "red", fontWeight: "100", paddingHorizontal: wp("12%"), marginTop: wp("2%"), fontSize: wp("2.6%")}}>Aviso: Seu estado e sua cidade já estão selecionados, caso queira alterar só a imagem, escolha uma e depois toque em salvar dados.</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <RectButton style={styles.buttonSubmit} onPress={salvarDados}>
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
    color: "#fff"
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

export default PerfilUpdate;