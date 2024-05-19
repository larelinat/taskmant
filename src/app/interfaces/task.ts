import { Priority } from './priority';
import { Status } from './status';
import { Person } from './person';

export interface ITask {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  priority: Priority;
  status: Status;
  performers: Person[];
}

export interface ITaskCreateData extends Omit<ITask, 'id'> {}

export interface ITaskUpdateData extends Partial<ITask> {}
