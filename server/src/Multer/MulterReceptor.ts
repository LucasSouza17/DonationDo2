import { celebrate, Joi } from 'celebrate';

const VerificacaoReceptor = celebrate({
    body: Joi.object().keys({
    Email: Joi.string().required().email(),
    Senha: Joi.string().required().min(8),
  })
}, 
{abortEarly: false});

export default VerificacaoReceptor; 