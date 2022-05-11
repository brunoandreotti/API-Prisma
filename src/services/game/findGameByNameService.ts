import { IGameRepository } from '../../repositories/game/IGameRepository'

class FindGameByNameService {
  constructor(private gameRepository: IGameRepository) {}
  async execute(name: string) {
    if (!name) {
      throw new Error('Name is required!')
    }

    const game = await this.gameRepository.findByName(name)

    if (!game) {
      throw new Error('Game not found!')
    }

    return game
  }
}

export { FindGameByNameService }
