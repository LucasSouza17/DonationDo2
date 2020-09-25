import React, { useState, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import Header from "../../components/LandingHeader";

import "./styles.css";

interface StorageI {
  id_Receptor: string;
  Nome: string;
}

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, [])

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const data = {
      Email: email, 
      Senha: senha
    }
  
   try {
   const response = await api
      .post<StorageI>("/sessionReceptor", data);
        toast.success("😀 Login realizado com sucesso!");
        localStorage.setItem("id_Receptor", response.data.id_Receptor)
        localStorage.setItem("Nome", response.data.Nome)
        console.log(localStorage)
        setTimeout(() => {
          history.push("/home");
        }, 2200);
      }catch(err) {
        toast.error("😕 Falha ao entrar no sistema.")
      }
  }

  return (
    <div id="page-login">
      <Header>
        <div className="container-buttons">
          <Link to="/">Página inicial</Link>
          <Link to="/register" className="button-link">
            Cadastrar-se
          </Link>
        </div>
      </Header>

      <div className="form-container">
        <form className="box-form-container" onSubmit={handleLogin}>
          <h1>Login</h1>
          <span>Insira seus dados.</span>

          <div className="field-group">
            <div className="field">
              <label htmlFor="Email">Email</label>
              <input
                type="Email"
                name="Email"
                id="Email"
                inputMode="email"
                onChange={(e) => {setEmail(e.target.value)}}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="Senha">Senha</label>
              <input
                type="password"
                name="Senha"
                id="Senha"
                minLength={8}
                onChange={(e) => {setSenha(e.target.value)}}
                pattern="^.{8,30}$"
                required
              />
            </div>
          </div>
          <div className="button-submit">
            <button type="submit">Entrar</button>
          </div>
          <div className="spans">
            <span className="span-cadastro">
              {" "}
              Não possui uma conta?{" "}
              <Link to="/register" className="span-link">
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

export default Login;
