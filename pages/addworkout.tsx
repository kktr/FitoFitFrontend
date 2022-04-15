import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IWorkoutsList, IWorkoutsType } from '../interfaces/IWorkout';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Workout } from 'dtos/workout';

export default function AddWorkout() {
  const [tasksList, setTasksList] = useState<IWorkoutsList | null>(null);
  const [hightestId, setHightestId] = useState<number>(0);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    formState: { errors },
  } = useForm<Workout>({ resolver: classValidatorResolver(Workout) });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('workoutsList'));
    items && setTasksList(items);
  }, []);

  useEffect(() => {
    const lastWorkoutID = tasksList && tasksList[tasksList?.length - 1]?.id;
    tasksList && lastWorkoutID !== null && lastWorkoutID !== undefined
      ? setHightestId(lastWorkoutID)
      : setHightestId(0);
  }, [tasksList]);

  useEffect(() => {
    localStorage.setItem('workoutsList', JSON.stringify(tasksList));
  }, [tasksList]);

  const onSubmit = (data, e) => {
    console.log(data);
    addWorkout(
      data.title,
      data.data.toISOString().slice(0, 10),
      data.description,
      +data.duration,
      data.type ? data.type : 'General'
    );

    reset();
  };

  const addWorkout = (
    newWorkoutTitle: string,
    newWorkoutData: string,
    newWorkoutDescription: string,
    newWorkoutDuration: number,
    newWorkoutType: IWorkoutsType = 'General'
  ) => {
    const newId = hightestId + 1;
    const newWorkout = {
      id: newId,
      title: newWorkoutTitle,
      duration: newWorkoutDuration,
      type: newWorkoutType,
      data: newWorkoutData,
      description: newWorkoutDescription,
    };

    tasksList !== null && tasksList.length > 0
      ? setTasksList([...tasksList, newWorkout])
      : setTasksList([newWorkout]);

    setHightestId((previousHightestId) => previousHightestId + 1);
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
                    {...register('title')}
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
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
                    {...register(`duration`, {
                      setValueAs: (v) => parseInt(v),
                    })}
                  />
                  {errors.duration && (
                    <span className="text-red-500">
                      {errors.duration.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4 md:w-full">
                  <Controller
                    control={control}
                    name="data"
                    render={({ field }) => (
                      <DatePicker
                        className="border py-2 px-3 text-grey-darkest"
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                        placeholderText="Select date"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        todayButton="Set Today"
                      />
                    )}
                  />
                  {errors.data && (
                    <span className="text-red-500">{errors.data.message}</span>
                  )}
                </div>

                <div>
                  <legend className="text-base font-medium text-gray-900">
                    Workout type
                  </legend>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="general"
                      {...register('type')}
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
                      {...register('type')}
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
                      {...register('type')}
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
                      {...register('type')}
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
                  {errors.type && (
                    <span className="text-red-500">{errors.type.message}</span>
                  )}
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
                      {...register('description')}
                      id="description"
                      rows={3}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"'
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-around">
                <input
                  value="Add"
                  type="submit"
                  className={
                    'mb-20 inline-block px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                  }
                />
                <Link
                  href={{
                    pathname: '/workouts',
                  }}
                >
                  <a
                    className={
                      'mb-20 inline-block px-7 py-3 bg-green-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out'
                    }
                  >
                    Workouts
                  </a>
                </Link>

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
      </div>
    </div>
  );
}
