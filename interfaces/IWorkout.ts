import { IWorkoutsType } from 'dtos/workout';

export type IWorkoutsList = IWorkout[];
export interface IWorkout {
  id: number;
  title?: string;
  duration?: number;
  data?: any;
  type?: IWorkoutsType;
  description?: string;
}
