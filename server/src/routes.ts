import express from 'express';

import multer from 'multer';
import multerReceptorConfig from './config/multerReceptor';
import multerDoadorConfig from './config/multerDoador';

//Controller Receptor
import ReceptoresController from './controllers/Receptor/ReceptoresController';
import ReceptorUpdateImgController from './controllers/Receptor/ReceptorUpdateImgController';
import ConcluirReceptorController from './controllers/Receptor/ConcluirReceptorController';

//Controller Doações do Receptor
import DoacaoReceptorController from './controllers/Doacao/DoacaoReceptorController';
import DoacaoConfirmadaController from './controllers/Doacao/DoacaoConfirmadaController';
import DoacaoRecusadaController from './controllers/Doacao/DoacaoRecusadaController';
import HistoricorDoacoesReceptoController from './controllers/Receptor/HistoricorDoacoesReceptoController';

//Controller Session
import SessionDoadorController from './controllers/Session/Doador/SessionDoadorController';
import SessionReceptorController from './controllers/Session/Receptor/SessionReceptorController';

//Controller Necessidade
import NecessidadesController from './controllers/Necessidade/NecessidadesController';
import NecessidadesAndamentoController from './controllers/Necessidade/NecessidadesAndamentoController';
import NecessidadesCanceladaController from './controllers/Necessidade/NecessidadesCanceladasController';
import NecessidadesFinalizadaController from './controllers/Necessidade/NecessidadesFinalizadasController';
import ReaproveitaNecessidadeController from './controllers/Necessidade/ReaproveitaNecessidadeController';
import FinalizarNecesssidadeDataController from './controllers/Necessidade/FinalizarNecesssidadeDataController';
import NecessidadeOutrosController from './controllers/Necessidade/NecessidadeOutrosController';

//Controller Item
import ItemController from './controllers/Item/ItemController';

//Controller Doador
import DoadorController from './controllers/Doador/DoadorController';
import HistoricoController from './controllers/Doador/HistoricoController';
import RankingController from './controllers/Doador/RankingController';
import DoacaoDoadorController from './controllers/Doacao/DoacaoDoadorController';
import CodigoConviteController from './controllers/Doador/CodigoConviteController';
import PontuacaoController from './controllers/Doador/PontuacaoController';
import HistoricoDoacoesController from './controllers/Doador/HistoricoDoacoesController';
import NecessidadeDoadorController from './controllers/Doador/NecessidadeDoadorController';

//Controller Medalha
import MedalhaController from './controllers/Medalha/MedalhaController';

//Verificações Multer
import VerificacaoReceptor from './Multer/MulterReceptor';
import VerificacaoReceptorConcluido from './Multer/MulterReceptorConcluido';
import VerificacaoNecessidade from './Multer/MulterNecessidade';
import VerificacaoDoador from './Multer/MulterDoador';
import VerificacaoReaproveitarNecessidade from './Multer/MulterReaproveitarNecessidade'

const routes = express.Router();
const uploadsReceptor = multer(multerReceptorConfig);
const uploadsDoador = multer(multerDoadorConfig);

const receptoresController = new ReceptoresController();
const receptorUpdateImgController = new ReceptorUpdateImgController();
const concluirReceptorController = new ConcluirReceptorController();

const sessionDoadorControler = new SessionDoadorController();
const sessionReceptorControler = new SessionReceptorController();

const necessidadesController = new NecessidadesController();
const necessidadeAndamentoController = new NecessidadesAndamentoController();
const necessidadesCanceladaController = new NecessidadesCanceladaController();
const necessidadesFinalizadaController = new NecessidadesFinalizadaController();
const reaproveitaNecessidadeController = new ReaproveitaNecessidadeController();
const finalizarNecesssidadeDataController = new FinalizarNecesssidadeDataController();
const necessidadeOutrosController = new NecessidadeOutrosController();

const doacaoReceptorController = new DoacaoReceptorController();
const doacaoConfirmadaController = new DoacaoConfirmadaController();
const doacaoRecusadaController = new DoacaoRecusadaController();
const historicorDoacoesReceptoController = new HistoricorDoacoesReceptoController();

const itemController = new ItemController();

const doadorController = new DoadorController();
const historicoController = new HistoricoController();
const rankingController = new RankingController();
const doacaoDoadorController = new DoacaoDoadorController();
const codigoConviteController = new CodigoConviteController();
const pontuacaoController = new PontuacaoController();
const historicoDoacoesController = new HistoricoDoacoesController();
const necessidadeDoadorController = new NecessidadeDoadorController();

const medalhaController = new MedalhaController();

//Rota dos Itens
routes.get('/itens', itemController.index);

//Rotas dos Receptores
routes.get('/receptor', receptoresController.index);
routes.post('/receptor', VerificacaoReceptor, receptoresController.create);
routes.put('/receptor/ConcluirCadastro/:id', uploadsReceptor.single('Img_Local'), VerificacaoReceptorConcluido, concluirReceptorController.update);
routes.put('/receptor/:id', receptoresController.update);
routes.put('/receptor/img/:id', uploadsReceptor.single('Img_Local'), receptorUpdateImgController.update);
routes.get('/receptor/:id', receptoresController.show);

//Rota de recebimento de Doações
routes.get('/receptor/:id/doacoes', doacaoReceptorController.index);

//Confirmar Doação
routes.put('/receptor/doacao/:id/confirmar', doacaoConfirmadaController.update);

//Recusar Doação
routes.put('/receptor/doacao/:id/recusar', doacaoRecusadaController.update);

//Historico de Doações
routes.get('/receptor/:id/historico/doacoes', historicorDoacoesReceptoController.index);

//Rotas dos Doadores
routes.post('/doador', VerificacaoDoador, doadorController.create);
routes.get('/doador/:id', doadorController.show);
routes.put('/doador/:id', uploadsDoador.single('Avatar'), doadorController.update);

//Rota de acesso as necessidade com os filtros
routes.get('/filternecessidades/', necessidadeDoadorController.index);
//Rota de acesso ao Receptor de acordo com a necessidade
routes.get('/doador/necessidade/:id/receptor', necessidadeDoadorController.show);

//Rota historico de ongs acessadas
routes.get('/doador/:id_doador/historico', historicoController.index);
//Rota historico das necessidades da ong acessada
routes.get('/doador/historico/:cod_Receptor/necessidades', historicoController.show);

//Rota de Ranking
routes.get('/doador/ranking', rankingController.index);

//Rota de Doação do Doador
routes.post('/doador/necessidade/:id/doar', doacaoDoadorController.create);

//Rota de Historico de doações
routes.get('/doador/:id/doacoes/', historicoDoacoesController.index);

//Rota de recebimento do codigo do Doador
routes.put('/doador/:id/CodigoConvite/', codigoConviteController.update);

//Rota de Pontuação do Doador
routes.get('/doador/pontuacao/', pontuacaoController.index);

//Rota de criação de medalhas
routes.post('/medalha', medalhaController.create);

//Rota de Login do Receptor
routes.post('/sessionReceptor', sessionReceptorControler.create);

//Rota de Login do Doador
routes.post('/sessionDoador', sessionDoadorControler.create);

//Rotas da Necessidade do Receptor
routes.post('/receptor/:cod_Receptor/necessidade', VerificacaoNecessidade, necessidadesController.create);
//Necessidade do Item outros
routes.post('/receptor/:cod_Receptor/necessidade/outros', VerificacaoNecessidade, necessidadeOutrosController.create);

//Rotas da Necessidade Em andamento
routes.get('/receptor/:id/necessidade/EmAndamento', necessidadeAndamentoController.index);
routes.put('/receptor/necessidade/EmAndamento/:id', necessidadeAndamentoController.update);

//Rotas da Necessidade Canceladas
routes.get('/receptor/:id/necessidade/Canceladas', necessidadesCanceladaController.index);
routes.put('/receptor/necessidade/:id/Cancelar', necessidadesCanceladaController.update);

//Rotas da Necessidade Finalizadas
routes.get('/receptor/:id/necessidade/Finalizadas', necessidadesFinalizadaController.index);
routes.put('/receptor/necessidade/:id/Finalizar', necessidadesFinalizadaController.update);

//Rotas para Reaproveitar Necessidade
routes.post('/receptor/necessidade/:id', VerificacaoReaproveitarNecessidade, reaproveitaNecessidadeController.create);

//Rota necessidade por id
routes.get('/receptor/necessidade/:id', necessidadesController.index);
routes.get('/receptor/necessidade/:id/visualizar', necessidadesController.show);

//Rotas da Necessidade Finalizadas pela Data
routes.put('/receptor/:id/necessidade', finalizarNecesssidadeDataController.update);


export default routes;