import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api'

import Header from "../../components/LandingHeader";
import BoxFilters from "../../components/BoxFilters";
import BoxNecessidade from "../../components/BoxNecessidade";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

interface NecessidadeI {
  Titulo: string;
  Descricao: string;
  Status: string;
  Data_Inicio: string;
  Data_Final: string;
  id_Necessidade: string;
}

function Finalizadas() {

  const id_Receptor = localStorage.getItem("id_Receptor");

  const [necessidade, setNecessidade] = useState<NecessidadeI[]>([]);

  useEffect(() => {
    async function dataNecessidade() {
      const response = await api.get(`receptor/${id_Receptor}/necessidade/finalizadas`);
      setNecessidade(response.data);
    }
    dataNecessidade();
  }, [id_Receptor])


  return (
    <div id="page-home">
      <Header>
        <div className="button-container">
          <Link to="/home" id="button-user">
            <img src={User} alt="" />
            <p>PERFIL</p>
          </Link>
          <Link to="/home" id="button-logout">
            <img src={LogOut} alt="" />
            <p>SAIR</p>
          </Link>
        </div>
      </Header>
      <div className="container-home">
        <div className="box-home">
          <div className="box-header">
            <h1>Necessidades cadastradas</h1>
            <Link to="/home" className="nova-campanha">
              Cadastrar Campanha
            </Link>
          </div>
          <BoxFilters
            backColorFinalizadas="rgb(219, 10, 211, 21%)"
            lineFinalizadas="#DB0AD3"
          />
          {necessidade.map(data => (
          <BoxNecessidade
            key={data.id_Necessidade}
            titulo={data.Titulo}
            necessidade={data.Descricao}
            dataInicio={data.Data_Inicio}
            dataFinal={data.Data_Final}
            status={data.Status}
            colorStatus="green"
            toLink="/home"
            link="Editar"
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Finalizadas;