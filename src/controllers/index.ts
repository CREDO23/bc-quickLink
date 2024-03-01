import { NextFunction , Request, Response} from "express";
import Link from "../models/link";

export const redirect = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { maker } = req.params;

      const {long_form} = await Link.findOne({where : {maker}})

      res.redirect(long_form)
    } catch (error) {
      next(error);
    }
  };



