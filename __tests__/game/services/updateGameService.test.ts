import { GameInMemoryRepository } from '../../../src/repositories/game/GameInMemoryRepository'
import { GameData } from '../../../src/repositories/game/IGameRepository'
import { UpdateGameService } from '../../../src/services/game/updateGameService'

let gameInMemoryRepository: GameInMemoryRepository
let updateGameService: UpdateGameService

describe('Update game Service', () => {
  beforeAll(() => {
    gameInMemoryRepository = new GameInMemoryRepository()
    updateGameService = new UpdateGameService(gameInMemoryRepository)
  })

  it('Should be able to update a game', async () => {
    const game: GameData = {
      name: 'Nome Update',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    const updatedData: GameData = {
      name: 'Nome Update Atualizado',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    const createdGame = await gameInMemoryRepository.create(game)

    const updatedGame = await updateGameService.execute(
      createdGame.name,
      updatedData
    )

    expect(updatedGame.name).toBe(updatedData.name)
  })

  it('Should not be able to update a nonexisting game', async () => {
    const updatedData: GameData = {
      name: 'Nome Update Atualizado',
      description: 'Descrição Teste',
      developer: 'Desenvolvedor teste'
    }

    await expect(
      updateGameService.execute('Nome não existente', updatedData)
    ).rejects.toThrow(new Error('Game not found!'))
  })
})
