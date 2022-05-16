/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */
import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'

describe('Find all games Controller', () => {
  it('Should be able to find all games', async () => {
    await prisma.games.create({
      data: {
        name: 'Jogo Todos Teste',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    await prisma.games.create({
      data: {
        name: 'Jogo Todos Teste 2',
        description: 'Teste',
        developer: 'Teste'
      }
    })

    const response = await request(app).get('/games/')

    

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('result')
    expect(Array.isArray(response.body.result)).toBe(true)
    expect(parseInt(response.body.result.length)).toBeGreaterThan(0)
    
  })
})
