/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */

import { prisma } from '../../../src/database/client'
import { CommentPrismaRepository } from '../../../src/repositories/comment/CommentPrismaRepository'
import {
  CommentData,
  CommentUploadData
} from '../../../src/repositories/comment/ICommentRepository'
import { UpdateCommentService } from '../../../src/services/comment/updateGameService'

let commentRepository: CommentPrismaRepository
let updateCommentService: UpdateCommentService

describe('Update comment Service', () => {
  beforeAll(() => {
    commentRepository = new CommentPrismaRepository()
    updateCommentService = new UpdateCommentService(commentRepository)
  })
  it('Should be able to update an existing comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Jogo Update Service',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const commentData: CommentData = {
      text: 'Jogo ruim',
      game_score: 5
    }

    const comment = await commentRepository.create(game.name, commentData)

    const updatedData: CommentUploadData = {
      id: comment.id,
      text: 'Jogo muito ruim',
      game_score: 3
    }

    const updatedGame = await updateCommentService.execute(updatedData)

    expect(updatedGame.text).toBe(updatedData.text)
    expect(updatedGame.game_score).toBe(updatedData.game_score)
  })

  it('Should not be able to update a nonexisting comment', async () => {
    const updatedData: CommentUploadData = {
      id: 'id-inexistente',
      text: 'Jogo muito ruim',
      game_score: 3
    }

    await expect(updateCommentService.execute(updatedData)).rejects.toThrow(
      new Error('Comment not found!')
    )
  })
})
