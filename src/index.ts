require('dotenv').config();
import ChatServer from './classes/server';
import router from './routes/router';


const server = ChatServer.instance;
server.app.use(router);

server.start(() => {
    console.log(`Server running on port`, server.port);
});
