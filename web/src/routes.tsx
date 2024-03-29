import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import FinalRegister from './pages/FinalRegister';
import Home from './pages/Home';
import EmAndamento from './pages/EmAndamento';
import Canceladas from './pages/Canceladas';
import Finalizadas from './pages/Finalizadas';
import Perfil from './pages/Perfil';
import AtualizarPerfil from './pages/AtualizarPerfil';
import CadastrarCampanha from './pages/CadastroCampanha';
import AtualizarCampanha from './pages/AtualizarCampanha';
import VisualizarCampanha from './pages/VisualizarCampanha';
import AprovarDoacao from './pages/AprovarDoacoes';
import HistoricoDoacao from './pages/HistoricoDoacao';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/finalregister" component={FinalRegister} />
      <Route path="/home" component={Home} />
      <Route path="/andamento" component={EmAndamento} />
      <Route path="/canceladas" component={Canceladas} />
      <Route path="/finalizadas" component={Finalizadas} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/atualizarperfil" component={AtualizarPerfil} />
      <Route path="/cadastrocampanha" component={CadastrarCampanha} />
      <Route path="/atualizarcampanha" component={AtualizarCampanha} />
      <Route path="/visualizarcampanha" component={VisualizarCampanha} />
      <Route path="/aprovardoacao" component={AprovarDoacao} />
      <Route path="/historicodoacao" component={HistoricoDoacao} />
    </BrowserRouter>
  );
}

export default Routes;