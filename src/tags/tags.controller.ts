import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Tag } from './entities/tag.entity';

@Crud({
  model: {
    type: Tag,
  },
  dto: { create: CreateTagDto, update: UpdateTagDto },
  params: {
    id: {
      primary: true,
      type: 'uuid',
      field: 'id',
    },
  },
})
@Controller('tags')
export class TagsController implements CrudController<Tag> {
  constructor(public service: TagsService) {}
}
