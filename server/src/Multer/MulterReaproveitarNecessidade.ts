import { celebrate, Joi } from 'celebrate';

const VerificacaoReceptorConcluido = celebrate({
  body: Joi.object().keys({
    Data_Final: Joi.date().required()})
}, 
{abortEarly: false});

export default VerificacaoReceptorConcluido; 