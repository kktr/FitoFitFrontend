import moment from 'moment';
import { IWorkoutsList } from './IWorkout';

export interface IWorkoutsContext {
  workoutsList: IWorkoutsList;
  setWorkoutsList: (workouts: IWorkoutsList) => void;
}
const date = moment();

const arrayOfDays = [
  [date, date, date],
  [date, date],
  [date],
  [date],
  [date],
  [date],
  [date],
  [date, date, date, date, date],
  [date, date, date, date, date],
  [date],
];

const getNumberOfWorkouts = (givenArray: any[], from: number, to: number) => {
  let countWorkouts = 0;

  // for checking only needed part of array
  const arrayToCount = givenArray.slice(from, to + 1);

  arrayToCount.forEach((day, index) => {
    if (index >= from - to) {
      countWorkouts += day.length;
    }
  });

  return countWorkouts;
};

// today return 3
console.log(getNumberOfWorkouts(arrayOfDays, 0, 0));
// current week return 10
console.log(getNumberOfWorkouts(arrayOfDays, 0, 6));
// 7 days ago return 5
console.log(getNumberOfWorkouts(arrayOfDays, 7, 7));
// previous week return 11
console.log(getNumberOfWorkouts(arrayOfDays, 7, 13));
