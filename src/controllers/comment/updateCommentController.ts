import { Request, Response } from 'express'
import { CommentPrismaRepository } from '../../repositories/comment/CommentPrismaRepository'
import { CommentUploadData } from '../../repositories/comment/ICommentRepository'
import { UpdateCommentService } from '../../services/comment/updateGameService'

class UpdateCommentController {
  static async update(req: Request, res: Response) {
    const prismaRepository = new CommentPrismaRepository()
    const updateCommentService = new UpdateCommentService(prismaRepository)

    const { id } = req.params

    const { text, game_score} = req.body

    const updatedData: CommentUploadData = {
      id,
      text,
      game_score
    }

    try {
      const result = await updateCommentService.execute(updatedData)

      res.status(200).json({ message: 'Comment updated successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { UpdateCommentController }
