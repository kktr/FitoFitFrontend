import Image from 'next/image';
import { IWorkout, IWorkoutsList } from '../interfaces/IWorkout';
import { WorkoutsContext } from '@pages/workouts';
import { useContext } from 'react';
import { IWorkoutsContext } from '@interfaces/IWorkoutsContext';

export function TasksList(): JSX.Element {
  const { tasksList, setTasksList } = useContext(
    WorkoutsContext
  ) as IWorkoutsContext;

  type IDeleteTaskInTasksList = (
    tasksList: IWorkoutsList,
    taskToDelete: IWorkout
  ) => IWorkoutsList;

  const deleteTaskInTasksList: IDeleteTaskInTasksList = (
    EditedWorkoutList,
    deletedTask
  ) => {
    return EditedWorkoutList.filter(
      (Task: { id: number }) => Task.id !== deletedTask.id
    );
  };

  return (
    <ul id="tasksList" className="flex flex-col items-center w-full px-4">
      {tasksList &&
        tasksList.map((workout: IWorkout, index: number) => {
          // ! TODO IMPLEMENT SORTING SOMEDAY
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
                    {workout.data &&
                      new Date(workout.data).toLocaleString('en-US', {
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
  );
}
