import cors from "cors";
import express, { Application, Request, Response } from 'express'
import router from "./app/routes";

const app: Application = express();

app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api/v1', router)
app.get('/', function(req: Request, res: Response) {
    res.send('Hello Duniya')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;