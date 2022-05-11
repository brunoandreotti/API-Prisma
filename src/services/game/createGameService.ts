import { GameData, IGameRepository } from '../../repositories/game/IGameRepository'

class CreateGameService {
  constructor(private gameRepository: IGameRepository) {}

  async execute(data: GameData) {
    //Verifica se todos os campos foram preenchidos
    if(!data.name){
      throw new Error('Name is required required!')
    }

    if(!data.description){
      throw new Error('Description is required required!')
    }

    if(!data.developer){
      throw new Error('Developer is required required!')
    }
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
