import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Header from "../../components/LandingHeader";
import BoxFilters from "../../components/BoxFilters";
import BoxNecessidade from "../../components/BoxNecessidade";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

interface NecessidadeI {
  Titulo: string;
  Descricao: string;
  Status: string;
  Data_Inicio: string;
  Data_Final: string;
  id_Necessidade: number;
}

function EmAndamento() {
  const id_Receptor = localStorage.getItem("id_Receptor");

  let idnecessidade = "";
  const [necessidade, setNecessidade] = useState<NecessidadeI[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function dataNecessidade() {
      const response = await api.get(
        `receptor/${id_Receptor}/necessidade/EmAndamento?page=${currentPage}`
      );
      setTotal(response.headers["x-total-count"]);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }
      
      setPages(arrayPages);
      setNecessidade(response.data);
    }

    dataNecessidade();
  }, [currentPage, limit, total, id_Receptor]);

  function handleClickEditar(id: number) {
    idnecessidade = (id.toString());
    localStorage.setItem("id_Necessidade", idnecessidade);
  }

  return (
    <div id="page-home">
      <Header>
        <div className="button-container">
          <Link to="/perfil" id="button-user">
            <img src={User} alt="" />
            <p>PERFIL</p>
          </Link>
          <Link to="/login" id="button-logout">
            <img src={LogOut} alt="" />
            <p>SAIR</p>
          </Link>
        </div>
      </Header>
      <div className="container-home">
        <div className="box-home">
          <div className="box-header">
            <h1>Necessidades cadastradas</h1>
            <Link to="/cadastrocampanha" className="nova-campanha">
              Cadastrar Campanha
            </Link>
            <Link to="aprovardoacao" className="aceitar-doacao">
                Aprovar doações
              </Link>
          </div>
          <BoxFilters
            backColorAndamento="rgb(219, 10, 211, 21%)"
            lineAndamento="#DB0AD3"
          />
          {necessidade.map((data) => (
            <BoxNecessidade
              key={data.id_Necessidade}
              titulo={data.Titulo}
              necessidade={data.Descricao}
              dataInicio={data.Data_Inicio}
              dataFinal={data.Data_Final}
              status={data.Status}
              colorStatus="orange"
              toLink="atualizarcampanha"
              link="Editar"
              onClick={() => handleClickEditar(data.id_Necessidade)}
            />
          ))}
          <div className="pagination">
            {pages.map((page) => (
              <button className={currentPage === page ? "selected": "button-pagination"} key={page} onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmAndamento;
