import { Request, Response, NextFunction } from 'express';
import LinkService from '../services/link';

class LinkControllers {
  static create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.auth;

      const newLink = (await LinkService.create(
        req.body,
        id,
      )) as unknown as ILink;

      const shortUrl =
        req.protocol + '://' + req.get('host') + '/' + newLink.maker;

      res.json(<IClientResponse>{
        message: 'The URL has been shortened successfully',
        data: {
          link: newLink,
          shortUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id: userId } = req.auth
      const { id: linkId } = req.params;

      const result = await LinkService.delete(linkId, userId);

      res.json(<IClientResponse>{
        message: 'Link deleted successfully',
        data: result,
        error: null,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default LinkControllers;
