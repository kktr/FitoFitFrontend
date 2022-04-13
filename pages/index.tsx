import { IApi, IGetWorkoutsListResponse } from '../interfaces/IApi';
import type { NextPage } from 'next';
import Image from 'next/image';
import '@nextcss/reset';
import styles from '../styles/Home.module.css';
import useDimensions from 'react-cool-dimensions';
import Link from 'next/link';

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
  return (
    <div className={'h-screen flex flex-col justify-between items-center'}>
      <div className="">
        <Image
          src="/../public/illustration.png"
          objectFit="cover"
          width={1656}
          height={1968}
        ></Image>
      </div>
      <div className={'flex flex-col px-6'}>
        <h1 className={'mb-4 text-gray-900 font-bold text-3xl text-center'}>
          Best workouts <br></br>for you
        </h1>
        <p className={'mb-6 text-gray-400 text-xs text-center drop-shadow-sm'}>
          You will have everything you need to reach your personal fitness goals
          - for free!
        </p>
      </div>
      <div className={''}>
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
            Get started!
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
