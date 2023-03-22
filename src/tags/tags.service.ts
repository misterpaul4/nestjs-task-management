import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService extends TypeOrmCrudService<Tag> {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {
    super(tagRepo);
  }
}
