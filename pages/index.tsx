import { IApi, IGetWorkoutsListResponse } from '../interfaces/IApi';
import type { NextPage } from 'next';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from '../styles/Home.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import { IWorkout, IWorkoutsList, IWorkoutsType } from '../Interfaces/IWorkout';

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
  const [tasksList, setTasksList] = useState<IWorkoutsList | null>(null);
  const [tasksTypeToDisplay, setTasksTypeToDisplay] = useState<
    IWorkoutsType | boolean
  >(false);

  const [enteredTitleNewWorkout, setEnteredTitleNewWorkout] =
    useState<string>('');
  const [enteredDurationNewWorkout, setEnteredDurationNewWorkout] = useState<
    string | ''
  >('');
  const [enteredDataNewWorkout, setEnteredDataNewWorkout] = useState<Date>(
    new Date()
  );
  const [enteredTypeNewWorkout, setEnteredTypeNewWorkout] =
    useState<IWorkoutsType>('General');
  const [enteredDescriptionNewWorkout, setEnteredDescriptionNewWorkout] =
    useState<string>('');
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

  const titleChangeNewWorkoutHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredTitleNewWorkout(event.target.value);
  };

  const durationChangeNewWorkoutHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredDurationNewWorkout(event.target.value);
  };

  const dataChangeNewWorkoutHandler = (date: Date) =>
    setEnteredDataNewWorkout(date);

  const typeChangeNewWorkoutHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setEnteredTypeNewWorkout(event.target.value as IWorkoutsType);
  };

  const descriptionChangeNewWorkoutHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredDescriptionNewWorkout(event.target.value);
  };

  const titleChangeEditedWorkoutHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredTitleEditedWorkout(event.target.value);
  };

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

  const submitNewWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(
      enteredTitleNewWorkout,
      enteredDataNewWorkout.toISOString(),
      enteredDescriptionNewWorkout,
      +enteredDurationNewWorkout,
      enteredTypeNewWorkout
    );
    console.log(
      enteredTitleNewWorkout,
      enteredDataNewWorkout.toISOString(),
      enteredDescriptionNewWorkout,
      +enteredDurationNewWorkout,
      enteredTypeNewWorkout
    );

    setEnteredTitleNewWorkout('');
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

      <form id="formAddTask" onSubmit={submitNewWorkout}>
        <div className={styles.control}>
          <label htmlFor="NewWorkoutTitle" className={styles.label}>
            title
          </label>

          <input
            id="NewWorkoutTitle"
            type="text"
            required
            value={enteredTitleNewWorkout}
            onChange={titleChangeNewWorkoutHandler}
            className={`${styles.input} form-control`}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="NewWorkoutDuration" className={styles.label}>
            duration
          </label>

          <input
            id="NewWorkoutDuration"
            type="number"
            required
            value={enteredDurationNewWorkout}
            onChange={durationChangeNewWorkoutHandler}
            className={`${styles.input} form-control`}
          />
        </div>

        <div className={styles.control}>
          {/* <label htmlFor="NewWorkoutData" className={styles.label}>
            data
          </label>

          <input
            id="NewWorkoutData"
            type="text"
            required
            value={enteredDataNewWorkout}
            onChange={dataChangeNewWorkoutHandler}
            className={`${styles.input} form-control`}
          /> */}

          <label htmlFor="NewWorkoutData" className={styles.label}>
            data
          </label>
          <DatePicker
            id="NewWorkoutData"
            selected={enteredDataNewWorkout}
            onChange={dataChangeNewWorkoutHandler}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="NewWorkoutType">Choose type:</label>
          <select
            id="NewWorkoutType"
            name=""
            value={enteredDescriptionNewWorkout}
            onChange={typeChangeNewWorkoutHandler}
          >
            {workoutsTypes.map((workoutType) => {
              return (
                <option key={workoutType} value={workoutType}>
                  {workoutType}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.control}>
          <label htmlFor="NewWorkoutDescription" className={styles.label}>
            description
          </label>

          <input
            id="NewWorkoutDescription"
            type="text"
            required
            value={enteredDescriptionNewWorkout}
            onChange={descriptionChangeNewWorkoutHandler}
            className={`${styles.input} form-control`}
          />
        </div>

        <button
          id="buttonSubmitNewWorkout"
          type="submit"
          className={`button button_task button_task--add`}
        >
          SAVE
        </button>
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
