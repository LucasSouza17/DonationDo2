import { celebrate, Joi } from 'celebrate';

const VerificacaoReaproveitarNecessidade = celebrate({
    body: Joi.object().keys({
    Data_Final: Joi.date().allow()})
}, 
{abortEarly: false});

export default VerificacaoReaproveitarNecessidade; 