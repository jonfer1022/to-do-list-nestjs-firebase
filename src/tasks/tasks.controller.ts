import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto, TaskStatusDto } from './dto';
import { RequestAuth } from 'src/common/types';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(@Req() req: RequestAuth, @Body() dto: TaskDto) {
    return await this.tasksService.createTask(dto, req.user.uid);
  }

  @Get()
  async getTasks(@Req() req: RequestAuth, @Query() query: TaskStatusDto) {
    return await this.tasksService.getTasks(
      req.user.uid,
      query?.status || null,
    );
  }

  @Put('/:taskId')
  async updateTask(
    @Req() req: RequestAuth,
    @Body() dto: TaskDto,
    @Param('taskId') taskId: string,
  ) {
    return await this.tasksService.updateTask(dto, req.user.uid, taskId);
  }

  @Delete('/:taskId')
  async deleteTask(@Req() req: RequestAuth, @Param('taskId') taskId: string) {
    return await this.tasksService.deleteTask(req.user.uid, taskId);
  }
}
