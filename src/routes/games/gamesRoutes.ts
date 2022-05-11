import { Router } from "express";
import { CreateGameController } from "../../controllers/game/createGameController";
import { FindGameByNameController } from "../../controllers/game/findGameByNameController";

const gamesRouter = Router()

//Rota deve criar um jogo
gamesRouter.post('/create', CreateGameController.create)
gamesRouter.get('/:name', FindGameByNameController.find)

export { gamesRouter }