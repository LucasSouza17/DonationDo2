import { celebrate, Joi } from 'celebrate';

const VerificacaoDoador = celebrate({
  body: Joi.object().keys({
    Nome: Joi.string().required(),
    Email: Joi.string().required().email(),
    Senha: Joi.string().required(),
    Whatsapp: Joi.string().allow(),  
    Cidade: Joi.string().required(),
    UF: Joi.string().required().max(2),
  }), 
}, {abortEarly: false})

export default VerificacaoDoador; 