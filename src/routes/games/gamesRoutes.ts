import { Router } from "express";
import { CreateGameController } from "../../controllers/game/createGameController";

const gamesRouter = Router()

//Rota deve criar um jogo
gamesRouter.post('/create', CreateGameController.create)

export { gamesRouter }