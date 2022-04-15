import { IWorkout, IWorkoutsList } from '../interfaces/IWorkout';
import moment from 'moment';
import { ISortWorkoutsByDate } from '../interfaces/ISortWorkoutsByDate';

export const sortWorkoutsByDate = (
  tasksList: IWorkoutsList
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

  const today = moment(moment().format('YYYY-MM-DD'));
  const daysDifference = (workout: IWorkout) => {
    return today.diff(workout.data, 'days');
  };

  for (const workout of tasksList) {
    if (daysDifference(workout) > 14) {
      break;
    }
    daysDifference(workout) <= 7
      ? workoutsLastWeekSummary.weekSummary++
      : workoutsLastWeekSummary.previousWeekSummary++;

    switch (daysDifference(workout)) {
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
  return workoutsLastWeekSummary;
};
