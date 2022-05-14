import { Request, Response } from 'express'
import { CommentPrismaRepository } from '../../repositories/comment/CommentPrismaRepository'
import { CommentData } from '../../repositories/comment/ICommentRepository'
import { CreateCommentService } from '../../services/comment/createGameService'

class CreateCommentController {
  static async create(req: Request, res: Response) {
    const prismaRepository = new CommentPrismaRepository()
    const createCommentService = new CreateCommentService(prismaRepository)

    const { name } = req.params

    const { text, game_score } = req.body

    const commentData: CommentData = {
      text,
      game_score
    }

    try {
      const result = await createCommentService.execute(name, commentData)

      res.status(201).json({ message: 'Comment created successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { CreateCommentController }
