import { Router } from 'express'
import { CreateCommentController } from '../controllers/comment/createCommentController'
//Controllers
import { CreateGameController } from '../controllers/game/createGameController'
import { DeleteGameController } from '../controllers/game/deleteGameController'
import { FindAllGamesController } from '../controllers/game/findAllGamesController'
import { FindGameByNameController } from '../controllers/game/findGameByNameController'
import { UpdateGameController } from '../controllers/game/updateGameController'


const gamesRouter = Router()

// => Games

//Rota deve criar um jogo
gamesRouter.post('/create', CreateGameController.create)

//Rota deve encontrar um jogo baseado no nome
gamesRouter.get('/:name', FindGameByNameController.find)

//Rota deve encontrar todos os jogos
gamesRouter.get('/', FindAllGamesController.findAll)

//Rota deve atualizar um jogo baseado no nome
gamesRouter.patch('/update/:name', UpdateGameController.update )

//Rota deve deletar um jogo baseado no nome
gamesRouter.delete('/:name', DeleteGameController.delete)

// => Comments

gamesRouter.post('/:name/comment/create', CreateCommentController.create)

export { gamesRouter }