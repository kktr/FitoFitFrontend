import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';

interface IHomePageContext {
  getValue: () => Promise<string>;
  getText: (inputValue: string) => Promise<string>;
}

export const HomePageContext = React.createContext<IHomePageContext>({
  getValue: async () => 'Default',
  getText: async (inputValue) => `Z serwera: ${inputValue}`,
});

export default function HomePage() {
  const { getValue, getText } = useContext(HomePageContext);
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    getValue().then((newValue) => {
      setValue(newValue);
    });
  }, [getValue]);

  const [inputValue, setInputValue] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<string | null>();

  return (
    <div>
      <div>{value}</div>

      <form
        onSubmit={(event): void => {
          event.preventDefault();

          getText(inputValue).then((newValue) => {
            setIsSubmitted(newValue);
          });
        }}
      >
        Exercise name
        <input
          data-testid={'exerciseName'}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button>Submit</button>
        <div>{isSubmitted}</div>
      </form>
    </div>
  );
}
