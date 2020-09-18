import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../../components/LandingHeader";
import BoxFilters from "../../components/BoxFilters";
import Warning from "../../assets/images/warning.svg";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

import "./styles.css";

function UserNotAuth() {
  return (
    <div id="page-home">
      <Header></Header>

      <div className="container-home">
        <div className="box-alert-container">
          <div className="box-alert">
            <img src={Warning} alt="WarningIcon" />
            <h1>Atualize seu cadastro</h1>
            <p>
              Precisamos que nos informe algumas coisas sobre o local de
              recepção
            </p>
            <Link to="/finalregister">Finalizar cadastro</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserAuth() {
  const history = useHistory();

  useEffect(() => {
    console.log(localStorage);
    function AuthExpires() {
      setTimeout(() => {
        localStorage.clear();
        alert("Sua sessão expirou, entre novamente.");
        history.push("login");
      }, 3600000);
    }
    return AuthExpires();
  }, [history]);

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <div id="page-home">
      <Header>
        <div className="button-container">
          <Link to="/perfil" id="button-user">
            <img src={User} alt="" />
            <p>PERFIL</p>
          </Link>
          <Link to="/login" id="button-logout" onClick={handleLogout}>
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
          <BoxFilters />
        </div>
      </div>
    </div>
  );
}

function ValidadeUser() {
  const auth = localStorage.getItem("Nome");
 
  if (auth === "null") {
    return <UserNotAuth />;
  } else {
    return <UserAuth />;
  }
}

function Home() {
  return <ValidadeUser />;
}

export default Home;
