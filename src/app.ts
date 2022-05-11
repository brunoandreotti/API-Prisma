import express from 'express'
//Routers


import { gamesRouter } from './routes/games/gamesRoutes'

const app = express()
const PORT = 3000


app.use(express.json())

//Rotas
app.use('/game', gamesRouter)




app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

export { app }