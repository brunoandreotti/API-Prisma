import { GameInMemoryRepository } from '../../../src/repositories/game/GameInMemoryRepository'
import { GameData } from '../../../src/repositories/game/IGameRepository'
import { CreateGameService } from '../../../src/services/game/createGameService'

let createGameService: CreateGameService
let gameInMemoryRepository: GameInMemoryRepository

describe('Create Game', () => {
  beforeAll(() => {
    gameInMemoryRepository = new GameInMemoryRepository()
    createGameService = new CreateGameService(gameInMemoryRepository)
  })

  it('Should be able to create a new game', async () => {
    const game: GameData = {
      name: 'Nome Teste',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    const result = await createGameService.execute(game)

    expect(result).toHaveProperty('id')
  })

  it('Should not be able to create an existing game', async () => {
    const game: GameData = {
      name: 'Nome Teste Existente',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }
    await createGameService.execute(game)

    await expect(createGameService.execute(game)).rejects.toEqual(
      new Error('Game already exists!')
    )
  })

  it('Should not be able to create a new game without name', async () => {
    const game = {
      name: '',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    await expect(createGameService.execute(game)).rejects.toEqual(
      new Error('Name is required required!')
    )
  })

  it('Should not be able to create a new game without description', async () => {
    const game = {
      name: 'Teste',
      description: '',
      developer: 'Desenvolvedor teste'
    }

    await expect(createGameService.execute(game)).rejects.toEqual(
      new Error('Description is required required!')
    )
  })

  it('Should not be able to create a new game without developer', async () => {
    const game = {
      name: 'Teste',
      description: 'Descrição teste',
      developer: ''
    }

    await expect(createGameService.execute(game)).rejects.toEqual(
      new Error('Developer is required required!')
    )
  })
})
