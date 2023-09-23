import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './src/app/user/routes'
import { projectRoutes } from './src/app/project/routes.project';
import { blogRoutes } from './src/app/blog/routes.blog';
import path from 'path'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRoutes)
app.use('/project',projectRoutes)
app.use('/blog', blogRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});