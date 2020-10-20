import React, { useState, useEffect, FormEvent } from "react";
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
  cod_Item: number;
  Titulo: string;
  Descricao: string;
  Data_Final: Date;
}

function VisualizarCampanha() {
  const id_Necessidade = localStorage.getItem("id_Necessidade");

  const history = useHistory();

  const [items, setItems] = useState<ItemsI[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [reaproveitar, setReaproveitar] = useState("1");
  const [datafinal, setDataFinal] = useState("")

  useEffect(() => {
    api.get("itens").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<Necessidade>(`receptor/necessidade/${id_Necessidade}/visualizar`)
      .then((response) => {
        setDescricao(response.data.Descricao);
        setData(response.data.Data_Final.toString());
        setSelectedItem(response.data.cod_Item.toString());
      });
  }, [id_Necessidade]);

  function handleClickReaproveitar() {
    setReaproveitar("2");
    setTimeout(() => {
    document.getElementById("button")?.focus();
  }, 10)
  }

  async function handleReaproveitar(event: FormEvent) {
    event.preventDefault();

    const Data_Final = datafinal.replace('-', '/');

    const data = {
      Data_Final,
    }

    if(Data_Final === "") {
      toast.warning("Preencha a data de encerramento");
    }else{
      await api.post(`receptor/necessidade/${id_Necessidade}`, data);
      toast.success("Necessidade reaproveitada com sucesso");
      console.log(Data_Final)
      setTimeout(() => {
        history.push("andamento");
      }, 2500)
    }
  }

  return (
    <div id="page-visualizar-campanha">
      <Header />

      <div className="form-container">
        <form id="boxform-id" className="box-form-container" onSubmit={handleReaproveitar}>
          <div className="header">
            <h1>Cadastro da campanha</h1>
            <Link to="andamento" style={{ textDecoration: "none" }}>
              <h3>Voltar para o menu</h3>
            </Link>
          </div>
          <span id="span-necessidade">
            Faça o cadastro da sua campanha de doação
          </span>

          <div className="items-necessidade">
            <label className="label">Selecione a necessidade para doação</label>
            <ul className="items-grid" id="list">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={
                    selectedItem === item.id.toString() ? "selected-item" : ""
                  }
                >
                  <img src={item.image_url} alt={item.Nome} />
                  <span>{item.Nome}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="field">
            <label className="label" htmlFor="Nome">
              Descrição da campanha
            </label>
            <p style={{ color: "black" }}>{descricao}</p>
          </div>
          <div className="field-group-row">
            <div className="field">
              <label className="label" htmlFor="Nome">
                Data de encerramento
              </label>
              <p style={{ color: "black" }}>{data}</p>
            </div>
          </div>

          <div className="button-group" id="button-margin-top">
            <button type="button" className="button-att" onClick={handleClickReaproveitar}>
              Reaproveitar campanha
            </button>
          </div>
          {reaproveitar === "2" ? (
            <div>
              <div className="field" key={selectedItem}>
                <label className="label" htmlFor="Nome">
                  Data de encerramento
                </label>
                <input
                  type="date"
                  name="DataFinal"
                  id="DataFinal"
                  onChange={(e) => setDataFinal(e.target.value)}
                />
              </div>
              <div className="button-group" id="button-margin-top">
                <button type="submit" id="button" className="button-finalizar">
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            ""
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

export default VisualizarCampanha;
