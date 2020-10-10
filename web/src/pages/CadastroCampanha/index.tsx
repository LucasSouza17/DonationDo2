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

function RegistroCampanha() {
  const history = useHistory();

  const id_Receptor = localStorage.getItem("id_Receptor");

  const [nomeItem, setNomeItem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [items, setItems] = useState<ItemsI[]>([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    api.get("itens").then((response) => {
      setItems(response.data);
    });
  }, []);

  function handleSelectItem(id: number) {
    setSelectedItem(id.toString());
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const Descricao = descricao;
    const Data_Final = data;
    const cod_Item = selectedItem;
    const NomeItem = nomeItem;

    const datanecessidade = {
      Descricao,
      Data_Final,
      cod_Item,
    };

    const datanecessidadeoutros = {
      Descricao,
      Data_Final,
      cod_Item,
      NomeItem,
    };

    if (cod_Item !== "12") {
      if (cod_Item === "") {
        toast.warning("Selecione um item");
        document.getElementById("list")?.focus();
      } else if (Descricao === "") {
        toast.warning("Preencha o campo de descrição");
        document.getElementById("Descricao")?.focus();
      } else if (Data_Final === "") {
        toast.warning("Preencha a data de encerramento");
        document.getElementById("DataFinal")?.focus();
      } else {
        await api.post(`receptor/${id_Receptor}/necessidade`, datanecessidade);
        toast.success("Necessidade criada com sucesso");
        setTimeout(() => {
          history.push("andamento");
        }, 2500);
      }
    } else {
      if(nomeItem === "") {
        toast.warning("Preencha o campo do nome da necessidade");
        document.getElementById("Item")?.focus();
      }
      else if (Descricao === "") {
        toast.warning("Preencha o campo de descrição");
        document.getElementById("Descricao")?.focus();
      } else if (Data_Final === "") {
        toast.warning("Preencha a data de encerramento");
        document.getElementById("DataFinal")?.focus();
      } else {
        await api.post(
          `receptor/${id_Receptor}/necessidade/outros`,
          datanecessidadeoutros
        );
        toast.success("Necessidade criada com sucesso");
        setTimeout(() => {
          history.push("andamento");
        }, 2500);
      }
    }
  }

  return (
    <div id="page-registro-campanha">
      <Header />

      <div className="form-container">
        <form
          id="boxform-id"
          className="box-form-container"
          onSubmit={handleSubmit}
        >
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
                  onClick={() => handleSelectItem(item.id)}
                  className={
                    selectedItem.includes(String(item.id))
                      ? "selected-item"
                      : ""
                  }
                >
                  <img src={item.image_url} alt={item.Nome} />
                  <span>{item.Nome}</span>
                </li>
              ))}
            </ul>
          </div>
          {selectedItem === "8" ? (
            <div className="field" key={selectedItem}>
              <label className="label" htmlFor="Nome">
                Nome da necessidade*
              </label>
              <input
                type="text"
                name="Item"
                id="Item"
                inputMode="text"
                onChange={(e) => setNomeItem(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
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
              />
            </div>
          </div>

          <div className="button-submit" id="button-margin-top">
            <button type="submit">Finalizar cadastro</button>
          </div>
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

export default RegistroCampanha;
