import { Request, Response } from 'express'
import { CommentPrismaRepository } from '../../repositories/comment/CommentPrismaRepository'
import { CommentData } from '../../repositories/comment/ICommentRepository'
import { CreateCommentService } from '../../services/comment/createGameService'
import { HandleNameService } from '../../services/utils/handleNameService'

class CreateCommentController {
  static async create(req: Request, res: Response) {
    const prismaRepository = new CommentPrismaRepository()
    const createCommentService = new CreateCommentService(prismaRepository)

    const { name } = req.params

    const { text, game_score } = req.body

    //Retira '-' do nome
    const nameWithoutHyphen = HandleNameService.execute(name)

    const commentData: CommentData = {
      text,
      game_score
    }

    try {
      const result = await createCommentService.execute(nameWithoutHyphen, commentData)

      res.status(201).json({ message: 'Comment created successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { CreateCommentController }
