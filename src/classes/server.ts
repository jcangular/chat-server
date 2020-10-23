import express, { Application } from 'express';
import socketIO, { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';


import * as socket from '../socket/socket';

export default class ChatServer {

    private static chatServerInstance: ChatServer;

    public readonly app: Application;
    public readonly port: number;
    private readonly io: SocketServer;
    private readonly httpServer: HTTPServer;

    private constructor() {
        this.app = express();
        this.httpServer = new HTTPServer(this.app);
        this.io = socketIO(this.httpServer);
        this.middlewares();
        this.socketInit();
        this.port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3010;
    }

    public static get instance(): ChatServer {
        return ChatServer.chatServerInstance || (ChatServer.chatServerInstance = new ChatServer());
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

    private socketInit(): void {
        this.io.on('connection', client => {
            console.log(`¡Cliente conectado!`);
            socket.disconnect(client);
            socket.onMessage(client, this.io);
        });

    }

    public start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}
