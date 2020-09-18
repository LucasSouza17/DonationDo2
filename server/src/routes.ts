import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import ReceptoresController from './controllers/ReceptoresController';
import ConcluirReceptorController from './controllers/ConcluirReceptorController';
import SessionController from './controllers/SessionController';
import NecessidadesController from './controllers/NecessidadesController';
import ItemController from './controllers/ItemController';
import DoadorController from './controllers/DoadorController';
import VerificacaoReceptor from './Multer/MulterReceptor';
import VerificacaoReceptorConcluido from './Multer/MulterReceptorConcluido';
import VerificacaoNecessidade from './Multer/MulterNecessidade';
import VerificacaoDoador from './Multer/MulterDoador';
import VerificacaoReaproveitarNecessidade from './Multer/MulterReaproveitarNecessidade'
import NecessidadesAndamentoController from './controllers/NecessidadesAndamentoController';
import NecessidadesCanceladaController from './controllers/NecessidadesCanceladasController';
import NecessidadesFinalizadaController from './controllers/NecessidadesFinalizadasController';
import ReaproveitaNecessidadeController from './controllers/ReaproveitaNecessidadeController';
import FinalizarNecesssidadeDataController from './controllers/FinalizarNecesssidadeDataController';

const routes = express.Router();
const uploads = multer(multerConfig);

const receptoresController = new ReceptoresController();
const concluirReceptorController = new ConcluirReceptorController();
const sessionControler = new SessionController();
const necessidadesController = new NecessidadesController();
const necessidadeAndamentoController = new NecessidadesAndamentoController();
const necessidadesCanceladaController = new NecessidadesCanceladaController();
const necessidadesFinalizadaController = new NecessidadesFinalizadaController();
const itemController = new ItemController();
const doadorController = new DoadorController();
const reaproveitaNecessidadeController = new ReaproveitaNecessidadeController();
const finalizarNecesssidadeDataController = new FinalizarNecesssidadeDataController();

//Rota dos Itens
routes.get('/itens', itemController.index);

//Rotas dos Receptores
routes.get('/receptor', receptoresController.index);
routes.post('/receptor', VerificacaoReceptor, receptoresController.create);
routes.put('/receptor/ConcluirCadastro/:id', uploads.single("Img_Local"), VerificacaoReceptorConcluido, concluirReceptorController.update,);
routes.put('/receptor/:id', uploads.single('Img_Local'), receptoresController.update);
routes.get('/receptor/:id', receptoresController.show);

//Rota de Login do Receptor
routes.post('/sessionReceptor', sessionControler.createReceptor);

//Rota de Login do Doador
routes.post('/sessionDoador', sessionControler.createDoador);

//Rotas da Necessidade do Receptor
routes.post('/receptor/:cod_Receptor/necessidade', VerificacaoNecessidade, necessidadesController.create);

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

//Rotas da Necessidade Finalizadas pela Data
routes.put('/receptor/:id/necessidade', finalizarNecesssidadeDataController.update);

//Rotas dos Doadores
routes.post('/doador', VerificacaoDoador, doadorController.create);
routes.get('/doador/necessidade/:cod_Item', doadorController.index);
routes.get('/doador/necessidade/:id/receptor', doadorController.show);
routes.put('/doador/:id/necessidades', doadorController.update);


export default routes;