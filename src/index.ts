require('dotenv').config();
import Server from './classes/server';
import router from './routes/router';

const server = new Server();
server.app.use(router);

server.start(() => {
    console.log(`Server running on port`, server.port);
});
