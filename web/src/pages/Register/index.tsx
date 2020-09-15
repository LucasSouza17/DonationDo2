import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/LandingHeader";

import "./styles.css";

function Register() {
  return (
    <div id="page-register">
      <Header>
        <div className="container-buttons">
          <Link to="/" className="simple-link">
            Página inicial
          </Link>
          <Link to="/login" className="button-link">
            Login
          </Link>
        </div>
      </Header>

      <div className="form-container">
        <form className="box-form-container">
          <h1>Cadastro</h1>
          <span>Insira seus dados para o cadastro.</span>
          
          <div className="field-group">
            <div className="field">
              <label htmlFor="Email">Email*</label>
              <input
                type="text"
                name="Email"
                id="Email"
                inputMode="email"
                onChange={() => {}}
                />
            </div>
            <div className="field">
              <label htmlFor="Senha">Senha*</label>
              <input
                type="password"
                name="Senha"
                id="Senha"
                onChange={() => {}}
                />
            </div>
            <div className="field">
              <label htmlFor="Senha">Confirmar Senha*</label>
              <input
                type="password"
                name="Senha"
                id="Senha"
                onChange={() => {}}
                />
            </div>
          </div>
          <div className="button-submit">
            <button type="submit">Cadastrar</button>
          </div>
          <div className="spans">
          <span className="span-cadastro"> Já possui uma conta? <Link to="/login" className="span-link">Clique aqui!</Link> </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;