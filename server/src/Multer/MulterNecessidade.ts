import { celebrate, Joi } from 'celebrate';

const VerificacaoNecessidade = celebrate({
  body: Joi.object().keys({
    Descricao: Joi.string().required(),
    cod_Item: Joi.number().required(),
    Data_Final: Joi.date().required()}), 
  
}, {abortEarly: false})

export default VerificacaoNecessidade; 