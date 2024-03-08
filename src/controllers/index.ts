import { NextFunction, Request, Response } from 'express';
import Link from '../models/link';

export const redirect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { maker } = req.params;

    const link = await Link.findOne({ where: { maker } });

    link.visit_times = link.visit_times + 1;

    link.save();

    res.redirect(link.long_form);
  } catch (error) {
    next(error);
  }
};
