import { IWorkoutsList } from '../interfaces/IWorkout';
import { sortWorkoutsByDate } from './sortWorkoutsByDate';

export const getWorkoutsWeekSummary = (tasksList: IWorkoutsList) => {
  const trainingLevels = [
    'a Coach potato',
    'a Beginner',
    'a Intermediate',
    'a Advanced',
    'a National Champion',
    'a Sport Legend',
    'a Arnold Schwarzenegger',
    'a Russian Athlete',
  ];

  const trainingMessage = [
    'move Your FAT ASS!',
    'try more cardio, more running, more cycling!',
    "if you don't train harder, You will not succeed",
    "you're doing great!",
    'nice work, keep pushing!',
    'your ass will be smaller!',
    'you are on a way to die! Slow down, leave some power for next week!',
    "if You don't take drugs, maybe it's too much",
  ];
  const workoutsSortedByDates = sortWorkoutsByDate(tasksList);
  const workoutsNumberLastWeek = workoutsSortedByDates.weekSummary;
  const workoutsNumbersPreviousWeek = workoutsSortedByDates.previousWeekSummary;

  const workout = workoutsNumberLastWeek > 1 ? ' workouts' : ' workout';
  const baseSentence = `In the last 7 days You did ${workoutsNumberLastWeek} ${workout}! You train like `;
  const endSentence = `You did ${
    workoutsNumberLastWeek == workoutsNumbersPreviousWeek
      ? 'the same number of workouts like last week'
      : workoutsNumberLastWeek > workoutsNumbersPreviousWeek
      ? ' more workouts than last week'
      : 'less workouts than last week'
  }`;
  return workoutsNumberLastWeek < 7
    ? `${baseSentence} ${trainingLevels[workoutsNumberLastWeek]} ${trainingMessage[workoutsNumberLastWeek]} ${endSentence}`
    : `${baseSentence} ${trainingLevels[7]} ${trainingMessage[7]} ${endSentence}`;
};
