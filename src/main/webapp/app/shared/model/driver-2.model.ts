import { ICar3 } from 'app/shared/model/car-3.model';

export interface IDriver2 {
  id?: number;
  cars?: ICar3[];
}

export const defaultValue: Readonly<IDriver2> = {};
