import { Router, Request, Response } from 'express';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { Image } from '../../services/image.service.js'
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() })

const router = Router();

router.get('/',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            const userId: string = req.context?.userId;
            const imageId: any = req.query.imageId;

            const size: any = req.query.size || 50;
            const page: any = req.query.page;
            const result = await Image.getImage(
                userId,
                imageId,  
                size,
                page,
            )
            return res.json(result)
        } catch (error) {
            return res.json(error)
        }
    });

router.post('/',
    verifyToken,
    upload.single('file'),
    async (req: Request, res: Response) => {
        try {
            const userId: any = req.context?.userId;
            const file: any = req.file;
            const result = await Image.uploadImage(userId, file);
            return res.json(result)
        } catch (error: any) {
            return res.status(error.status).json(error)
        }
    });



export default router;

