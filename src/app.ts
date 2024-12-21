import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api', router)
const getController = async (req: Request, res: Response) => {
  res.send('Hello Duniya')
}

app.get('/', getController)

app.use(globalErrorHandler)
app.use(notFound)

export default app
