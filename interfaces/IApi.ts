import { IWorkoutsList } from './IWorkout';

export interface IApi {
  getTasksList(): Promise<IGetWorkoutsListResponse>;
}

export interface IGetWorkoutsListResponse {
  workoutsList: IWorkoutsList;
}
