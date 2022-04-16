import { IWorkoutsList, IWorkout } from './IWorkout';

export interface ITasksListProps {
  tasksList: IWorkoutsList;
  setTasksList: (workouts: IWorkoutsList) => void;
}
