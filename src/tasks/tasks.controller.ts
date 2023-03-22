import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Task } from './entities/task.entity';

@Crud({
  model: {
    type: Task,
  },
  dto: { create: CreateTaskDto, update: UpdateTaskDto },
  params: {
    id: {
      primary: true,
      type: 'uuid',
      field: 'id',
    },
  },
})
@Controller('tasks')
export class TasksController implements CrudController<Task> {
  constructor(public service: TasksService) {}
}
