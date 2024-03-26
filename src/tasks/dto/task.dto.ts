import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class TaskStatusDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be either "pending" or "completed"',
  })
  status?: TaskStatus;
}
