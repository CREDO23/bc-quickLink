import { hashPassword } from '../helpers/bcrypt';
import { signAccessToken } from '../helpers/jwt';
import User from '../models/user';
import UserValidation from '../validations/user';
import httpError from 'http-errors';


class AuthService {
  static signup = (user: IUser) =>
    new Promise<{
        user : User
        accessToken : string
    } | Error>(async (resolve, reject) => {
      try {
        const validatedUser = await UserValidation.create.validateAsync(user);

        // check if user already exists

        const exists = await User.findOne({
          where: { username: user.username },
        });

        if (exists) {
          throw httpError.Conflict('User with the same name already exists');
        }

        
        const newUser = await User.create({
            ...validatedUser,
            password: await hashPassword(user.password),
        });
        
        const accessToken = await signAccessToken({id : newUser.id }, process.env.ACCESS_TOKEN_SECRET)

        resolve({user :newUser, accessToken :accessToken});
      } catch (error) {
        reject(error);
      }
    });
}


export default AuthService