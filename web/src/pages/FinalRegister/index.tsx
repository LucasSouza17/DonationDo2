import React, { useState, useEffect } from "react";

import Header from "../../components/LandingHeader";
import Dropzone from "../../components/Dropzone";
import MarkerIcon from "../../assets/images/iconmap.svg"

import { Map, TileLayer, Marker } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

import "./styles.css";

function FinalRegister() {

  const icon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 95],
  });

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  });

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat: latidude, lng: longitude } = event.latlng;
    setSelectedPosition([latidude, longitude]);
    console.log([latidude, longitude]);
  }

  return (
    <div id="page-final-register">
      <Header />

      <div className="form-container">
        <form className="box-form-container">
          <h1>Concluir Cadastro</h1>
          <span>Conclua o cadastro para começar as campanhas de doação</span>

          <div className="field">
            <label htmlFor="Nome">Nome do local*</label>
            <input
              type="text"
              name="Nome"
              id="Nome"
              inputMode="text"
              onChange={() => {}}
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
              onChange={() => {}}
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
                onChange={() => {}}
              />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
              <input
                type="text"
                name="Whatsapp"
                id="Whatsapp"
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="field">
            <label>Insira uma foto do local</label>
            <Dropzone onFileUploaded={() => {}} />
          </div>

          <div className="field">
            <label htmlFor="cep">CEP</label>
            <input type="text" name="CEP" id="cep" />
          </div>
          <div className="field-group-row">
            <div className="field">
              <label htmlFor="uf">Estado (UF)*</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade*</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="bairro">Bairro*</label>
              <input type="text" name="Bairro" id="bairro" />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="rua">Rua*</label>
              <input type="text" name="Rua" id="rua" />
            </div>
            <div className="field">
              <label htmlFor="numero">Número*</label>
              <input type="text" name="Numero" id="numero" />
            </div>
          </div>

          <div className="container-map">
            <label>Marque no mapa a localização do ponto de recepção mais próximo possível*</label>
            <Map
              center={initialPosition}
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
          <button>Atualizar dados</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FinalRegister;
