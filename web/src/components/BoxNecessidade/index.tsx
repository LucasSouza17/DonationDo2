import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface ListaNecessidadeProps {
  titulo: string;
  necessidade: string;
  dataInicio: string;
  dataFinal: string;
  status: string;
  colorStatus: string;
  toLink: string;
  link: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
}

const ListNecessidade: React.FC<ListaNecessidadeProps> = ({onClick, titulo, necessidade, dataInicio, dataFinal, status, colorStatus, link, toLink}) => {

  return (
        <div className="container-lista">
          <div className="container-data">
            <p>Título da campanha</p>
            <h2>{titulo}</h2>
          </div>

          <div className="container-data">
            <p>Descrição</p>
            <h2>{necessidade}</h2>
          </div>

          <div className="container-data">
            <p>Data Início</p>
            <h2>{dataInicio}</h2>
          </div>

          <div className="container-data">
            <p>Data Final</p>
            <h2>{dataFinal}</h2>
          </div>

          <div className="container-data">
            <p>Status</p>
            <h2 style={{color: colorStatus }}>{status}</h2>
          </div>

          <div className="container-data-link">
            <Link onClick={onClick} to={toLink}>{link}</Link>
          </div>
        </div>
  );
};

export default ListNecessidade;
