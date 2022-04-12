import { IApi, IGetWorkoutsListResponse } from '../interfaces/IApi';
import type { NextPage } from 'next';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from '../styles/Home.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import { IWorkout, IWorkoutsList, IWorkoutsType } from '../Interfaces/IWorkout';
import { Controller, useForm } from 'react-hook-form';

// fetch('/api/add', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ number_one: 1, number_two: 'two' }),
// });

const exampleResponse: IGetWorkoutsListResponse = {
  workoutsList: [
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
  ],
};

class DumpApi implements IApi {
  getTasksList(): Promise<IGetWorkoutsListResponse> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(exampleResponse), 1000)
    );
  }
}

const api = new DumpApi();

const Home: NextPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    addTask(
      data.title,
      data['date-input'].toISOString().slice(0, 10),
      data.description,
      data.duration,
      data.type
    );
    console.log(data);

    console.log(data['date-input'].toISOString());
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
    <div className={styles.container}>
      <h1>FitoFit</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="title"
          {...register('title', { required: true, max: 20, min: 3 })}
        />
        <input
          type="number"
          placeholder="duration"
          {...register('duration', { required: true, max: 1440, min: 0 })}
        />
        <Controller
          control={control}
          name="date-input"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        <select {...register('category')}>
          <option value="General ">General </option>
          <option value=" Cardio "> Cardio </option>
          <option value=" Running "> Running </option>
          <option value=" Cycling"> Cycling</option>
        </select>
        <input
          type="text"
          placeholder="description"
          {...register('description', { max: 50, min: 3 })}
        />

        <input type="submit" />
      </form>
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
  );
};

export default Home;
