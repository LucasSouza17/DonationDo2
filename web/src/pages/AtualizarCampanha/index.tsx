import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import Header from "../../components/LandingHeader";
import api from "../../services/api";

import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

interface ItemsI {
  id: number;
  Nome: string;
  image_url: string;
}

interface Necessidade {
  cod_Item: number,
  Titulo: string,
  Descricao: string;
  Data_Final: string;
}

function AtualizarCampanha() {
  const history = useHistory();

  const id_Necessidade = localStorage.getItem("id_Necessidade");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [validate, setValidate] = useState("");

  useEffect(() => {
    api.get<Necessidade>(`receptor/necessidade/${id_Necessidade}`).then((response) => {
      setDescricao(response.data.Descricao);
      setData(response.data.Data_Final)
    });
  }, [id_Necessidade]);

  function handleAtualizar() {
    setValidate("atualizar");
    setTimeout(() => {
      document.getElementById('button')?.focus();
    }, 10)
  }

  function handleFinalizar() {
    setValidate("finalizar");
    setTimeout(() => {
      document.getElementById('button')?.focus();
    }, 10)
  }

  function handleCancelar() {
    setValidate("cancelar")
    setTimeout(() => {
      document.getElementById('button')?.focus();
    }, 10)
  }

  async function handleConcluir() {
    if (validate === "atualizar") {

      const Descricao = descricao;
      const Data_Final = data;

      const datanecessidade = {
        Descricao,
        Data_Final,
      };

      if (Descricao === "") {
        toast.warning("Preencha o campo de descrição");
        document.getElementById("Descricao")?.focus();
      } else if (Data_Final === "") {
        toast.warning("Preencha a data de encerramento");
        document.getElementById("DataFinal")?.focus();
      } else {
        await api.put(
          `receptor/necessidade/EmAndamento/${id_Necessidade}`,
          datanecessidade
        );
        console.log(datanecessidade)
        toast.success("Necessidade atualizada com sucesso");
        setTimeout(() => {
          history.push("andamento");
        }, 2500);
      }
    } else if (validate === "finalizar") {
      api.put(`receptor/necessidade/${id_Necessidade}/Finalizar`);
      toast.success("Necessidade finalizada com sucesso.")
      setTimeout(() => {
        history.push('finalizadas')
        localStorage.removeItem("id_Necessidade")
      }, 2500)
    } else {
      api.put(`receptor/necessidade/${id_Necessidade}/Cancelar`);
      toast.success("Necessidade cancelada com sucesso.")
      setTimeout(() => {
        history.push('canceladas')
        localStorage.removeItem("id_Necessidade")
      }, 2500)
    }
  }

  return (
    <div id="page-atualizar-campanha">
      <Header />
      <div className="form-container">
        <form
          id="boxform-id"
          className="box-form-container"
        >
          <div className="header">
            <h1>Atualizar campanha</h1>
            <Link to="andamento" style={{ textDecoration: "none" }}>
              <h3>Voltar para o menu</h3>
            </Link>
          </div>
          <span id="span-necessidade">
            Faça a atualização da sua campanha de doação
            </span>
          <div className="field">
            <label className="label" htmlFor="Nome">
              Descrição da campanha*
              </label>
            <input
              type="text"
              name="Descricao"
              id="Descricao"
              inputMode="text"
              onChange={(e) => setDescricao(e.target.value)}
              defaultValue={descricao}
            />
          </div>
          <div className="field-group-row">
            <div className="field">
              <label className="label" htmlFor="Nome">
                Data de encerramento
                </label>
              <input
                type="date"
                name="DataFinal"
                id="DataFinal"
                onChange={(e) => setData(e.target.value)}
                defaultValue={data}
              />
            </div>
          </div>
          <div className="button-group">
            <div id="button-margin-top">
              <button className="button-att" type="button" onClick={handleAtualizar}>
                Atualizar campanha
                </button>
            </div>
            <div id="button-margin-top">
              <button className="button-finalizar" onClick={handleFinalizar} type="button">
                Finalizar campanha
                </button>
            </div>
            <div id="button-margin-top">
              <button className="button-cancelar" onClick={handleCancelar} type="button">
                Cancelar campanha
                </button>
            </div>
          </div>
          {validate !== "" ? (
            <div className="button-validate">
              <label style={{ color: "#000" }}>Você tem certeza que deseja <label style={{ color: "#F90CC5", fontWeight: "bold" }}>{validate}</label> essa campanha?</label>
              <div id="button-margin-top">
                <button id="button" className="button-concluir" type="button" onClick={handleConcluir}>
                  Sim
              </button>
              </div>
            </div>
          ) : (
              <></>
            )}
        </form>
        <ToastContainer
          position={"top-center"}
          autoClose={2500}
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default AtualizarCampanha;
