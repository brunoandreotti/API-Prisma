import express from 'express'
//Routers
import { gamesRouter } from './routes/gamesRoutes'

import 'dotenv/config'

const app = express()

app.use(express.json())

//Rotas
app.use('/games', gamesRouter)

export { app }

//Teste worktree
//Teste git stash
//Teste pull request worktree
