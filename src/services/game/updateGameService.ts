import {
  GameData,
  IGameRepository
} from '../../repositories/game/IGameRepository'
import { HandleNameService } from '../utils/handleNameService'

class UpdateGameService {
  constructor(private gameRepository: IGameRepository) {}

  async execute(name: string, data: GameData) {
    //Retira o '-' do nome
    const nameWithoutHyphen =  HandleNameService.execute(name)
    
    //Verifica se o jogo já existe
    const game = await this.gameRepository.findByName(nameWithoutHyphen)

    if (!game) {
      throw new Error('Game not found!')
    }

    const updatedDate = {
      id: game.id,
      ...data
    }

    const updatedGame = await this.gameRepository.update(updatedDate)

    return updatedGame
  }
}

export { UpdateGameService }
