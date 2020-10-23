import { Socket, Server as SocketServer } from 'socket.io';

/**
 * Escucha cuando un cliente se desconecta.
 * @param client Socket del cliente.
 */
export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('¡Cliente desconectado!');
    });
};

/**
 * Escucha el evento de message, donde el cliente envía un mensaje.
 * @param client Socket del cliente.
 */
export const onMessage = (client: Socket, io: SocketServer) => {
    client.on('message', (data) => {
        console.log(data);
        io.emit('messages', data);
    });
};
