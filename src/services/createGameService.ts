import { GameData, IGameRepository } from '../repositories/game/IGameRepository'

class CreateGameService {
  constructor(private gameRepository: IGameRepository) {}

  async execute(data: GameData) {
    //Verifica se o jogo já existe
    const gameAlreadyExists = await this.gameRepository.findByName(data.name)

    if (gameAlreadyExists) {
      throw new Error('Game already exists!')
    }

    const gameCreated = await this.gameRepository.create(data)

    return gameCreated
  }
}

export { CreateGameService }
