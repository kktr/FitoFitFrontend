import { IWorkoutsList } from '../interfaces/IWorkout';
import moment from 'moment';
import { ISortWorkoutsByDate } from '../interfaces/ISortWorkoutsByDate';

export const sortWorkoutsByDate = (
  workoutList: IWorkoutsList
): ISortWorkoutsByDate => {
  const workoutsLastWeekSummary: ISortWorkoutsByDate = {
    weekSummary: 0,
    previousWeekSummary: 0,
    today: 0,
    yesterday: 0,
    twoDaysAgo: 0,
    threeDaysAgo: 0,
    fourDaysAgo: 0,
    fiveDaysAgo: 0,
    sixDaysAgo: 0,
    sevenDaysAgo: 0,
  };

  const getDaysDifference = (date: string) => {
    const today = moment();
    return today.diff(moment(date), 'days');
  };

  for (const workout of workoutList) {
    const daysDifference = getDaysDifference(workout.data);

    if (daysDifference > 14) {
      break;
    }
    daysDifference <= 7
      ? workoutsLastWeekSummary.weekSummary++
      : workoutsLastWeekSummary.previousWeekSummary++;

    switch (daysDifference) {
      case 0:
        workoutsLastWeekSummary.today++;
        break;
      case 1:
        workoutsLastWeekSummary.yesterday++;
        break;
      case 2:
        workoutsLastWeekSummary.twoDaysAgo++;
        break;
      case 3:
        workoutsLastWeekSummary.threeDaysAgo++;
        break;
      case 4:
        workoutsLastWeekSummary.fourDaysAgo++;
        break;
      case 5:
        workoutsLastWeekSummary.fiveDaysAgo++;
        break;
      case 6:
        workoutsLastWeekSummary.sixDaysAgo++;
        break;
      case 7:
        workoutsLastWeekSummary.sevenDaysAgo++;
        break;
    }
  }

  console.log(workoutsLastWeekSummary.weekSummary);

  return workoutsLastWeekSummary;
};

// TODO - idea how sortWorkoutsByDate

const dateData = moment();

const arrayOfDays = [
  [dateData, dateData, dateData],
  [dateData, dateData],
  [dateData],
  [dateData],
  [dateData],
  [dateData],
  [dateData],
  [dateData, dateData, dateData, dateData, dateData],
  [dateData, dateData, dateData, dateData, dateData],
  [dateData],
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
