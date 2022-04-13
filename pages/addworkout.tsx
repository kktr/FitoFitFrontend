import { IApi, IGetWorkoutsListResponse } from '../interfaces/IApi';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from '../styles/Home.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import { IWorkout, IWorkoutsList, IWorkoutsType } from '../Interfaces/IWorkout';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';

export default function AddWorkout() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    addTask(
      data.title,
      data['date-input']
        ? data['date-input'].toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      data.description,
      data.duration,
      data.type
    );
    console.log(data);
    reset();
  };

  const [tasksList, setTasksList] = useState<IWorkoutsList | null>(null);
  const [enteredTitleEditedWorkout, setEnteredTitleEditedWorkout] = useState<
    string | null
  >(null);
  const [EditedWorkout, setEditedWorkout] = useState<IWorkout | null>(null);
  const [clickedToEdit, setClickedToEdit] = useState<{
    type: string;
    id: number;
  } | null>(null);

  const [hightestId, setHightestId] = useState<number>(0);

  const workoutsTypes: IWorkoutsType[] = [
    'General',
    'Cardio',
    'Cycling',
    'Running',
  ];

  const clickHandler = (e) => {
    console.log(
      'Hovering over ' +
        e.target.getAttribute('data-id') +
        e.target.getAttribute('data-type')
    );

    setClickedToEdit({
      type: e.target.getAttribute('data-type'),
      id: +e.target.getAttribute('data-id'),
    });
  };

  const addTask = (
    newWorkoutTitle: string,
    newWorkoutData: string,
    newWorkoutDescription: string,
    newWorkoutDuration: number,
    newWorkoutType: IWorkoutsType = 'General'
  ) => {
    let newId = hightestId + 1;

    if (tasksList !== null && tasksList.length > 0) {
      setTasksList([
        ...tasksList,
        {
          id: newId,
          title: newWorkoutTitle,
          duration: newWorkoutDuration,
          type: newWorkoutType,
          data: newWorkoutData,
          description: newWorkoutDescription,
        },
      ]);
    } else {
      setTasksList([
        {
          id: newId,
          title: newWorkoutTitle,
          duration: newWorkoutDuration,
          type: newWorkoutType,
          data: newWorkoutData,
          description: newWorkoutDescription,
        },
      ]);
    }
    setHightestId((previousHightestId) => previousHightestId + 1);
  };

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
    <div className="p-4 py-10">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add Workout
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 md:flex md:flex-wrap md:justify-between"
          >
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="flex flex-col mb-4">
                  <input
                    type="text"
                    placeholder="title"
                    className="py-2 px-3 text-grey-darkest md:mr-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    {...register('title', { required: true, max: 20, min: 3 })}
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <input
                    type="number"
                    placeholder="duration"
                    className="py-2 px-3 text-grey-darkest md:ml-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    {...register('duration', {
                      required: true,
                      max: 1440,
                      min: 0,
                    })}
                  />
                </div>
                <div className="flex flex-col mb-4 md:w-full">
                  <Controller
                    control={control}
                    name="date-input"
                    render={({ field }) => (
                      <DatePicker
                        className="border py-2 px-3 text-grey-darkest"
                        placeholderText="Select date"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                    )}
                  />
                </div>

                <div>
                  <legend className="text-base font-medium text-gray-900">
                    Workout category
                  </legend>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="general"
                      {...register('category')}
                      type="radio"
                      value="General"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="general"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      General
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register('category')}
                      id="cardio"
                      type="radio"
                      value="Cardio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="cardio"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Cardio
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('category')}
                      id="running"
                      type="radio"
                      value="Running"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="running"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Running
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('category')}
                      id="cycling"
                      type="radio"
                      value="Cycling"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="cycling"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Cycling
                    </label>
                  </div>
                </div>

                <div className="flex flex-col mb-6 md:w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Describe your training
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('description', { min: 3 })}
                      id="description"
                      rows={3}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"'
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-around">
                <button
                  type="submit"
                  className="mb-20 inline-block px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  ADD
                </button>

                <Link
                  href={{
                    pathname: '/',
                  }}
                >
                  <a
                    className={
                      'mb-20 inline-block px-7 py-3 bg-red-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
                    }
                  >
                    CANCEL
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>

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
              return EditedWorkout?.id !== workout.id ? (
                <li
                  className={`workout workout--${workout.id}`}
                  key={`workout workout--${workout.id}`}
                >
                  <div className={`workout_type workout_type--${workout.type}`}>
                    <div>
                      {new Date(workout.data).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    <div>
                      {new Date(workout.data).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>

                    {clickedToEdit &&
                    clickedToEdit.id === workout.id &&
                    clickedToEdit.type === 'title' ? (
                      <div>TEST POSITIVE</div>
                    ) : (
                      <div>TEST NEGATIV</div>
                    )}

                    <div
                      onClick={clickHandler}
                      data-id={workout.id}
                      data-type="title"
                    >
                      {workout.title}
                    </div>

                    <div>{workout.duration}</div>

                    <div>{workout.type}</div>

                    <div>{workout.description}</div>
                  </div>

                  <div
                    className={`workout_control-panel workout_control-panel--${workout.id}`}
                  >
                    <button
                      id="buttonTaskEdit"
                      className={`button button_task button_task--edit`}
                      onClick={() => {
                        if (EditedWorkout !== null) return;
                        setEditedWorkout(tasksList[index]);
                      }}
                    >
                      edit
                    </button>

                    <button
                      id="buttonTaskDelete"
                      className={`button button_task button_task--delete`}
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
              ) : (
                <form
                  key={`form-change-title--task-${workout.id}`}
                  className={`form-change-title form-change-title--task-${workout.id}`}
                  onSubmit={() => {
                    setTasksList(
                      editTaskInTasksList(tasksList, {
                        ...EditedWorkout,
                        title:
                          enteredTitleEditedWorkout !== null
                            ? enteredTitleEditedWorkout
                            : EditedWorkout.title,
                      })
                    );

                    setEditedWorkout(null);
                    setEnteredTitleEditedWorkout(null);
                  }}
                >
                  <div className={styles.control}>
                    <label htmlFor="EditedWorkout" className={styles.label}>
                      edit:
                    </label>

                    <input
                      id="EditedWorkout"
                      type="text"
                      required
                      value={
                        enteredTitleEditedWorkout !== null
                          ? enteredTitleEditedWorkout
                          : workout.title
                      }
                      onChange={titleChangeEditedWorkoutHandler}
                      className={`form-change-title_control`}
                    />
                  </div>

                  <button
                    id="buttonEditedWorkoutSave"
                    type="submit"
                    className={`button button_task button_task--edit`}
                  >
                    save
                  </button>
                </form>
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
    </div>
  );
}

// export default AddWorkout;
