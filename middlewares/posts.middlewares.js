import { postById } from "../src/models/posts.models.js"
import { createPostSchema, updatePostSchema } from "./schemas/post.schema.js"

const createPostlMiddleware = async (req, res, next) => {
    const { error } = createPostSchema.validate(req.body)
    if (error) {
    res.status(400).json(error.details.map(detail => detail.message))
}
    next()
}

const updatePostMiddleware = async (req, res, next) => {
    const { post_id } = req.params
    const { error } = updatePostSchema.validate(req.body)
    if (error) {
        res.status(400).json(error.details.map(detail => detail.message))
    }

    const post = await postById(post_id)
    if (!post) {
        res.status(400).json({message: "El post no existe"})
    }

    req.oldData = post
    next()
}

export { createPostlMiddleware, updatePostMiddleware }