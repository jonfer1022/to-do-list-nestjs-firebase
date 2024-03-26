import { BadRequestException, Injectable } from '@nestjs/common';
import { Firebase } from 'src/common/firebase.setup';
import {
  get,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  update,
  remove,
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from './dto';

@Injectable()
export class TasksService {
  private firebase: Firebase;

  constructor() {
    this.firebase = new Firebase();
  }

  async createTask(task: TaskDto, uid: string) {
    try {
      const newTask = {
        ...task,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const db = this.firebase.getDatabase();
      const reference = ref(db, `tasks/${uid}/${uuidv4()}`);
      await set(reference, newTask);
    } catch (error) {
      console.log('-----> ~ TasksService ~ createTask ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async getTasks(uid: string, status?: string) {
    try {
      if (status) return await this.getTaskByStatus(uid, status);
      else return await this.getAllTasksByUserUid(uid);
    } catch (error) {
      console.log(
        '-----> ~ TasksService ~ getAllTasksByUserUid ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getAllTasksByUserUid(uid: string) {
    try {
      const db = this.firebase.getDatabase();
      const reference = ref(db, `tasks/${uid}`);
      const tasks = await get(reference).then((snapshot) => snapshot.val());
      const taskArray = tasks
        ? Object.entries(tasks).sort(
            (
              a: [string, TaskDto & { updatedAt: number }],
              b: [string, TaskDto & { updatedAt: number }],
            ) => b[1].updatedAt - a[1].updatedAt,
          )
        : [];

      return taskArray.map(
        (
          item: [string, TaskDto & { updatedAt: number }],
        ): TaskDto & { id: string } => {
          const childObject = item[1];
          return {
            ...childObject,
            id: item[0],
          };
        },
      );
    } catch (error) {
      console.log(
        '-----> ~ TasksService ~ getAllTasksByUserUid ~ error:',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getTaskByStatus(uid: string, status: string) {
    try {
      const db = this.firebase.getDatabase();
      const reference = ref(db, `tasks/${uid}`);
      const tasksQuery = query(
        reference,
        orderByChild('status'),
        equalTo(status),
      );
      const filterTasks = await get(query(tasksQuery)).then((snapshot) => {
        const tasks = snapshot.val();
        const taskArray = tasks
          ? Object.entries(tasks).sort(
              (
                a: [string, TaskDto & { updatedAt: number }],
                b: [string, TaskDto & { updatedAt: number }],
              ) => b[1].updatedAt - a[1].updatedAt,
            )
          : [];
        return taskArray.map(
          (
            item: [string, TaskDto & { updatedAt: number }],
          ): TaskDto & { id: string } => {
            const childObject = item[1];
            return {
              ...childObject,
              id: item[0],
            };
          },
        );
      });
      return filterTasks;
    } catch (error) {
      console.log('-----> ~ TasksService ~ getTaskByStatus ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async updateTask(task: TaskDto, uid: string, taskId: string) {
    try {
      const taskToUpdate = {
        ...task,
        updatedAt: Date.now(),
      };
      const db = this.firebase.getDatabase();
      const reference = ref(db, `tasks/${uid}/${taskId}`);
      await update(reference, taskToUpdate);
    } catch (error) {
      console.log('-----> ~ TasksService ~ updateTask ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(uid: string, taskId: string) {
    try {
      const db = this.firebase.getDatabase();
      const reference = ref(db, `tasks/${uid}/${taskId}`);
      await remove(reference);
    } catch (error) {
      console.log('-----> ~ TasksService ~ deleteTask ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }
}
