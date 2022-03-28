import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './routes/loginRoutes';
import clubRouter from './routes/clubRoutes';
import matchRouter from './routes/matchRoutes';
import leaderboardRouter from './routes/leaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/login', loginRouter);
    this.app.use('/clubs', clubRouter);
    this.app.use('/matchs', matchRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running at port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
