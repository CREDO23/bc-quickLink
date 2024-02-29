import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';

class AuthControllers {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newUser = await AuthService.create(req.body);

      res.json(<IClientResponse>{
        message: 'User created successfully',
        data: newUser,
        success : true,
        error : null
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthControllers;
