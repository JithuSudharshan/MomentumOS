import { Router } from 'express';
import { fetchInitialData, createTask, completeTask, failTask, recoverTask, claimBadge } from '../controllers/dataController';

const router = Router();

router.get('/', fetchInitialData);
router.post('/tasks', createTask);
router.patch('/tasks/:id/complete', completeTask);
router.patch('/tasks/:id/fail', failTask);
router.patch('/tasks/:id/recover', recoverTask);
router.post('/badges/:id/claim', claimBadge);

export default router;
