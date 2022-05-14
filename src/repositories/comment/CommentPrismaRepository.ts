import { prisma } from '../../database/client'
import {
  CommentData,
  CommentSave,
  ICommentRepository
} from './ICommentRepository'
import { Comments } from '@prisma/client'

class CommentPrismaRepository implements ICommentRepository {
  
  async create(
    gameName: string,
    { game_score, text }: CommentData
  ): Promise<Comments> {
    const comment = await prisma.comments.create({
      data: {
        text,
        game_score,
        game: {
          connect: {
            name: gameName
          }
        }
      }
    })

    return comment
  }

  async findById(id: string): Promise<Comments | null> {
    const comment = await prisma.comments.findUnique({
      where: {
        id
      }
    })

    return comment
  }

  

  async delete(id: string): Promise<Comments> {
    const comment = await prisma.comments.delete({
      where: {
        id
      }
    })

    return comment
  }

}

export { CommentPrismaRepository }
