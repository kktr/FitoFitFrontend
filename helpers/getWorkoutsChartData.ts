import { IWorkoutsList } from '../interfaces/IWorkout';
import { IGetWorkoutsChartData } from '../interfaces/IGetWorkoutsChartData';

export function getWorkoutsChartData(
  tasksList: IWorkoutsList
): IGetWorkoutsChartData {
  const groupedWorkouts: IGetWorkoutsChartData = [
    {
      name: 'All',
      running: 0,
      cycling: 0,
      cardio: 0,
      general: 0,
    },
    {
      name: 'General',
      general: 0,
    },
    {
      name: 'Cardio',
      cardio: 0,
    },
    {
      name: 'Cycling',
      cycling: 0,
    },
    {
      name: 'Running',
      running: 0,
    },
  ];

  tasksList.forEach((workout) => {
    if (workout.type === 'General') {
      groupedWorkouts[0].general++;
      groupedWorkouts[1].general++;
    } else if (workout.type === 'Cardio') {
      groupedWorkouts[0].cardio++;
      groupedWorkouts[2].cardio++;
    } else if (workout.type === 'Cycling') {
      groupedWorkouts[0].cycling++;
      groupedWorkouts[3].cycling++;
    } else if (workout.type === 'Running') {
      groupedWorkouts[0].running++;
      groupedWorkouts[4].running++;
    }
  });

  return groupedWorkouts;
}
