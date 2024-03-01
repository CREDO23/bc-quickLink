import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';

class AuthControllers {
  static signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser = await AuthService.create(req.body);

      res.json(<IClientResponse>{
        message: 'User created successfully',
        data: newUser,
        success: true,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  static signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await AuthService.signin(req.body);

      res.json(<IClientResponse>{
        message: `Logged in successfully`,
        data: result,
        error: null,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthControllers;
