import { celebrate, Joi } from 'celebrate';

const VerificacaoReceptorConcluido = celebrate({
  body: Joi.object().keys({
    Nome: Joi.string().required(),
    Whatsapp: Joi.string().allow(),
    Telefone: Joi.string().required(),
    DescricaoReceptor: Joi.string().required(),
    Tipo: Joi.string().required(),
    Cidade: Joi.string().required(),
    UF: Joi.string().required().max(2),
    Numero: Joi.string().required(),
    Rua: Joi.string().required(),
    Bairro: Joi.string().required(),
    CEP: Joi.string().allow(),
    Latitude: Joi.number().required(),
    Longitude: Joi.number().required(),
    Img_Local: Joi.string().allow()
  })
}, 
{abortEarly: false});

export default VerificacaoReceptorConcluido; 