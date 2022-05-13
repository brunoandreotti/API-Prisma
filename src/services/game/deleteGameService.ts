import { IGameRepository } from '../../repositories/game/IGameRepository'
import { HandleNameService } from '../utils/handleNameService'

class DeleteGameService {
  constructor(private gameRepository: IGameRepository) {}

  async execute(name: string) {
    //Retira o '-' do nome
    const nameWithoutHyphen = HandleNameService.execute(name)

    //Verifica se o jogo já existe
    const game = await this.gameRepository.findByName(nameWithoutHyphen)

    if (!game) {
      throw new Error('Game not found!')
    }

    const deletedGame = await this.gameRepository.delete(nameWithoutHyphen)

    return deletedGame
  }
}

export { DeleteGameService }
