import { comparePassword, hashPassword } from '../helpers/bcrypt';
import { signAccessToken } from '../helpers/jwt';
import User from '../models/user';
import UserValidation from '../validations/user';
import * as httpError from 'http-errors';

class AuthService {
  static signup = (
    user: IUser,
  ): Promise<Error | { user: IUser; accessToken: string }> => {
    return new Promise<
      | {
          user: User;
          accessToken: string;
        }
      | Error
    >(async (resolve, reject) => {
      try {
        const validUser = await UserValidation.signup.validateAsync(user);

        // check if user already exists

        const exists = await User.findOne({
          where: { username: user.username },
        });

        if (exists) {
          throw httpError.Conflict('A user with the same name already exists');
        }

        const newUser = await User.create({
          ...validUser,
          password: await hashPassword(user.password),
        });

        const accessToken = await signAccessToken(
          { id: newUser.id },
          process.env.ACCESS_TOKEN_SECRET,
        );

        resolve({ user: newUser, accessToken: accessToken });
      } catch (error) {
        reject(error);
      }
    });
  };

  static signin = (userCredentials: {
    username: string;
    password: string;
  }): Promise<Error | { user: IUser; accessToken: string }> => {
    return new Promise<Error | { user: IUser; accessToken: string }>(
      async (resolve, reject) => {
        try {
          await UserValidation.signin.validateAsync(userCredentials);

          const { username, password } = userCredentials;

          const user = (await User.findOne({ where: { username} }));

          if (!user) {
            throw httpError.NotFound('Invalid username or passwordddd');
          }

          const isPasswordMatch = await comparePassword(password, user.password);

          if (!isPasswordMatch) {
            throw httpError.NotFound('Invalid username or password');
          }

          const accessToken = await signAccessToken(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
          );

          resolve({ user, accessToken });
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}

export default AuthService;
