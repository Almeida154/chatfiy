import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

import { routes } from './routes';
import AppDataSource from './data-source';

class App {
  private app: Application;
  private httpServer: HTTPServer;
  private io: Server;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, { cors: { origin: '*' } });
  }

  public initialize(): void {
    this.configureCors();
    this.configureDataSource();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureWebSocket();
  }

  private configureWebSocket(): void {
    this.io.on('connection', (socket: Socket) =>
      console.log(`📭 A WS has been connected with id ${socket.id}`)
    );
  }

  private async configureDataSource(): Promise<void> {
    await AppDataSource.initialize();
    console.log('📦 Database has been connected successfully');
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use(routes);
  }

  private configureCors(): void {
    this.app.use(cors({ origin: 'http://127.0.0.1:5173' }));
  }

  public start(port: number): void {
    this.httpServer.listen(port, () => {
      console.log(`✅ Server is listening on port ${port}`);
    });
  }

  public getIO(): Server {
    return this.io;
  }
}

export default new App();
