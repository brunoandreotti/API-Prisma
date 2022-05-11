import { GameInMemoryRepository } from '../../../src/repositories/game/GameInMemoryRepository'
import { GameData } from '../../../src/repositories/game/IGameRepository'
import { FindAllGamesService } from '../../../src/services/game/findAllGamesService'

let findAllGamesService: FindAllGamesService
let gameInMemoryRepository: GameInMemoryRepository

describe('Find all games Service', () => {
  beforeAll(() => {
    gameInMemoryRepository = new GameInMemoryRepository()
    findAllGamesService = new FindAllGamesService(gameInMemoryRepository)
  })

  it('Should be able to find all games', async () => {
    const game: GameData = {
      name: 'Nome Teste 2',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    const game2: GameData = {
      name: 'Nome Teste 3',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    gameInMemoryRepository.create(game)
    gameInMemoryRepository.create(game2)

    const games = await findAllGamesService.execute()

    expect(Array.isArray(games)).toBe(true)
  })
  
})