import { Request, Response } from 'express'
import { CommentPrismaRepository } from '../../repositories/comment/CommentPrismaRepository'
import { DeleteCommentService } from '../../services/comment/deleteCommentService'

class DeleteCommentController {
  static async delete(req: Request, res: Response) {
    const prismaRepository = new CommentPrismaRepository()
    const deleteCommentService = new DeleteCommentService(prismaRepository)

    const { id } = req.params

    try {
      const result = await deleteCommentService.execute(id)

      res.status(200).json({ message: 'Comment deleted successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { DeleteCommentController }
