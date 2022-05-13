import { GameInMemoryRepository } from '../../../src/repositories/game/GameInMemoryRepository'
import { GameData } from '../../../src/repositories/game/IGameRepository'
import { DeleteGameService } from '../../../src/services/game/deleteGameService'

let gameInMemoryRepository: GameInMemoryRepository
let deleteGameService: DeleteGameService

describe('Delete game Service', () => {
  beforeAll(() => {
    gameInMemoryRepository = new GameInMemoryRepository()
    deleteGameService = new DeleteGameService(gameInMemoryRepository)
  })

  it('Should be able to dele a game', async () => {
    const game: GameData = {
      name: 'Nome Delete',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    const createdGame = await gameInMemoryRepository.create(game)

    const deletedGame = await deleteGameService.execute('Nome-Delete')

    expect(deletedGame).toStrictEqual(createdGame)
  })

  it('Should not be able to delete a nonexisting game', async () => {
    await expect(
      deleteGameService.execute('Nome não existente')
    ).rejects.toThrow(new Error('Game not found!'))
  })
})
