import express, { Application } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

export default class Server {

    public readonly app: Application;
    public readonly port: number;

    constructor() {
        this.app = express();
        this.middlewares();
        this.port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3010;
    }

    /**
     * Configuración de middleware para express.
     */
    private middlewares(): void {
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(morgan('tiny'));
    }

    public start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
