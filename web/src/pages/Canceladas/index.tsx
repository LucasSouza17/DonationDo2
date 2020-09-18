import React from 'react';
import { Link } from "react-router-dom";

import Header from "../../components/LandingHeader";
import BoxFilters from "../../components/BoxFilters";
import BoxNecessidade from "../../components/BoxNecessidade";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

function Canceladas() {
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
            backColorCanceladas="rgb(219, 10, 211, 21%)"
            lineCanceladas="#DB0AD3"
          />
          <BoxNecessidade
            titulo="Semana do agasalho"
            necessidade="Roupas"
            dataInicio="27/08/2020"
            dataFinal="27/10/20"
            status="Canceladas"
            colorStatus="red"
            toLink="/home"
            link="Visualizar"
          />
        </div>
      </div>
    </div>
  );
}

export default Canceladas;