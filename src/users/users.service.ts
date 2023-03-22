import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo);
  }

  createOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
    const userInstance = this.userRepo.create({
      ...dto,
      tags: (dto.tags || []).map((id) => ({ id })),
    });

    return this.userRepo.save(userInstance);
  }

  async updateOne(req: CrudRequest, dto: DeepPartial<User>): Promise<any> {
    const id = req.parsed.paramsFilter.find((pf) => pf.field === 'id').value;
    const { tags, ...rest } = dto;
    if (Object.keys(rest).length) {
      await this.userRepo.update(id, rest);
    }

    try {
      if (tags?.length) {
        const values = tags.map((tagId) => ({ tagId, userId: id }));
        await this.userRepo
          .createQueryBuilder()
          .insert()
          .into('users_tags')
          .values(values)
          .orIgnore()
          .execute();
      }
    } catch (error) {
      console.log(error);
    }

    return 'update successfull';
  }
}
