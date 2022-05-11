import {
  GameData,
  IGameRepository
} from '../../repositories/game/IGameRepository'

class UpdateGameService {
  constructor(private gameRepository: IGameRepository) {}
  async execute(data: GameData) {
    //Verifica se o jogo já existe
    const gameAlreadyExists = await this.gameRepository.findByName(data.name)

    if (!gameAlreadyExists) {
      throw new Error('Game not found!')
    }

    const updatedDate = {
      id: gameAlreadyExists.id,
      ...data
    }

    const updatedGame = await this.gameRepository.update(updatedDate)

    return updatedGame
  }
}

export { UpdateGameService }
