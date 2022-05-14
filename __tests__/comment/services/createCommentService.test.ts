/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */

import { prisma } from '../../../src/database/client'
import { CommentPrismaRepository } from '../../../src/repositories/comment/CommentPrismaRepository'
import { CommentData } from '../../../src/repositories/comment/ICommentRepository'
import { CreateCommentService } from '../../../src/services/comment/createCommentService'

let createCommentService: CreateCommentService
let commentRepository: CommentPrismaRepository

describe('Create comment service', () => {
  beforeAll(() => {
    commentRepository = new CommentPrismaRepository()
    createCommentService = new CreateCommentService(commentRepository)
  })

  it('Should be able to create a new comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Jogo Teste Comment',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const commentData: CommentData = {
      text: 'Jogo muito bom',
      game_score: 10
    }

    const result = await createCommentService.execute(game.name, commentData)

    expect(result).toHaveProperty('id')
  })

  it('Should not be able to create a new comment in a nonexisting game', async () => {
    const commentData: CommentData = {
      text: 'Jogo muito bom',
      game_score: 10
    }

    await expect(
      createCommentService.execute('Jogo Não Existente Comment', commentData)
    ).rejects.toEqual(new Error('Game not found!'))
  })

  it('Should not be able to create a new comment without text', async () => {
    const commentData: CommentData = {
      text: '',
      game_score: 10
    }

    await expect(
      createCommentService.execute('Jogo Teste Comment', commentData)
    ).rejects.toEqual(new Error('Text is required!'))
  })

  it('Should not be able to create a new comment without game score', async () => {
    const commentData: CommentData = {
      text: 'Jogo muito bom',
      game_score: parseInt('')
    }

    await expect(
      createCommentService.execute('Jogo Teste Comment', commentData)
    ).rejects.toEqual(new Error('Game score is required!'))
  })
})
