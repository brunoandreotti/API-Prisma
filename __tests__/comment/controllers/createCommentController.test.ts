/**
 * @jest-environment ./prisma/prisma-enviroment-test.js
 */

import request from 'supertest'
import { app } from '../../../src/app'
import { prisma } from '../../../src/database/client'

describe('Create Game Controller', () => {
  it('Should be able to create a new comment', async () => {
    const game = await prisma.games.create({
      data: {
        name: 'Novo Jogo Comment Controller',
        description: 'Teste',
        developer: 'Teste'
      }
    })
    const response = await request(app)
      .post(`/games/${game.name}/comment/create`)
      .send({
        text: 'Jogo muito bom!',
        game_score: 10
      })

    

    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Comment created successfully!')
    expect(response.body).toHaveProperty('result')
  })

  it('Should not be able to create a new comment in a nonexisting game', async () => {
    const response = await request(app)
      .post(`/games/jogo-não-existente-comment/comment/create`)
      .send({
        text: 'Jogo muito bom!',
        game_score: 10
      })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game not found!')
  })

  it('Should not be able to create a new comment without text', async () => {
    const response = await request(app)
      .post(`/games/Novo-Jogo-Comment-Controller/comment/create`)
      .send({
        game_score: 10
      })

    

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Text is required!')
  })

  it('Should not be able to create a new comment without game score', async () => {
    const response = await request(app)
      .post(`/games/Novo-Jogo-Comment-Controller/comment/create`)
      .send({
        text: 'Jogo bom'
      })

    

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game score is required!')
  })
})
