import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'

import Header from "../../components/LandingHeader";
import Dropzone from "../../components/Dropzone";
import MarkerIcon from "../../assets/images/iconmap.svg";

import { Map, TileLayer, Marker } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import "./styles.css";
import api from "../../services/api";

interface ReceptorI {
  Nome: string;
  Whatsapp: string;
  Telefone: string;
  DescricaoReceptor: string;
  Numero: string;
  Rua: string;
  Bairro: string;
  CEP: string;
  Longitude: number;
  Latitude: number;
  UF: string;
  Cidade: string;
  Img_Local: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

function AtualizarPerfil() {

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
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");

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
    async function getReceptor() {
      await api.get<ReceptorI>(`receptor/${id_Receptor}`).then((response) => {
        setNome(response.data.Nome);
        setDescricao(response.data.DescricaoReceptor);
        setTelefone(response.data.Telefone);
        setWhatsapp(response.data.Whatsapp);
        setBairro(response.data.Bairro);
        setRua(response.data.Rua);
        setNumero(response.data.Numero);
        setCep(response.data.CEP);
        setSelectedPosition([response.data.Latitude, response.data.Longitude]);
        setSelectedUf(response.data.UF);
        setSelectedCity(response.data.Cidade);
      });
    }

    getReceptor();
  }, [id_Receptor]);

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const Nome = nome;
    const DescricaoReceptor = descricao;
    const Telefone = telefone;
    const Whatsapp = whatsapp;
    const Bairro = bairro;
    const Rua = rua;
    const Numero = numero;
    const CEP = cep;
    const UF = selectedUf;
    const Cidade = selectedCity;
    const [Latitude, Longitude] = selectedPosition;

    const noImageData = {
      Nome,
      DescricaoReceptor,
      Telefone,
      Whatsapp,
      Bairro,
      Rua,
      Numero,
      CEP,
      UF,
      Cidade,
      Latitude,
      Longitude
    }

    const data = new FormData();

    data.append("Nome", Nome);
    data.append("DescricaoReceptor", DescricaoReceptor);
    data.append("Telefone", Telefone);
    data.append("Whatsapp", Whatsapp);
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

    console.log(selectedFile);

    try {
      if (selectedFile === undefined) {
        if (UF === "0") {
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
          toast.success("Perfil atualizado com sucesso");
          setTimeout(() => {
            history.push("perfil");
            localStorage.setItem("Nome", response.data.Nome);
          }, 2500);
        }
      } else {
        if (UF === "0") {
          toast.warning("UF não pode ser nulo.");
          document.getElementById("uf")?.focus();
        } else if (Cidade === "0") {
          toast.warning("Cidade não pode ser nulo.");
          document.getElementById("cidade")?.focus();
        } else if (Latitude === 0 && Longitude === 0) {
          toast.warning("Marque no mapa sua localização.");
        } else {
          const response = await api.put(
            `receptor/img/${id_Receptor}`,
            data
          );

          console.log(data);

          toast.success("Perfil atualizado com sucesso");
          setTimeout(() => {
            history.push("perfil");
            localStorage.setItem("Nome", response.data.Nome);
          }, 2500);
        }
      }
    } catch (err) {
      toast.error("Erro ao finalizar cadastro");
    }
  }

  
  return (
    <div id="page-att-perfil">
      <Header />

      <div className="form-container">
        <form className="box-form-container" onSubmit={handleSubmit}>
          <h1>Atualizar Perfil</h1>
          <span>
            Atualize seu perfil para que as informações sejam mais atuais
            possíveis
            </span>

          <div className="field">
            <label htmlFor="Nome">Nome do local*</label>
            <input
              type="text"
              name="Nome"
              id="Nome"
              inputMode="text"
              onChange={(e) => setNome(e.target.value)}
              defaultValue={nome}
              required
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
              defaultValue={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
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
                onChange={(e) => setTelefone(e.target.value)}
                defaultValue={telefone}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
              <input
                type="text"
                name="Whatsapp"
                id="Whatsapp"
                onChange={(e) => setWhatsapp(e.target.value)}
                defaultValue={whatsapp}
              />
            </div>
          </div>
          <div className="field">
            <label>Insira uma foto do local</label>
            <Dropzone onFileUploaded={setSelectedFile} />
          </div>

          <div className="field">
            <label htmlFor="cep">CEP</label>
            <input type="text" name="CEP" id="cep" defaultValue={cep} onChange={(e) => setCep(e.target.value)} />
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
                type="text"
                name="Bairro"
                id="bairro"
                defaultValue={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="rua">Rua*</label>
              <input
                type="text"
                name="Rua"
                id="rua"
                defaultValue={rua}
                onChange={(e) => setRua(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="numero">Número*</label>
              <input
                type="text"
                name="Numero"
                id="numero"
                defaultValue={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="container-map">
            <label>
              Marque no mapa a localização do ponto de recepção mais próximo
              possível*
              </label>
            <Map
              center={selectedPosition}
              zoom={16}
              style={{ width: "100%", height: "300px", marginTop: "2.5rem" }}
              onClick={handleMapClick}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={icon} position={selectedPosition} />
            </Map>
          </div>
          <div className="button-submit">
            <button type="submit">Atualizar perfil</button>
          </div>
        </form>
        <ToastContainer
          position={"top-center"}
          autoClose={2500}
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default AtualizarPerfil;
