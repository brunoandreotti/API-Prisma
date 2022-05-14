import { Comments } from '@prisma/client'
import { prisma } from '../../database/client'
import { CommentData, CommentSave, CommentUploadData, ICommentRepository } from './ICommentRepository'

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

  async update(data: CommentUploadData): Promise<CommentSave> {
    const updatedComment = await prisma.comments.update({
      where: {
        id: data.id
      },
      data: {
        text: data.text,
        game_score: data.game_score
      }
    })

    return updatedComment
  }

  async delete(id: string): Promise<Comments> {
    const deletedComment = await prisma.comments.delete({
      where: {
        id
      }
    })

    return deletedComment
  }

  
}

export { CommentPrismaRepository }
