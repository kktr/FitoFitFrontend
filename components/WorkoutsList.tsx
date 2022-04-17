import Image from 'next/image';
import { IWorkout, IWorkoutsList } from '../interfaces/IWorkout';
import { WorkoutsContext } from '@pages/workouts';
import { useContext } from 'react';
import { IWorkoutsContext } from '@interfaces/IWorkoutsContext';

export function WorkoutsList(): JSX.Element {
  const { workoutsList, setWorkoutsList } = useContext(
    WorkoutsContext
  ) as IWorkoutsContext;

  type TDeleteTaskInTasksList = (
    tasksList: IWorkoutsList,
    taskToDelete: IWorkout
  ) => IWorkoutsList;

  const deleteTaskInTasksList: TDeleteTaskInTasksList = (
    EditedWorkoutList,
    deletedTask
  ) => {
    return EditedWorkoutList.filter(
      (Task: { id: number }) => Task.id !== deletedTask.id
    );
  };

  return (
    <section>
      <h2 className="font-medium leading-tight text-3xl mt-4 mb-2 text-blue-600">
        Your Activities
      </h2>

      <ul id="tasksList" className="flex flex-col items-center w-full px-4">
        {workoutsList.map((workout: IWorkout, index: number) => {
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

                    <p className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
                      {workout.type}
                    </p>
                  </div>

                  <p
                    className={`workout_type workout_type--${workout.type} font-medium leading-tight text-xs mt-0 mb-2 text-gray-500`}
                  >
                    {workout.data &&
                      new Date(workout.data).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </p>
                </div>

                <div className="flex justify-between py-2">
                  <h3>{workout.title}</h3>

                  <p>{workout.duration} minutes</p>
                </div>

                <p>{workout.description}</p>
              </div>

              <div
                className={`workout_control-panel workout_control-panel--${workout.id} flex justify-end `}
              >
                <button
                  id="buttonTaskDelete"
                  className={`button button_task button_task--delete inline-block px-3 py-2 bg-red-500 text-white font-medium text-xs leading-snug uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`}
                  onClick={() => {
                    setWorkoutsList(
                      deleteTaskInTasksList(workoutsList, workoutsList[index])
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
    </section>
  );
}
