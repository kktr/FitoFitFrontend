import React, { useEffect, useState } from 'react';
import {
  IWorkout,
  IWorkoutsList,
  mockWorkoutsList,
} from '../interfaces/IWorkout';
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

export default function Workouts() {
  const [tasksList, setTasksList] = useState<IWorkoutsList | null>(
    mockWorkoutsList
  );
  const [hightestId, setHightestId] = useState<number>(0);
  const [motivationSentence, setMotivationSentence] = useState<string>(
    'Training is the key to success'
  );

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

  const editTaskInTasksList = (
    EditedWorkoutList: IWorkoutsList,
    replacedTask: IWorkout
  ) => {
    return EditedWorkoutList.map((task) => {
      return task.id === replacedTask.id ? replacedTask : task;
    });
  };

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
        {getTrainingWeekSummary(tasksList)}
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
          data={getWorkoutsChartData(tasksList)}
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

      <ul id="tasksList" className="flex flex-col items-center w-full px-4">
        {tasksList &&
          tasksList.map((workout, index) => {
            // if (
            //   workoutsTypeToDisplay === workoutsType.Completed &&
            //   workout.status === StatusType.Active
            // )
            //   return;
            // if (
            //   workoutsTypeToDisplay === workoutsType.Uncompleted &&
            //   workout.status === StatusType.Completed
            // )
            //   return;
            return (
              <li
                className={`workout workout--${workout.id} flex flex-col p-4 w-full border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8 mb-4`}
                key={`workout workout--${workout.id}`}
              >
                <div>
                  {/* <div>
                    {new Date(workout.data).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div> */}
                  <div className="flex justify-between ">
                    <div className="flex">
                      <div className=" w-6 mr-2">
                        <Image
                          alt="running icon"
                          src={`/../public/${workout.type}.png`}
                          objectFit="cover"
                          width={128}
                          height={128}
                        ></Image>
                      </div>
                      <div className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
                        {workout.type}
                      </div>
                    </div>

                    <div
                      className={`workout_type workout_type--${workout.type} font-medium leading-tight text-xs mt-0 mb-2 text-gray-500`}
                    >
                      {new Date(workout.data).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <div>{workout.title}</div>
                    <div>{workout.duration} minutes</div>
                  </div>

                  <div>{workout.description}</div>
                </div>

                <div
                  className={`workout_control-panel workout_control-panel--${workout.id} flex justify-end `}
                >
                  <button
                    id="buttonTaskDelete"
                    className={`button button_task button_task--delete inline-block px-3 py-2 bg-red-500 text-white font-medium text-xs leading-snug uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`}
                    onClick={() => {
                      setTasksList(
                        deleteTaskInTasksList(tasksList, tasksList[index])
                      );
                    }}
                  >
                    delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>

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
