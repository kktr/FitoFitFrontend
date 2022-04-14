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

  workoutsLastWeekSummary.weekSummary = tasksList.length;

  tasksList.forEach((workout: IWorkout) => {
    if (today.diff(workout.data, 'days') <= 7) {
      workoutsLastWeekSummary.weekSummary++;
    }
    if (today.diff(workout.data, 'days') <= 14) {
      workoutsLastWeekSummary.previousWeekSummary++;
    }
    if (today.diff(workout.data, 'days') === 0) {
      workoutsLastWeekSummary.today++;
    } else if (today.diff(workout.data, 'days') === 1) {
      workoutsLastWeekSummary.yesterday++;
    } else if (today.diff(workout.data, 'days') === 2) {
      workoutsLastWeekSummary.twoDaysAgo++;
    } else if (today.diff(workout.data, 'days') === 3) {
      workoutsLastWeekSummary.threeDaysAgo++;
    } else if (today.diff(workout.data, 'days') === 4) {
      workoutsLastWeekSummary.fourDaysAgo++;
    } else if (today.diff(workout.data, 'days') === 5) {
      workoutsLastWeekSummary.fiveDaysAgo++;
    } else if (today.diff(workout.data, 'days') === 6) {
      workoutsLastWeekSummary.sixDaysAgo++;
    } else if (today.diff(workout.data, 'days') === 7) {
      workoutsLastWeekSummary.sevenDaysAgo++;
    }
  });
  return workoutsLastWeekSummary;
};
