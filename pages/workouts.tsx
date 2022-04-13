import React, { useState } from 'react';
import { IWorkout, IWorkoutsList } from '../interfaces/IWorkout';
import Image from 'next/image';

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
    <div className="flex flex-col p-8">
      <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">
        Your Activities
      </h2>

      <ul id="tasksList">
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
                className={`workout workout--${workout.id} flex flex-col p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8 mb-4`}
                key={`workout workout--${workout.id}`}
              >
                <div>
                  {/* <div>
                    {new Date(workout.data).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div> */}
                  <div className="flex justify-between">
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
