import React, { createContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { IWorkoutsList } from '../interfaces/IWorkout';
import { IWorkoutsContext } from '../interfaces/IWorkoutsContext';
import { WorkoutsWeekSummary } from '../components/WorkoutsWeekSummary';
import { WorkoutsBarChart } from '../components/WorkoutsBarChart';
import { WorkoutsList } from './../components/WorkoutsList';
import { getMotivationSentence } from '../helpers/getMotivationSentence';

export const WorkoutsContext = createContext<IWorkoutsContext | null>(null);

export default function Workouts() {
  const [workoutsList, setWorkoutsList] = useState<IWorkoutsList | null>(null);
  const [motivationSentence, setMotivationSentence] = useState<string>(
    'Training is the key to success'
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('workoutsList')!);
    if (items) {
      setWorkoutsList(items);
      console.log(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutsList', JSON.stringify(workoutsList));
  }, [workoutsList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMotivationSentence().then((quote) => {
        setMotivationSentence(quote);
      });
    }, 10_000);

    return () => clearInterval(intervalId);
  }, []);

  // ! TODO: implement EDITING someday
  // const editTaskInworkoutsList = (
  //   EditedWorkoutList: IWorkoutsList,
  //   replacedTask: IWorkout
  // ) => {
  //   return EditedWorkoutList.map((task) => {
  //     return task.id === replacedTask.id ? replacedTask : task;
  //   });
  // };

  return (
    <div className="flex flex-col w-full items-center">
      <p id="DUPA">{process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>

      <h2 className="mt-2 p-4 text-blue-600/75 text-center">
        Motivational sentence for nerds
      </h2>

      <p className="transition-all">{motivationSentence}</p>

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

      {/* ! IMPLEMENT SORTING */}
      {/* <button
        id="buttonTypeDisplayAll"
        className={`button button_type-display button_type-display--all`}
        onClick={() => {
          setTasksTypeToDisplay(TasksType.All);
        }}
      >
        ALL
      </button>

      <button
        id="buttonTypeDisplayTodo"
        className={`button button_type-display button_type-display--todo`}
        onClick={() => {
          setTasksTypeToDisplay(TasksType.Uncompleted);
        }}
      >
        TODO
      </button>

      <button
        id="buttonTypeDisplayDone"
        className={`button button_type-display button_type-display--done`}
        onClick={() => {
          setTasksTypeToDisplay(TasksType.Completed);
        }}
      >
        DONE
      </button> */}
    </div>
  );
}
