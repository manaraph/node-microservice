import { Router, Request, Response } from 'express';
import notification from './notification';

const routes = Router();

routes.use('/notifications', notification);

export default routes;
