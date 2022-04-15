import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';

export const HomePageContext = React.createContext<{
  getValue: () => Promise<string>;
  getText: (inputValue: string) => Promise<string>;
}>({
  getValue: async () => 'Default',
  getText: async (inputValue: string) => `Z serwera: ${inputValue}`,
});

export const HomePage: NextPage = () => {
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
};
