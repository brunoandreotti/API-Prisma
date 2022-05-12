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

  async findAll(): Promise<GameSave[]> {
    return this.games
  }

  async update(data: GameSave): Promise<GameSave> {
    this.games.map((game: any) => {
      if (game.id === data.id) {
        if (data.name) {
          game.name = data.name
        }

        if (data.description) {
          game.description = data.description
        }

        if (data.developer) {
          game.developer = data.developer
        }
      }
    })

    const game = this.games.find((game: any) => game.name === data.name)

    return game
  }

  async delete(name: string): Promise<GameSave> {
    const gameIndex = this.games.filter((game: GameData, index: number) => {
      if (game.name === name) {
        return index
      }
    })

    const deletedGame = this.games.splice(gameIndex, 1)

    return deletedGame
  }
}

export { GameInMemoryRepository }
