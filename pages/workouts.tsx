import React, { createContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { IMotivationSentenceContext } from '../interfaces/IMotivationSentenceContext';
import { IWorkoutsList } from '../interfaces/IWorkout';
import { IWorkoutsContext } from '../interfaces/IWorkoutsContext';
import { MotivationSentence } from '../components/MotivationSentence';
import { WorkoutsWeekSummary } from '../components/WorkoutsWeekSummary';
import { WorkoutsBarChart } from '../components/WorkoutsBarChart';
import { WorkoutsList } from './../components/WorkoutsList';
import { getMotivationSentence } from '../helpers/getMotivationSentence';
import { WorkoutsApi } from '../dtos/WorkoutsApi';

export const WorkoutsContext = createContext<IWorkoutsContext | null>(null);
export const MotivationSentenceContext =
  createContext<IMotivationSentenceContext>({ getMotivationSentence });

export default function Workouts() {
  const [workoutsList, setWorkoutsList] = useState<IWorkoutsList | null>(null);

  useEffect(() => {
    WorkoutsApi.list().then((workouts) => setWorkoutsList(workouts));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-m m-auto">
      <p id="DUPA">{process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>

      <MotivationSentence />

      {workoutsList && (
        <main>
          <WorkoutsContext.Provider value={{ workoutsList, setWorkoutsList }}>
            <WorkoutsWeekSummary />

            <WorkoutsBarChart />

            <WorkoutsList />
          </WorkoutsContext.Provider>
        </main>
      )}
      <Link
        href={{
          pathname: '/addworkout',
        }}
      >
        <a
          className={
            'mb-20 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          }
        >
          Add workout
        </a>
      </Link>
    </div>
  );
}
