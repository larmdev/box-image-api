import { Router, Request, Response } from 'express';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { Auth } from '../../services/auth.service.js';

const router = Router();

router.get('/me',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            const result: any = req.context?.user;
            return res.json(result)
        } catch (error) {
            return res.json(error)
        }
    });

router.post('/sing-in', async (req: Request, res: Response) => {
    try {
        const user: any = req.context?.user;
        const username: string = req.body.username;
        const password: string = req.body.password;

        const result = await Auth.login(username, password);
        return res.json(result)
    } catch (error: any) {
        return res.status(error.status).json(error)
    }
});

router.post('/sing-up', async (req: Request, res: Response) => {
    try {
        const data: any = req.body;
        const result = await Auth.createUser(data);
        return res.json(result)
    } catch (error: any) {
        return res.status(error.status).json(error)
    }
});

router.post('/sing-out', async (req: Request, res: Response) => {
    try {
        // const user: any = req.context?.user;
        return res.json('user')
    } catch (error) {
        return res.json(error)
    }
});

export default router;

