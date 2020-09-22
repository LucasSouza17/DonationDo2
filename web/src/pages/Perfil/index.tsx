import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import Header from "../../components/LandingHeader";

import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerIcon from "../../assets/images/iconmap.svg";

import "./styles.css";
import api from "../../services/api";

interface UserDataI {
  id_Receptor: string;
  Nome: string;
  Email: string;
  Whatsapp: string;
  Telefone: string;
  DescricaoReceptor: string;
  Tipo: string;
  Cidade: string;
  UF: string;
  Numero: string;
  Rua: string;
  Bairro: string;
  CEP: string;
  Latitude: number;
  Longitude: number;
  Img_Local: string;
}

function Perfil() {
  const id_Receptor = localStorage.getItem("id_Receptor");

  const [userdata, setUserData] = useState<UserDataI[]>([]);

  const icon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 95],
  });

  useEffect(() => {
    api.get(`receptor/${id_Receptor}`).then((response) => {
      setUserData([response.data])
      console.log([response.data]);
    });
  }, [id_Receptor]);

  return (
    <div id="page-perfil">
      <Header />
      <div className="container-home">
        <div id="box-home">
          <div className="box-header">
            <h1>Perfil</h1>
            <Link to="home" style={{textDecoration: "none"}}>
              <h3>Voltar para o menu</h3>
              </Link>
          </div>
            {userdata.map(data => (
              <div className="info-container" key={data.id_Receptor}>
              <div className="img-container">
                <img src={data.Img_Local} alt="" />
              </div>
              <div className="info-container">
                <div className="info-row">
                  <div className="info">
                    <h1>Nome do local</h1>
                    <p>{data.Nome}</p>
                  </div>
                  <div className="info">
                    <h1>Tipo de receptor</h1>
                    <p>{data.Tipo}</p>
                  </div>
                </div>
                <div className="info">
                  <h1>E-mail</h1>
                  <p>{data.Email}</p>
                </div>
                <div className="info-row">
                  <div className="info">
                    <h1>Telefone</h1>
                    <p>{data.Telefone}</p>
                  </div>
                  <div className="info">
                    <h1>WhatsApp</h1>
                    <p>{data.Whatsapp}</p>
                  </div>
                </div>
                <div className="info">
                  <h1>Sua história</h1>
                  <p>
                    {data.DescricaoReceptor}
                  </p>
                </div>
                <div className="info-row">
                  <div className="info">
                    <h1>CEP</h1>
                    <p>{data.CEP}</p>
                  </div>
                  <div className="info">
                    <h1>UF</h1>
                    <p>{data.UF}</p>
                  </div>
                  <div className="info">
                    <h1>Cidade</h1>
                    <p>{data.Cidade}</p>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info">
                    <h1>Rua</h1>
                    <p>{data.Rua}</p>
                  </div>
                  <div className="info">
                    <h1>Bairro</h1>
                    <p>{data.Bairro}</p>
                  </div>
                  <div className="info">
                    <h1>Número</h1>
                    <p>{data.Numero}</p>
                  </div>
                </div>
                <div className="map-container">
                  <Map
                    center={[data.Latitude, data.Longitude]}
                    zoom={16}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker icon={icon} position={[data.Latitude, data.Longitude]} />
                  </Map>
                </div>
                <Link to="atualizarperfil" className="button-perfil">Atualizar perfil</Link>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
