import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Header from "../../components/LandingHeader";
import Dropzone from "../../components/Dropzone";
import MarkerIcon from "../../assets/images/iconmap.svg";

import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Map, TileLayer, Marker } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

import "./styles.css";
import api from "../../services/api";


interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

function FinalRegister() {

  const history = useHistory();

  const id_Receptor = localStorage.getItem("id_Receptor");

  const icon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 95],
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedTipo, setSelectedTipo] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    Nome: "",
    Descricao: "",
    Telefone: "",
    Whatsapp: "-",
    Tipo: "",
    Bairro: "",
    Rua: "",
    Numero: "",
    CEP: "-",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  });

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
    if (formData.CEP.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${formData.CEP}/json`)
        .then((response) => {
          console.log(response.data);
          formData.Bairro = response.data.bairro;
          formData.Rua = response.data.logradouro;
          setSelectedCity(response.data.localidade);
          setSelectedUf(response.data.uf);
        });
    }
  }, [formData.CEP, formData.Bairro, formData.Rua, selectedCity, selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat: latidude, lng: longitude } = event.latlng;
    setSelectedPosition([latidude, longitude]);
    console.log([latidude, longitude]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectTipo(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedTipo(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      Nome,
      Descricao,
      Telefone,
      Whatsapp,
      Bairro,
      Rua,
      Numero,
      CEP,
    } = formData;
    const Tipo = selectedTipo;
    const UF = selectedUf;
    const Cidade = selectedCity;
    const [Latitude, Longitude] = selectedPosition;

    const noImageData = {
      Nome,
      DescricaoReceptor: Descricao,
      Telefone,
      Whatsapp,
      Bairro,
      Rua,
      Numero,
      Tipo,
      CEP,
      UF,
      Cidade,
      Latitude,
      Longitude
    }

    const data = new FormData();

    data.append("Nome", Nome);
    data.append("DescricaoReceptor", Descricao);
    data.append("Telefone", Telefone);
    data.append("Whatsapp", Whatsapp);
    data.append("Tipo", Tipo);
    data.append("UF", UF);
    data.append("Cidade", Cidade);
    data.append("Bairro", Bairro);
    data.append("Rua", Rua);
    data.append("Numero", Numero);
    data.append("CEP", CEP);
    data.append("Latitude", String(Latitude));
    data.append("Longitude", String(Longitude));

    if (selectedFile) {
      data.append("Img_Local", selectedFile);
    }

    try {
      if(selectedFile === undefined){
        if(selectedTipo === "0") {
          toast.warning("Tipo não pode ser nulo.");
          document.getElementById("tipo")?.focus();
        }
      else if (UF === "0") {
        toast.warning("UF não pode ser nulo.");
        document.getElementById("uf")?.focus();
      } else if (Cidade === "0") {
        toast.warning("Cidade não pode ser nulo.");
        document.getElementById("cidade")?.focus();
      } else if (Latitude === 0 && Longitude === 0) {
        toast.warning("Marque no mapa sua localização.");
      } else {
        const response = await api.put(
          `receptor/${id_Receptor}`,
          noImageData
        );
        toast.success("Cadastro realizado com sucesso");
        localStorage.removeItem("Nome")
        setTimeout(() => {
          history.push("Home");
          localStorage.setItem("Nome", response.data.Nome);
        }, 2500);
      }
    } else {
      if(selectedTipo === "0") {
        toast.warning("Tipo não pode ser nulo.");
        document.getElementById("tipo")?.focus();
      }
      else if (UF === "0") {
        toast.warning("UF não pode ser nulo.");
        document.getElementById("uf")?.focus();
      } else if (Cidade === "0") {
        toast.warning("Cidade não pode ser nulo.");
        document.getElementById("cidade")?.focus();
      } else if (Latitude === 0 && Longitude === 0) {
        toast.warning("Marque no mapa sua localização.");
      } else {
        const response = await api.put(
          `receptor/ConcluirCadastro/${id_Receptor}`,
          data
        );

        console.log(data);

        toast.success("Cadastro realizado com sucesso");
        localStorage.removeItem("Nome");
        setTimeout(() => {
          history.push("Home");
          localStorage.setItem("Nome", response.data.Nome);
        }, 2500);
      }
    }
    } catch (err) {
      toast.error("Erro ao finalizar cadastro");
    }
  }

  return (
    <div id="page-final-register">
      <Header />

      <div className="form-container">
        <form className="box-form-container" onSubmit={handleSubmit}>
          <h1>Concluir Cadastro</h1>
          <span>Conclua o cadastro para começar as campanhas de doação</span>

          <div className="field">
            <label htmlFor="Nome">Nome do local*</label>
            <input
              type="text"
              name="Nome"
              id="Nome"
              inputMode="text"
              onChange={handleInputChange}
              required
              placeholder={"Exemplo: Ong das oliveiras"}
            />
          </div>
          <div className="field">
            <label htmlFor="Descricao">
              Conte-nos um pouco sobre sua história*
            </label>
            <input
              type="text"
              name="Descricao"
              id="Descricao"
              onChange={handleInputChange}
              required
              placeholder={
                "Exemplo: O DonationDo é uma ideia pensada por 4 jovens que visa..."
              }
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="Telefone">Telefone*</label>
              <input
                type="text"
                name="Telefone"
                id="Telefone"
                inputMode="text"
                onChange={handleInputChange}
                maxLength={12}
                minLength={10}
                placeholder={"Exemplo: DDDNúmero"}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
              <input
                type="text"
                name="Whatsapp"
                id="Whatsapp"
                onChange={handleInputChange}
                maxLength={13}
                minLength={11}
                placeholder={"Exemplo: DDDNúmero"}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo*</label>
            <select
              name="Tipo"
              id="tipo"
              value={selectedTipo}
              onChange={handleSelectTipo}
              required
            >
              <option value="0">Selecione o tipo de receptor</option>
              <option value="Ong">Ong</option>
              <option value="Ponto de coleta">Ponto de coleta</option>
            </select>
          </div>

          <div className="field">
            <label>Insira uma foto do local</label>
            <Dropzone onFileUploaded={setSelectedFile} />
          </div>

          <div className="field">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="CEP"
              id="cep"
              onChange={handleInputChange}
              placeholder={"Exemplo: 15000100"}
            />
          </div>
          <div className="field-group-row">
            <div className="field">
              <label htmlFor="uf">Estado (UF)*</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
                required
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade*</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                required
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="bairro">Bairro*</label>
              <input
                value={formData.Bairro}
                type="text"
                name="Bairro"
                id="bairro"
                onChange={handleInputChange}
                placeholder={"Exemplo: Monte verde"}
                required
              />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="rua">Rua*</label>
              <input
                value={formData.Rua}
                type="text"
                name="Rua"
                id="rua"
                onChange={handleInputChange}
                required
                placeholder={"Exemplo: Rua das palmeiras"}
              />
            </div>
            <div className="field">
              <label htmlFor="numero">Número*</label>
              <input
                type="text"
                name="Numero"
                id="numero"
                onChange={handleInputChange}
                required
                placeholder={"Exemplo: 413"}
              />
            </div>
          </div>

          <div className="container-map">
            <label>
              Marque no mapa a localização do ponto de recepção mais próximo
              possível*
            </label>
            <Map
              center={initialPosition !== [0, 0] ? initialPosition : [-20.8132191, -49.3787799]}
              zoom={initialPosition !== [0, 0] ? 16 : 13}
              style={{ width: "100%", height: "300px", marginTop: "2.5rem" }}
              onClick={handleMapClick}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={icon} position={selectedPosition} />
            </Map>
          </div>
          <div className="button-submit">
            <button type="submit">Concluir cadastro</button>
          </div>
        </form>
        <ToastContainer
          position={"top-center"}
          autoClose={2200}
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default FinalRegister;
