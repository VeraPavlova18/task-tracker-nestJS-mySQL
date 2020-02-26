import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { SignInCredentialsDto } from './dto/signIn-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      password,
    } = authCredentialsDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.birthday = birthday;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<string> {
    const { email, password } = signInCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

}
