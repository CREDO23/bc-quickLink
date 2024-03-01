import { generateUrlMaker } from '../helpers/maker';
import Link from '../models/link';
import User from '../models/user';
import * as httpError from 'http-errors';
import LinkValidation from '../validations/link';
import UserLinks from '../models/usersLinks';

class LinkService {
  static create = (
    data: { url: string },
    userId: string,
  ): Promise<Error | ILink> => {
    return new Promise<Error | ILink>(async (resolve, reject) => {
      try {
        const { url: longUrl } = data;

        await LinkValidation.create.validateAsync(data);

        const user = await User.findByPk(userId);

        if (!user) {
          throw httpError.NotFound('The user does not exist');
        }

        const url = await Link.findOne({ where: { long_form: longUrl } });

        if (url) {
          user.addLink(url);
          resolve(url);
        } else {
          const makers = (await Link.findAll({ attributes: ['maker'] })).map(
            (el) => el.maker,
          );

          let newMaker: string;

          do {
            newMaker = generateUrlMaker();
          } while (makers.includes(newMaker));

          const newLink = await user.createLink({
            long_form: longUrl,
            maker: newMaker,
          });

          resolve(newLink);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static getByUser = (userId: string): Promise<Error | {link : ILink}[]> => {
    return new Promise<Error | {link : ILink}[]>(async (resolve, reject) => {
      try {
        const user = await User.findByPk(userId);

        if (user) {
          const links = await UserLinks.findAll({
            include: {
              model: Link,
              as : 'link',
              attributes: ['long_form', 'maker', 'visit_times','id'],
            },
            where: { user_id: userId },
            attributes : []
          });

          resolve(links as unknown as {link : ILink}[]);
        } else {
          throw httpError.NotFound('The user does not exist');
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static delete = (linkId: string, userId: string): Promise<Error | string> => {
    return new Promise<Error | string>(async (resolve, reject) => {
      try {
        const user = await User.findByPk(userId);
        const link = await Link.findByPk(linkId);

        if (user && link) {
          const deleted = await UserLinks.destroy({
            where: { user_id: userId, link_id: linkId },
          });

          if(deleted){
            resolve(linkId);
          }

        } else {
          if (!user) {
            throw httpError.NotFound('The user does not exist');
          }

          if (!link) {
            throw httpError.NotFound('The link does not exist');
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default LinkService;
