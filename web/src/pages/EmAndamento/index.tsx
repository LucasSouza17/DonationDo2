import React from 'react';
import { Link } from "react-router-dom";

import Header from "../../components/LandingHeader";
import BoxFilters from "../../components/BoxFilters";
import BoxNecessidade from "../../components/BoxNecessidade";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

function EmAndamento() {
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
            backColorAndamento="rgb(219, 10, 211, 21%)"
            lineAndamento="#DB0AD3"
          />
          <BoxNecessidade
            titulo="Semana do agasalho"
            necessidade="Roupas"
            dataInicio="27/08/2020"
            dataFinal="27/10/20"
            status="Em andamento"
            colorStatus="orange"
            toLink="/home"
            link="Editar"
          />
        </div>
      </div>
    </div>
  );
}


export default EmAndamento;