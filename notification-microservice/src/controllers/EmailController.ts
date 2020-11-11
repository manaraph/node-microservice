import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Notification } from '../entity/Notification';

class NotificationController {
  static listAll = async (req: Request, res: Response) => {
    // Get notification from database
    const notificationRepository = getRepository(Notification);
    const notification = await notificationRepository.find({
      select: ['id', 'custId', 'message', 'type'], // We dont want to send the passwords on response
    });

    // Send the notification object
    res.send(notification);
  };

  static getOneById = async (req: Request, res: Response) => {
    // Get the ID from the url
    const id: number = Number(req.params.id);

    // Get the notification from database
    const notificationRepository = getRepository(Notification);
    try {
      const notification = await notificationRepository.findOneOrFail(id, {
        select: ['id', 'custId', 'message', 'type'],
      });
    } catch (error) {
      res.status(404).send('Notification not found');
    }
  };

  static newNotification = async (req: Request, res: Response) => {
    // Get parameters from the body
    const { custId, message, type } = req.body;
    const notification = new Notification();
    notification.custId = custId;
    notification.message = message;
    notification.type = type;

    // Validade if the parameters are ok
    const errors = await validate(notification);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save. If fails, the username is already in use
    const notificationRepository = getRepository(Notification);
    try {
      await notificationRepository.save(notification);
    } catch (e) {
      res.status(409).send('An error occured');
      return;
    }

    // If all ok, send 201 response
    res.status(201).send('Notification created');
  };

  static editNotification = async (req: Request, res: Response) => {
    // Get the ID from the url
    const id = req.params.id;

    // Get values from the body
    const { custId, message, type } = req.body;

    // Try to find notification on database
    const notificationRepository = getRepository(Notification);
    let notification;
    try {
      notification = await notificationRepository.findOneOrFail(id);
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send('Notification not found');
      return;
    }

    // Validate the new values on model
    notification.custId = custId;
    notification.type = type;
    notification.message = message;
    const errors = await validate(notification);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to safe
    try {
      await notificationRepository.save(notification);
    } catch (e) {
      res.status(409).send('An error occured');
      return;
    }
    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteNotification = async (req: Request, res: Response) => {
    // Get the ID from the url
    const id = req.params.id;

    const notificationRepository = getRepository(Notification);
    let notification: Notification;
    try {
      notification = await notificationRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Notification not found');
      return;
    }
    notificationRepository.delete(id);

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default NotificationController;
