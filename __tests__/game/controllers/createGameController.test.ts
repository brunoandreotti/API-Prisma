import request from 'supertest'
import { app } from '../../../src/app'

describe('Create Game Controller', () => {
  it('Should be able to create a new game', async () => {
    const response = await request(app).post('/games/create').send({
      name: 'Teste Jogo',
      description: 'Teste',
      developer: 'Teste'
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Game created successfully!')
    expect(response.body).toHaveProperty('result')
  })

  it('Should not be able to create a new game without name', async () => {
    const response = await request(app).post('/games/create').send({
      name: '',
      description: 'Teste',
      developer: 'Teste'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Name is required!')
    
  })

  it('Should not be able to create a new game without description', async () => {
    const response = await request(app).post('/games/create').send({
      name: 'Teste 3',
      description: '',
      developer: 'Teste'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Description is required!')
    
  })

  it('Should not be able to create a new game without developer', async () => {
    const response = await request(app).post('/games/create').send({
      name: 'Teste 4',
      description: 'Teste',
      developer: ''
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Developer is required!')
    
  })

  it('Should not be able to create an existing game', async () => {
    await request(app).post('/games/create').send({
      name: 'Teste Jogo 2',
      description: 'Teste',
      developer: 'Teste'
    })

    const response = await request(app).post('/games/create').send({
      name: 'Teste Jogo 2',
      description: 'Teste',
      developer: 'Teste'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Game already exists!')
    
  })
})
