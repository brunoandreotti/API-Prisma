/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import { app } from '../../../src/app'
import { prisma } from "../../../src/database/client"
import request from 'supertest'

describe('Find game by name Controller', () => {
  it('Should be able to find an existing game', async () => {
    await prisma.games.create({
      data: {
        name: 'Jogo Teste',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const response = await request(app).get('/game/Jogo-Teste')

    

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('result')
  })

  it('Should not be able to find an nonexisting game', async () => {
    const response = await request(app).get('/game/jogo-não-existente')

    
    console.log(response.body)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game not found!')
  })
})