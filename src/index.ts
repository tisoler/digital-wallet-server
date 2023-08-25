import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from './routes/apiRouter'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// create server
const app: Express = express()
app.use(express.json())

// cors configuration
const corsOptions = {
	origin: [FRONTEND_URL, 'http://localhost:3000'],
	optionsSuccessStatus: 200,
	credentials: true,
}

// @ts-ignore
app.use(cors(corsOptions))
app.use('/api', apiRouter)

const port = API_PORT || 3035
app.listen(port, () => {
  console.log(`⚡️[Server]: Server running in http://localhost:${port}`)
})
