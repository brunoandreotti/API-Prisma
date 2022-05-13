/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'

describe('Delete game Controller', () => {
  it('Should be able to delete an existing game', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Novo Game Delete',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const response = await request(app).delete('/games/Novo-Game-Delete')

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Game deleted successfully!')
    expect(response.body).toHaveProperty('result')
  })

  it('Should not be able to delete a nonexisting game', async () => {
    const response = await request(app).delete(`/games/Novo-Game-Inexistente`)

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game not found!')
  })
})
