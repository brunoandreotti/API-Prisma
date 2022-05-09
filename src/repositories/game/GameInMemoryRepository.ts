import { randomUUID } from 'crypto'
import { GameData, GameSave, IGameRepository } from './IGameRepository'

class GameInMemoryRepository implements IGameRepository {
  games: any[] = []

  async create(data: GameData): Promise<GameSave> {
    const id = randomUUID()
    const product: GameSave = {
      ...data,
      id
    }

    this.games.push(product)

    return product
  }

  async findByName(name: string): Promise<GameSave | null> {
    return this.games.find(game => game.name === name)
  }
}

export { GameInMemoryRepository }
