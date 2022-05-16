/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'
import { GameData } from '../../../src/repositories/game/IGameRepository'

describe('Update game Controller', () => {
  it('Should be able to update an existing game', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Novo Game',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const updatedData: GameData = {
      name: 'Novo Game Atualizado',
      description: 'Teste Atualizado',
      developer: 'Teste Atualizado'
    }

    const response = await request(app)
      .patch(`/games/update/Novo-Game`)
      .send(updatedData)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Game updated successfully!')
  })

  it('Should not be able to update a nonexisting game', async () => {
    const updatedData: GameData = {
      name: 'Novo Game Atualizado',
      description: 'Teste Atualizado',
      developer: 'Teste Atualizado'
    }

    const response = await request(app)
      .patch(`/games/update/Novo-Game-Inexistente`)
      .send(updatedData)

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game not found!')
  })
})
