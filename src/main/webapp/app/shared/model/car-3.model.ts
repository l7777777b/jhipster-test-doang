import { IDriver2 } from 'app/shared/model/driver-2.model';

export interface ICar3 {
  id?: number;
  drivers?: IDriver2[];
}

export const defaultValue: Readonly<ICar3> = {};
