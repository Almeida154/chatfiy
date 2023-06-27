import { ERROR } from '../constants';
import { ErrorHandler } from '../models';
import { UserRepository } from '../repositories';

interface ICreate {
  email: string;
}

class UserService {
  create = async ({ email }: ICreate) => {
    const userExists = await UserRepository.findOne({ where: { email } });

    if (userExists)
      throw new ErrorHandler('User already exists', ERROR.DUPLICATE_FOUND);

    const user = UserRepository.create({ email });
    await UserRepository.save(user);

    return user;
  };
}

export default new UserService();
