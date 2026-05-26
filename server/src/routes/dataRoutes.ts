import { Router } from 'express';
import { fetchInitialData, createTask, completeTask, failTask, recoverTask } from '../controllers/dataController';

const router = Router();

router.get('/', fetchInitialData);
router.post('/tasks', createTask);
router.patch('/tasks/:id/complete', completeTask);
router.patch('/tasks/:id/fail', failTask);
router.patch('/tasks/:id/recover', recoverTask);

export default router;
