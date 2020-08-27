import { TaskMode } from 'app/shared/model/enumerations/task-mode.model';

export interface IUser1 {
  id?: number;
  taskMode?: TaskMode;
  value?: number;
  referralId?: number;
}

export const defaultValue: Readonly<IUser1> = {};
