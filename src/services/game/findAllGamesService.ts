import { IGameRepository } from '../../repositories/game/IGameRepository'

class FindAllGamesService {
  constructor(private gameRepository: IGameRepository) {}
  async execute() {
    const games = await this.gameRepository.findAll()

    return games
  }
}

export { FindAllGamesService }
