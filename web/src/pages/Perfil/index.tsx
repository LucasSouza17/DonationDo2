import React from "react";

import Header from "../../components/LandingHeader";

import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./styles.css";

function Perfil() {
  return (
    <div id="page-perfil">
      <Header />
      <div className="container-home">
        <div id="box-home">
          <div className="box-header">
            <h1>Perfil</h1>
            <h3>Voltar para o menu</h3>
          </div>
          <div className="info-container">
            <div className="img-container">
              <img src="" alt="" />
            </div>
            <div className="info-container">
              <div className="info">
                <h1>Nome do local</h1>
                <p>Anjos da cidade</p>
              </div>
              <div className="info">
                <h1>E-mail</h1>
                <p>anjosofcity@gmail.com</p>
              </div>
              <div className="info-row">
                <div className="info">
                  <h1>Telefone</h1>
                  <p>(17)3233-5070</p>
                </div>
                <div className="info">
                  <h1>WhatsApp</h1>
                  <p>(17)99741-4662</p>
                </div>
              </div>
              <div className="info">
                <h1>Sua história</h1>
                <p>
                  Ela é amiga da minha mulher Pois é pois é Mas vive dando em
                  cima de mim Enfim enfim Ainda por cima é uma tremenda gata....
                </p>
              </div>
              <div className="info-row">
                <div className="info">
                  <h1>CEP</h1>
                  <p>15025-110</p>
                </div>
                <div className="info">
                  <h1>UF</h1>
                  <p>SP</p>
                </div>
                <div className="info">
                  <h1>Cidade</h1>
                  <p>São José Rio Preto</p>
                </div>
              </div>
              <div className="info-row">
                <div className="info">
                  <h1>Rua</h1>
                  <p>Rua Florinacios Peixados</p>
                </div>
                <div className="info">
                  <h1>Bairro</h1>
                  <p>Boa Vista</p>
                </div>
                <div className="info">
                  <h1>Número</h1>
                  <p>285</p>
                </div>
              </div>
              <div className="map-container">
                <Map
                  center={[-20.7995417, -49.4166629]}
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
                </Map>
              </div>
              <button className="button-perfil">
                Atualizar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
