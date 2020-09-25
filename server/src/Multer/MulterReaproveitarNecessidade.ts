import { celebrate, Joi } from 'celebrate';

const VerificacaoReceptorConcluido = celebrate({
  body: Joi.object().keys({
    Data_Final: Joi.date().allow()})
}, 
{abortEarly: false});

export default VerificacaoReceptorConcluido; 