import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import api from "../../services/api";

import Header from "../../components/LandingHeader";
import LogOut from "../../assets/images/logout.svg";
import User from "../../assets/images/user.svg";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './styles.css'

interface DoacaoI {
    id_Doacao: number;
    Status: string;
    Data: string;
    Nomedodoador: string;
    Titulo: string;
}

function AprovarDoacao() {

    const [doacao, setDoacao] = useState<DoacaoI[]>([]);

    useEffect(() => {
        const id = localStorage.getItem("id_Receptor")

        api.get(`receptor/${id}/doacoes`).then(response => {
            setDoacao(response.data);
        })

    }, [doacao])

    async function Aprovar(id_Doacao: number) {
        try {
        api.put(`receptor/doacao/${id_Doacao}/confirmar`)
        toast.success("Doação aprovada com sucesso");
        }catch(err) {
            console.log("erro")
        }
    }

    async function Recusar(id_Doacao: number) {
        try {
        api.put(`receptor/doacao/${id_Doacao}/recusar`)
        toast.success("Doação recusada com sucesso");
        }catch(err) {
            console.log("erro")
        }
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
                        <h1>Aprovar doações</h1>
                        <Link to="aprovardoacao" className="aceitar-doacao">
                            Histórico
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

                            <div id="container-data-link">
                                <div className="aprovar">
                                    <Link to="aprovardoacao" onClick={() => Aprovar(doacao.id_Doacao)} >Confirmar</Link>
                                </div>
                                <div className="recusar">
                                    <Link to="aprovardoacao" onClick={() => Recusar(doacao.id_Doacao)}>Recusar</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
          position={"top-center"}
          autoClose={1600}
          transition={Bounce}
        />
        </div>
    )
}

export default AprovarDoacao;