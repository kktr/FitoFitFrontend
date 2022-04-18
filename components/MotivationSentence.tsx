import React, { useContext, useEffect, useState } from 'react';
import { MotivationSentenceContext } from '../pages/workouts';

export function MotivationSentence() {
  const [motivationSentence, setMotivationSentence] = useState<string>(
    'Training is the key to success'
  );

  const { getMotivationSentence } = useContext(MotivationSentenceContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMotivationSentence().then((quote) => {
        setMotivationSentence(quote);
      });
    }, 10_000);

    return () => clearInterval(intervalId);
  }, [getMotivationSentence]);

  return (
    <div>
      <h2 className="mt-2 p-4 text-blue-600/75 text-center">
        Motivational sentence for nerds
      </h2>

      <p className="transition-all" data-testid="motivationSentenceEl">
        {motivationSentence}
      </p>
    </div>
  );
}
