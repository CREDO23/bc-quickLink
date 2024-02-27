import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';

class AuthControllers {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newUser = await AuthService.signup(req.body);

      res.json(<IClientResponse>{
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthControllers;
