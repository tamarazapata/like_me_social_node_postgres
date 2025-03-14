import Joi from 'joi'

const createPostSchema = Joi.object({
    title: Joi.string().required(),
    image_url: Joi.string().required(),
    post_description: Joi.string().required(),
    likes: Joi.number().optional()
})

const updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    image_url: Joi.string().optional(),
    post_description: Joi.string().optional(),
    likes: Joi.number().optional()
})

export { createPostSchema, updatePostSchema }