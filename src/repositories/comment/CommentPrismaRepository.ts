import { prisma } from '../../database/client'
import {
  CommentData,
  CommentSave,
  ICommentRepository
} from './ICommentRepository'

class CommentPrismaRepository implements ICommentRepository {
  async create(
    gameName: string,
    { game_score, text }: CommentData
  ): Promise<CommentSave> {
    const comment = await prisma.comments.create({
      data: {
        text,
        game_score,
        game: {
          connect: {
            name: gameName
          }
        }
      },
      include: {
        game: true
      }
    })

    return comment
  }
}

export { CommentPrismaRepository }
