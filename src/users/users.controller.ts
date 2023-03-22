import { Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { HttpExceptionFilter } from 'src/lib/filters/http-exception.filter';

@Crud({
  model: {
    type: User,
  },
  dto: { create: CreateUserDto, update: UpdateUserDto },
  params: {
    id: {
      primary: true,
      type: 'uuid',
      field: 'id',
    },
  },
  query: {
    join: {
      tasks: {
        eager: false,
      },
      tags: {
        eager: false,
      },
    },
    exclude: ['password'],
  },
})
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
