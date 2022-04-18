import React from 'react';
import HomePage, { HomePageContext } from 'pages/homePage';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';

describe(HomePage.name, () => {
  it('should render', async () => {
    // given
    const context = render(
      <TestProvider>
        <HomePage />
      </TestProvider>
    );
    // when

    // then
    const element = await context.findByText('Test');
    expect(element).not.toBeNull();
  });

  it('shows success message after submit', async () => {
    // given
    const context = render(
      <TestProvider>
        <HomePage />
      </TestProvider>
    );
    // when
    const input = context.getByTestId('exerciseName');
    await userEvent.type(input, 'klika button przed wpisaniem całości');
    const button = context.getByText('Submit');

    userEvent.click(button);

    // then
    const element = await context.findByText(
      'WOW udało się: klika button przed wpisaniem całości'
    );
    expect(element).not.toBeNull();
  });
});

const TestProvider: React.FC = ({ children }) => {
  return (
    <HomePageContext.Provider
      value={{
        getValue: async () => 'Test',
        getText: async (inputValue) => `WOW udało się: ${inputValue}`,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

// TAK NIE ROBIĆ
// jest.mock('api', () => {
//   return {
//     getValue: async () => 'Test',
//     getText: async (inputValue: string) => `WOW udało się: ${inputValue}`,
//   }
// })
