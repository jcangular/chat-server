import { Socket, Server as SocketServer } from 'socket.io';
import User from '../classes/user';
import UserList from '../classes/userList';


export const connectedUsers = new UserList();

export const onConnect = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
};

/**
 * Escucha cuando un cliente se desconecta.
 * @param client Socket del cliente.
 */
export const disconnect = (client: Socket) => {
    client.on('disconnect', () => connectedUsers.deleteUser(client.id));
};

/**
 * Escucha el evento de message, donde el cliente envía un mensaje.
 * @param client Socket del cliente.
 */
export const onMessage = (client: Socket, io: SocketServer) => {
    client.on('message', (data) => {
        // console.log(data);
        io.emit('messages', data);
    });
};

export const onLogin = (client: Socket, io: SocketServer) => {
    client.on('loginUser', (data: any, callback: Function) => {
        connectedUsers.updateName(client.id, data.name);
        callback({ ok: true, id: client.id });
    });
};
