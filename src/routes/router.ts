import { Router, Request, Response } from 'express';
import ChatServer from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Todo está bien'
    });
});

router.post('/messages', async (req: Request, res: Response) => {
    const { message, from } = req.body;
    await ChatServer.instance.io.emit('messages', { from, message });
    res.json({ ok: true });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const { message, from } = req.body;
    const { id } = req.params;

    const server = ChatServer.instance;
    server.io.in(id).emit('privateMessages', { from, message });
    res.json({ ok: true });
});

export default router;