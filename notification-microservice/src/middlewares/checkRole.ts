import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the notification ID from previous midleware
    const role = res.locals.jwtPayload.role;

    console.log(role);
    
    //Check if array of authorized roles includes the notification's role
    if (roles.indexOf(role) > -1) next();
    else res.status(401).send();
  };
};
