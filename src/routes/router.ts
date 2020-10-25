import { Router, Request, Response } from 'express';
import ChatServer from '../classes/server';
import { connectedUsers } from '../socket/socket';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Todo está bien'
    });
});

// Envía un mensaje a todos los usuarios.
router.post('/messages', async (req: Request, res: Response) => {
    const { message, from } = req.body;
    await ChatServer.instance.io.emit('messages', { from, message });
    res.json({ ok: true });
});

// Envía un mensaje privado a un usuario.
router.post('/messages/:id', (req: Request, res: Response) => {
    const { message, from } = req.body;
    const { id } = req.params;

    const server = ChatServer.instance;
    server.io.in(id).emit('privateMessages', { from, message });
    res.json({ ok: true });
});

// Devuelve los identificadores de los usuarios conectados.
router.get('/users', (req: Request, res: Response) => {
    const server = ChatServer.instance;
    server.io.clients((err: any, clients: string[]) => {
        if (err) {
            return res.status(400).json({ ok: false, err });
        }
        res.json({ ok: true, clients });
    });
});

router.get('/users/detail', (req: Request, res: Response) => {
    res.json({ ok: true, users: connectedUsers.getUserList() });
});

export default router;