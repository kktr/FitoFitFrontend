import moment from 'moment';
import { IWorkoutsList } from './IWorkout';

export interface IWorkoutsContext {
  workoutsList: IWorkoutsList;
  setWorkoutsList: (workouts: IWorkoutsList) => void;
}
