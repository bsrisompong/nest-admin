import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(page = 1, take = 5, relations = []): Promise<any> {
    const { data, meta } = await super.paginate(page, take, relations);

    return {
      data: data.map((user) => {
        delete user.password;
        return user;
      }),
      meta,
    };
  }
}
