import 'reflect-metadata';

import App from './app';
import ClientWS from './websocket/client';

const PORT: number = 3333;

App.initialize();
App.start(PORT);

const io = App.getIO();

ClientWS.listen(io);
