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

  update(data: GameSave): Promise<GameSave> {
      this.games.map((game: any) => {
        if(game.name === data.name) {
          if(data.name) {
            game.name = data.name
          }

          if(data.description) {
            game.description = data.description
          }

          if(data.developer) {
            game.developer = data.developer
          }
        }
      })

      const game = this.games.find((game: any) => game.name === data.name)

      return game
      
  }
}

export { GameInMemoryRepository }
