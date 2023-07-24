import 'reflect-metadata';

import App from './app';
import ClientWS from './websocket/client';
import AdminWS from './websocket/admin';

const PORT: number = 3333;

App.initialize();
App.start(PORT);

const io = App.getIO();

ClientWS.listen(io);
AdminWS.listen(io);
