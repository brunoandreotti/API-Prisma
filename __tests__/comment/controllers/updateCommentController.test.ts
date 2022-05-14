/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'

describe('Update comment Controller', () => {
  it('Should be able to update an existing comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Jogo Test Update Controller',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const comment = await request(app)
      .post(`/games/${game.name}/comment/create`)
      .send({
        text: 'Jogo muito bom!',
        game_score: 10
      })

      

    const response = await request(app).patch(`/games/comment/${comment.body.result.id}`).send({
      text: 'Jogo muito ruim na verdade',
        game_score: 2
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Comment updated successfully!')
  })

  it('Should not be able to update a nonexisting comment', async () => {
    const response = await request(app).patch(`/games/comment/id-não-existente`).send({
      text: 'Jogo muito ruim na verdade',
        game_score: 2
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Comment not found!')
  })
})
