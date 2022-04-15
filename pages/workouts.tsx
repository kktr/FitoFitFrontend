import { TasksList } from './../components/TasksList';
import React, { useEffect, useState } from 'react';
import { IWorkout, IWorkoutsList } from '../interfaces/IWorkout';
import Image from 'next/image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { getTrainingWeekSummary } from '../helpers/getTrainingWeekSummary';
import { getWorkoutsChartData } from '../helpers/getWorkoutsChartData';
import Link from 'next/link';

export default function Workouts() {
  const [tasksList, setTasksList] = useState<IWorkoutsList | null>(null);
  const [motivationSentence, setMotivationSentence] = useState<string>(
    'Training is the key to success'
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('workoutsList')!);
    if (items) {
      setTasksList(items);
      console.log(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutsList', JSON.stringify(tasksList));
  }, [tasksList]);

  const getMotivationSentence = async () => {
    const BASE_URL = 'https://nodejs-quoteapp.herokuapp.com/quote';
    const CROSS_DOMAIN = 'https://kktrcorsproxy.herokuapp.com';
    const response = await fetch(`${CROSS_DOMAIN}/${BASE_URL}`);
    const data = await response.json();
    setMotivationSentence(data.quote);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMotivationSentence();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // ! TODO: implement EDITING someday
  // const editTaskInTasksList = (
  //   EditedWorkoutList: IWorkoutsList,
  //   replacedTask: IWorkout
  // ) => {
  //   return EditedWorkoutList.map((task) => {
  //     return task.id === replacedTask.id ? replacedTask : task;
  //   });
  // };

  const deleteTaskInTasksList = (
    EditedWorkoutList: IWorkoutsList,
    deletedTask: IWorkout
  ) => {
    return EditedWorkoutList.filter(
      (Task: { id: number }) => Task.id !== deletedTask.id
    );
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mt-2 p-4 text-blue-600/75 text-center">
        {tasksList && getTrainingWeekSummary(tasksList)}
      </div>

      <div className="mt-2 p-4 text-blue-600/75 text-center">
        <h2>Motivational sentence for nerds</h2>
        <p className="transition-all">{motivationSentence}</p>
      </div>

      <h2 className="font-medium leading-tight text-3xl mt-4 mb-2 text-blue-600">
        Your Activities
      </h2>

      <div className="flex w-full mb-8 ">
        <BarChart
          width={400}
          height={300}
          data={tasksList && getWorkoutsChartData(tasksList)}
          margin={{
            top: 20,
            right: 25,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="all" stackId="a" fill="#8884d8" />
          <Bar dataKey="general" stackId="a" fill="#7766cd" />
          <Bar dataKey="cardio" stackId="a" fill="#229dca" />
          <Bar dataKey="cycling" stackId="a" fill="#829dca" />
          <Bar dataKey="running" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>

      <TasksList
        tasksList={tasksList}
        setTasksList={setTasksList}
        deleteTaskInTasksList={deleteTaskInTasksList}
      />

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
