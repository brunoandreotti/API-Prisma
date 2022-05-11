import { Games } from '@prisma/client'
import { randomUUID } from 'crypto'
import { GameData, GameSave, IGameRepository } from './IGameRepository'

class GameInMemoryRepository implements IGameRepository {
  games: any = []

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
    const game = this.games.find((game: any) => game.name === name)
    return game
  }

  findAll(): Promise<GameSave[]> {
      return this.games
  }
}

export { GameInMemoryRepository }
