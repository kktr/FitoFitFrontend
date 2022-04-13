import React, { useState } from 'react';
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

function groupWorkouts(tasksList: IWorkoutsList): IGroupWorkouts {
  const groupedWorkouts: IGroupWorkouts = [
    {
      name: 'All',
      running: 0,
      cycling: 0,
      cardio: 0,
      general: 0,
    },
    {
      name: 'General',
      general: 0,
    },
    {
      name: 'Cardio',
      cardio: 0,
    },
    {
      name: 'Cycling',
      cycling: 0,
    },
    {
      name: 'Running',
      running: 0,
    },
  ];

  tasksList.forEach((workout) => {
    if (workout.type === 'General') {
      groupedWorkouts[0].general++;
      groupedWorkouts[1].general++;
    } else if (workout.type === 'Cardio') {
      groupedWorkouts[0].cardio++;
      groupedWorkouts[2].cardio++;
    } else if (workout.type === 'Cycling') {
      groupedWorkouts[0].cycling++;
      groupedWorkouts[3].cycling++;
    } else if (workout.type === 'Running') {
      groupedWorkouts[0].running++;
      groupedWorkouts[4].running++;
    }
  });

  return groupedWorkouts;
}

export default function Workouts() {
  const [tasksList, setTasksList] = useState<IWorkoutsList | null>([
    {
      id: 1,
      title: 'Workout 1',
      duration: 60,
      type: 'Cycling',
      data: '2020-05-01',
    },
    {
      id: 2,
      title: 'Workout 2',
      duration: 60,
      type: 'Running',
      data: '2020-05-01',
    },
    {
      id: 3,
      title: 'Workout 3',
      duration: 60,
      type: 'Cycling',
      data: '2020-05-01',
    },
    {
      id: 4,
      title: 'Workout 4',
      duration: 60,
      type: 'General',
      data: '2020-05-01',
    },
    {
      id: 5,
      title: 'Workout 4',
      duration: 60,
      type: 'Cardio',
      data: '2020-05-01',
    },
  ]);
  const [hightestId, setHightestId] = useState<number>(0);

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
      <h2 className="font-medium leading-tight text-3xl mt-4 mb-2 text-blue-600">
        Your Activities
      </h2>

      <div className="flex w-full mb-8 ">
        <BarChart
          width={400}
          height={300}
          data={groupWorkouts(tasksList)}
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

const gropuWorkouts: IGroupWorkouts = [
  {
    name: 'All',
    running: 3,
    cycling: 2,
    cardio: 1,
    general: 3,
  },
  {
    name: 'General',
    general: 1,
  },
  {
    name: 'Cardio',
    cardio: 1,
  },
  {
    name: 'Cycling',
    cycling: 2,
  },
  {
    name: 'Running',
    running: 3,
  },
];

type IGroupWorkouts = [
  {
    name: string;
    running: number;
    cycling: number;
    cardio: number;
    general: number;
  },
  { name: 'General'; general: number },
  { name: 'Cardio'; cardio: number },
  { name: 'Cycling'; cycling: number },
  { name: 'Running'; running: number }
];

const tasksList2: IWorkoutsList = [
  {
    id: 1,
    title: 'Workout 1',
    duration: 60,
    type: 'Cycling',
    data: '2020-05-01',
  },
  {
    id: 2,
    title: 'Workout 2',
    duration: 60,
    type: 'Running',
    data: '2020-05-01',
  },
  {
    id: 3,
    title: 'Workout 3',
    duration: 60,
    type: 'Cycling',
    data: '2020-05-01',
  },
];
