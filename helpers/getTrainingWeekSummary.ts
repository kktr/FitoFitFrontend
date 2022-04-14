import { IWorkoutsList } from '../interfaces/IWorkout';
import { sortWorkoutsByDate } from './sortWorkoutsByDate';

export const getTrainingWeekSummary = (tasksList: IWorkoutsList) => {
  const trainingLevels = [
    'a Coach potato',
    'a Beginner',
    'a Intermediate',
    'a Advanced',
    'a National Champion',
    'a Sport Legend',
    'a Arnold Schwarzenegger',
  ];

  const trainingMessage = [
    'move Your FAT ASS!',
    'try more cardio, more running, more cycling!',
    'if you not try harder, You will not succeed',
    "you're doing great!",
    'nice work, keep pushing!',
    'your ass will be smaller!',
    'you are on a way to die! Slow down, leave some power for next week!',
    "if You don't take drugs, maybe it's too much",
  ];

  const weekSummary = sortWorkoutsByDate(tasksList).weekSummary;
  const workout = weekSummary > 1 ? ' workouts' : ' workout';
  return weekSummary <= 8
    ? `In the last 7 days You made ${weekSummary} ${workout}! You train like ${trainingLevels[weekSummary]} ${trainingMessage[weekSummary]}`
    : `In the last 7 days You made ${weekSummary} ${workout}! You train like ${trainingLevels[7]} ${trainingMessage[7]}`;
};
