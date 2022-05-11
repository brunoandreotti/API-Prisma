import { GameInMemoryRepository } from '../../../src/repositories/game/GameInMemoryRepository'
import { GameData } from '../../../src/repositories/game/IGameRepository'
import { FindGameByNameService } from '../../../src/services/game/findGameByNameService'

let findGameByNameService: FindGameByNameService
let gameInMemoryRepository: GameInMemoryRepository

describe('Find game by name Service', () => {
  beforeAll(() => {
    gameInMemoryRepository = new GameInMemoryRepository()
    findGameByNameService = new FindGameByNameService(gameInMemoryRepository)
  })

  it('Should be able to found an existing game', async () => {
    const game: GameData = {
      name: 'Nome Teste',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    gameInMemoryRepository.create(game)

    const result = await findGameByNameService.execute('Nome Teste')

    expect(result).toHaveProperty('name')
  })

  it('Should be not able to found an nonexisting game', async () => {
    const game: GameData = {
      name: 'Nome Teste',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    gameInMemoryRepository.create(game)

    await expect(findGameByNameService.execute('Nome')).rejects.toThrow(new Error('Game not found!'))
  })

  it('Should be not able to found a game without name', async () => {
    const game: GameData = {
      name: 'Nome Teste',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    gameInMemoryRepository.create(game)

    await expect(findGameByNameService.execute('')).rejects.toThrow(new Error('Name is required!'))
  })
})
