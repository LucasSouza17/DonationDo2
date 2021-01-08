import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/LandingHeader";
import Footer from "../../components/Footer";

import boxImg from "../../assets/images/box.png";
import phoneImg from "../../assets/images/phone.png";
import Us from "../../assets/images/us.png";
// import Apk from "../../assets/download/donationdo.apk";

import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      <Header>
        <div className="container-buttons">
          <Link to="/login" >
            Log in
          </Link>
          <Link to="/register" className="button-link">
            Cadastrar-se
          </Link>
        </div>
      </Header>

      <div className="main-container">
        <div className="first-container">
          <div className="text-area">
            <h1>
              MELHORE O MUNDO <br /> TRANSFOME VIDAS <br /> DOE
            </h1>
            <p>
              Facilite sua campanha de doação. Com pequenas atitudes, mudamos o
              mundo.
            </p>
            <div className="button-container">
              <Link to="/register">Cadastrar-se</Link>
            </div>
          </div>
          <img src={boxImg} alt="Caixa de doações" />
        </div>

        <div className="second-container">
          <div className="text-area">
            <h1>CONHEÇA NOSSO APP</h1>
            <p>
              Buscar por fazer o bem pode ser mais simples do que imagina.
              Confira nosso app e busque por campanhas solidarias em um click.
            </p>
            <div className="button-container">
              <a href="/donationdo.apk" download>Baixar app</a>
            </div>
          </div>
          <img src={phoneImg} alt="Caixa de doações" />
        </div>

        <div className="third-container">
          <div className="text-area">
            <h1>QUEM SOMOS?</h1>
            <p>
              O DONATION.DO nasceu de um trabalho escolar que, logo em seus
              primeiros dias, se tornou algo mais. Criado em uma era, cujo o
              cenário é parecido com o de um filme de ficção científica, nossa
              preocupação é inspirar pequenas soluções para os grandes
              problemas, através da empatia e da solidariedade.
            </p>
          </div>
          <img src={Us} alt="Caixa de doações" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
