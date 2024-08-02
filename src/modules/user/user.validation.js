import Joi from 'joi'

export const addCategoryValidation=Joi.object({
    name:Joi.string().min(1).max(50).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().required().valid('image/jpeg','image/png'),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required().max(5242880)
    }).required(),
})