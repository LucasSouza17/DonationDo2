import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import api from "../../services/api";

import Header from "../../components/LandingHeader";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";

import './styles.css'

interface DoacaoI {
    id_Doacao: number;
    Status: string;
    Data: string;
    Nomedodoador: string;
    Titulo: string;
}

function HistoricoDoacao() {

    const [doacao, setDoacao] = useState<DoacaoI[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [pages, setPages] = useState<number[]>([]);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        async function dataNecessidade() {
            const id_Receptor = localStorage.getItem("id_Receptor");
            const response = await api.get(
                `receptor/${id_Receptor}/historico/doacoes?page=${currentPage}`
            );
            setTotal(response.headers["x-total-count"]);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            }

            setPages(arrayPages);
            setDoacao(response.data);
        }

        dataNecessidade();
    }, [currentPage, limit, total]);

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
                        <h1>Histórico de doações</h1>
                        <Link to="aprovardoacao" className="aceitar-doacao">
                            Voltar
                        </Link>
                    </div>
                    {doacao.map((doacao) => (
                        <div className="container-lista" key={doacao.id_Doacao}>
                            <div className="container-data">
                                <p>Nome do doador</p>
                                <h2>{doacao.Nomedodoador}</h2>
                            </div>

                            <div className="container-data">
                                <p>Item necessidade</p>
                                <h2>{doacao.Titulo.replace("Precisamos de", "")}</h2>
                            </div>

                            <div className="container-data">
                                <p>Data requerimento</p>
                                <h2>{doacao.Data}</h2>
                            </div>

                            <div className="container-data">
                                <p>Status</p>
                                <h2 style={doacao.Status !== "Confirmada" ? {color: "#FF0000"} : {color: "#15C211"}}>{doacao.Status}</h2>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        {pages.map((page) => (
                            <button className={currentPage === page ? "selected" : "button-pagination"} key={page} onClick={() => setCurrentPage(page)}>
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoricoDoacao;