import { Router } from 'express';
import { generateTasksFromDump } from '../controllers/aiController';

const router = Router();

router.post('/braindump', generateTasksFromDump);

export default router;
