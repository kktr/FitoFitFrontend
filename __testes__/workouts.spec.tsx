import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { MotivationSentence } from 'components/MotivationSentence';
import { MotivationSentenceContext } from 'pages/workouts';

describe(MotivationSentence.name, () => {
  let context: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >;

  beforeEach(() => {
    jest.useFakeTimers();

    act(() => {
      context = render(
        <MotivationSentenceTestProvider>
          <MotivationSentence />
        </MotivationSentenceTestProvider>
      );
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render motivation sentence after 10 seconds', async () => {
    const defaultSentence = await context.findByText(
      'Training is the key to success'
    );
    expect(defaultSentence).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    expect(await context.findByText('code().then().code()')).not.toBeNull();
  });
});

const MotivationSentenceTestProvider: React.FC = ({ children }) => {
  return (
    <MotivationSentenceContext.Provider
      value={{
        getMotivationSentence: async () => 'code().then().code()',
      }}
    >
      {children}
    </MotivationSentenceContext.Provider>
  );
};
