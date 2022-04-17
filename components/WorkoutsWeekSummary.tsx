import React, { useContext } from 'react';
import { WorkoutsContext } from '@pages/workouts';
import { IWorkoutsContext } from '@interfaces/IWorkoutsContext';
import { getWorkoutsWeekSummary } from '../helpers/getWorkoutsWeekSummary';

export function WorkoutsWeekSummary() {
  const { workoutsList } = useContext(WorkoutsContext) as IWorkoutsContext;

  return (
    <h2 className="mt-2 p-4 text-blue-600/75 text-center">
      {getWorkoutsWeekSummary(workoutsList)}
    </h2>
  );
}
