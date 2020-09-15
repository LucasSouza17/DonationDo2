import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/LandingHeader";

import "./styles.css";

function Login() {
  return (
    <div id="page-login">
      <Header>
        <div className="container-buttons">
          <Link to="/login">
            Página inicial
          </Link>
          <Link to="/register" className="button-link">
            Cadastrar-se
          </Link>
        </div>
      </Header>

      <div className="form-container">
        <form className="box-form-container">
          <h1>Login</h1>
          <span>Insira seus dados.</span>
          
          <div className="field-group">
            <div className="field">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                name="Email"
                id="Email"
                inputMode="email"
                onChange={() => {}}
                />
            </div>
            <div className="field">
              <label htmlFor="Senha">Senha</label>
              <input
                type="password"
                name="Senha"
                id="Senha"
                onChange={() => {}}
                />
            </div>
          </div>
          <div className="button-submit">
          <button type="submit">Entrar</button>
          </div>
          <div className="spans">
          <span className="span-cadastro"> Não possui uma conta? <Link to="/register" className="span-link">Clique aqui!</Link> </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
