import express, { Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js'

dotenv.config();

const app: Express = express();
const port: any = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(routes);


app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});