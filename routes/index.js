import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '/template/index.html')));


export default router;
