import { Router } from 'express';
import EmailController from '../controllers/EmailController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// Get all users
router.get('/', [checkJwt, checkRole(['ADMIN'])], EmailController.listAll);

// Get one user
router.get(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  EmailController.getOneById
);

// Create a new user
router.post(
  '/',
  [checkJwt, checkRole(['ADMIN'])],
  EmailController.newNotification
);

// Edit one user
router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  EmailController.editNotification
);

// Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  EmailController.deleteNotification
);

export default router;
