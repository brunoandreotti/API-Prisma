/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */

import { prisma } from '../../../src/database/client'
import { CommentPrismaRepository } from '../../../src/repositories/comment/CommentPrismaRepository'
import { CommentData } from '../../../src/repositories/comment/ICommentRepository'
import { DeleteCommentService } from '../../../src/services/comment/deleteCommentService'

let deleteCommentService: DeleteCommentService
let commentRepository: CommentPrismaRepository

describe('Delete comment service', () => {
  beforeAll(() => {
    commentRepository = new CommentPrismaRepository()
    deleteCommentService = new DeleteCommentService(commentRepository)
  })
  it('Should be able to delete an existing comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Jogo Delete Comment',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const commentData: CommentData = {
      text: 'Teste',
      game_score: 10
    }

    const comment = await commentRepository.create(game.name, commentData)

    const result = await commentRepository.delete(comment.id)

    expect(result).toStrictEqual(comment)
  })

  it('Should not be able to delete non existing comment', async () => {
    await expect(
      deleteCommentService.execute('Comment não existente')
    ).rejects.toThrow(new Error('Comment not found!'))
  })
  
})
