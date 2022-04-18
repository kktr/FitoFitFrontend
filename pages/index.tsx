import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '@nextcss/reset';

const Home: NextPage = () => {
  return (
    <div
      className={'h-screen flex flex-col justify-between items-center max-w-xs'}
    >
      <Image
        alt="people training"
        src="https://i.ibb.co/z8t3cTQ/illustration.png"
        objectFit="cover"
        width={1656}
        height={1968}
      ></Image>

      <div className={'flex flex-col px-6'}>
        <h1 className={'mb-4 text-gray-900 font-bold text-3xl text-center'}>
          Best workouts <br></br>for you
        </h1>

        <p className={'mb-6 text-gray-400 text-xs text-center drop-shadow-sm'}>
          You will have everything you need to reach your personal fitness goals
          - for free!
        </p>
      </div>

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
  );
};

export default Home;
