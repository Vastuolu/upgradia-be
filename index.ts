import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './src/app/user/routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.use('/user', userRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});