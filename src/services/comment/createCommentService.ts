import {
  CommentData,
  ICommentRepository
} from '../../repositories/comment/ICommentRepository'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { FindGameByNameService } from '../game/findGameByNameService'

class CreateCommentService {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(gameName: string, data: CommentData) {
    //Verifica se todos os campos foram preenchidos
    if (!data.text) {
      throw new Error('Text is required!')
    }

    if (!data.game_score) {
      throw new Error('Game score is required!')
    }

    const gameRepository = new GamePrismaRepository()
    const findGameByNameService = new FindGameByNameService(gameRepository)

    //Verifica se o jogo que será criado o comentário existe
    await findGameByNameService.execute(gameName)

    //Cria um comentário
    const comment = this.commentRepository.create(gameName, data)

    return comment
  }
}

export { CreateCommentService }
