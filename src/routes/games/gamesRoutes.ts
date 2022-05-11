import { Router } from 'express'
//Controllers
import { CreateGameController } from '../../controllers/game/createGameController'
import { FindAllGamesController } from '../../controllers/game/findAllGamesController'
import { FindGameByNameController } from '../../controllers/game/findGameByNameController'


const gamesRouter = Router()

//Rota deve criar um jogo
gamesRouter.post('/create', CreateGameController.create)

//Rota deve encontrar um jogo baseado no nome
gamesRouter.get('/:name', FindGameByNameController.find)

//Rota deve encontrar todos os jogos
gamesRouter.get('/', FindAllGamesController.findAll)

export { gamesRouter }
