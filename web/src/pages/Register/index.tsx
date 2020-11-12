import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import Header from "../../components/LandingHeader";

import "./styles.css";

function Register() {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    try {
      if (confirmarSenha === senha) {
        api
          .post("/receptor", {
            Email: email,
            Senha: senha,
          })
          .then(() => {
            toast.success("😀 Cadastro realizado com sucesso");
            setTimeout(() => {
              history.push('/login')
            }, 2200);
          })
          .catch((error) => {
            console.log(error);
            toast.warning("😕 Esse email já está cadastrado.");
          });
      } else {
        toast.warning("😨 As senhas não se coincidem.");
      }
    } catch (err) {
      toast.error("😨 Falha ao se conectar.");
    }
  }

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
        <form className="box-form-container" onSubmit={handleCreateUser}>
          <h1>Cadastro</h1>
          <span>Insira seus dados para o cadastro.</span>

          <div className="field-group">
            <div className="field">
              <label htmlFor="Email">Email*</label>
              <input
                type="email"
                name="Email"
                id="Email"
                inputMode="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="exemplo@exemplo.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="Senha">Senha*</label>
              <input
                type="password"
                name="Senha"
                id="Senha"
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
                minLength={8}
                placeholder="A senha deve conter de 8 a 20 caracteres"
                pattern="^.{8,20}$"
                required
                maxLength={20}
              />
            </div>
            <div className="field">
              <label htmlFor="ConfirmarSenha">Confirmar Senha*</label>
              <input
                type="password"
                name="ConfirmarSenha"
                id="ConfirmarSenha"
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                }}
                placeholder="Sua senha deve estar igual a anterior"
                pattern="^.{8,20}$"
                required
                maxLength={20}
                minLength={8}
              />
            </div>
          </div>
          <div className="button-submit">
            <button type="submit">Cadastrar</button>
          </div>
          <div className="spans">
            <span className="span-cadastro">
              {" "}
              Já possui uma conta?{" "}
              <Link to="/login" className="span-link">
                Clique aqui!
              </Link>{" "}
            </span>
          </div>
        </form>
        <ToastContainer
          position={"top-center"}
          autoClose={2000}
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default Register;
