/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'
import { CommentPrismaRepository } from '../../../src/repositories/comment/CommentPrismaRepository'
import { CommentData } from '../../../src/repositories/comment/ICommentRepository'

describe('Delete Comment Controller', () => {
  it('Should be able to delete an existing comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Jogo Delete Comment',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const commentRepository = new CommentPrismaRepository()

    const commentData: CommentData = {
      text: 'Jogo bom',
      game_score: 8
    }

    const comment = await commentRepository.create(game.name, commentData)

    const response = await request(app).delete(`/games/comment/${comment.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Comment deleted successfully!')
  })

  it('Should not be able to delete a nonexisting comment', async () => {
    const response = await request(app).delete(`/games/comment/id-não-existente`)

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Comment not found!')
  })
})
