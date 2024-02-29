import { generateUrlMaker } from '../helpers/maker';
import Link from '../models/link';
import User from '../models/user';
import * as httpError from 'http-errors';
import LinkValidation from '../validations/link';
import UserLinks from '../models/usersLinks';

class LinkService {
  static shorten = (
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
          resolve(url)
        } else {
          // const userLinks = await UserLinks.findAll({
          //   include: {
          //     model: Link,
          //     attributes: ['long_form'],
          //   },
          //   where: { user_id: userId },
          // });

          // console.log(userLinks)

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
}

export default LinkService;
