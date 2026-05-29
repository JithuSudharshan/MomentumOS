import { Router } from 'express';
import { generateTasksFromDump, generateSanctuaryResponse } from '../controllers/aiController';

const router = Router();

router.post('/braindump', generateTasksFromDump);
router.post('/sanctuary', generateSanctuaryResponse);

export default router;
