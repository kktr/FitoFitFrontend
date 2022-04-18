import React from 'react';
import { act, render, RenderResult, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import AddWorkout from 'pages/addworkout';

describe(AddWorkout.name, () => {
  const mockLogin = jest.fn((title, duration, data, type, description) => {
    return Promise.resolve({ title, duration, data, type, description });
  });

  let context: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >;

  beforeEach(() => {
    act(() => {
      context = render(<AddWorkout />);
    });
  });

  it('should have a submit button', () => {
    const addButtonElement = context.getByRole('button', { name: 'Add' });
    expect(addButtonElement).not.toBeNull();
  });

  describe('tests for form initially fields', () => {
    it('input for workout title should by initially empty', async () => {
      const titleInputElement = context.getByPlaceholderText(/title/i);
      expect(titleInputElement.value).toBe('');
    });

    it('input for workout duration should by initially empty', async () => {
      const durationInputElement = context.getByPlaceholderText(/duration/i);
      expect(durationInputElement.value).toBe('');
    });

    it('input for workout date should by initially empty', async () => {
      const dateInputElement = context.getByPlaceholderText(/date/i);
      expect(dateInputElement.value).toBe('');
    });

    it('should render input with value General for workout type', async () => {
      const typeInput = context.getByLabelText(/General/i);
      expect(typeInput.value).toBe('General');
    });

    it('input with value General should be checked', async () => {
      const typeInput = context.getByLabelText(/General/i);
      expect(typeInput).toBeChecked();
    });

    it('should render input with value Cardio for workout type', async () => {
      const typeInput = context.getByLabelText(/Cardio/i);
      expect(typeInput.value).toBe('Cardio');
    });
    it('input with value Cardio should be unchecked', async () => {
      const typeInput = context.getByLabelText(/Cardio/i);
      expect(typeInput).not.toBeChecked();
    });
    it('should render input with value Running for workout type', async () => {
      const typeInput = context.getByLabelText(/Running/i);
      expect(typeInput.value).toBe('Running');
      expect(typeInput).not.toBeChecked();
    });
    it('input with value Running should be unchecked', async () => {
      const typeInput = context.getByLabelText(/Running/i);
      expect(typeInput).not.toBeChecked();
    });
    it('should render input with value Cycling for workout type', async () => {
      const typeInput = context.getByLabelText(/Cycling/i);
      expect(typeInput.value).toBe('Cycling');
      expect(typeInput).not.toBeChecked();
    });
    it('input with value Cycling should by unchecked', async () => {
      const typeInput = context.getByLabelText(/Cycling/i);
      expect(typeInput).not.toBeChecked();
    });

    it('input for workout description should by initially empty', async () => {
      const descriptionInputElement = context.getByLabelText(/Describe/i);
      expect(descriptionInputElement.value).toBe('');
    });
  });

  describe('tests for form fields typing', () => {
    it('should be able to type title', async () => {
      const titleInputElement = context.getByPlaceholderText(/title/i);
      await userEvent.type(titleInputElement, 'test title');
      expect(titleInputElement.value).toBe('test title');
    });
    it('should be able to type duration', async () => {
      const durationInputElement = context.getByPlaceholderText(/duration/i);
      await userEvent.type(durationInputElement, '123');
      expect(durationInputElement.value).toBe('123');
    });
    it('should be able to type date', async () => {
      const now = new Date().toISOString();
      const dateInputElement = context.getByPlaceholderText(/date/i);
      await userEvent.type(dateInputElement, now);
      expect(dateInputElement.value).toBe(now);
    });
    it('should be able to type description', async () => {
      const descriptionInputElement = context.getByLabelText(/Describe/i);
      await userEvent.type(descriptionInputElement, 'test description');
      expect(descriptionInputElement.value).toBe('test description');
    });
  });

  describe('tests for form fields validation', () => {
    it('should display required errors when values are empty', async () => {
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      expect(await context.findAllByRole('alert')).toHaveLength(4);
    });

    it('should display required error when title value is shorter than 5 letters', async () => {
      const titleInputElement = context.getByPlaceholderText(/title/i);
      await userEvent.type(titleInputElement, '1234');
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const titleErrorElement = await context.findByText(
        /title must be longer/i
      );
      expect(titleErrorElement).not.toBeNull();
    });
    it('should display required error when title value is longer than 50 letters', async () => {
      const titleInputElement = context.getByPlaceholderText(/title/i);
      await userEvent.type(
        titleInputElement,
        'convallis convenire conveniunt conversa conversam i'
      );
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const titleErrorElement = await context.findByText(
        /title must be shorter/i
      );
      expect(titleErrorElement).not.toBeNull();
    });
    it('should display required error when duration value is smaller than 1', async () => {
      const durationInputElement = context.getByPlaceholderText(/duration/i);
      await userEvent.type(durationInputElement, '-1');
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const durationErrorElement = await context.findByText(
        /duration must not be less/i
      );
      expect(durationErrorElement).not.toBeNull();
    });
    it('should display required error when duration value is bigger than 1', async () => {
      const durationInputElement = context.getByPlaceholderText(/duration/i);
      await userEvent.type(durationInputElement, '10081');
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const durationErrorElement = await context.findByText(
        /duration must not be greater/i
      );
      expect(durationErrorElement).not.toBeNull();
    });

    it('should display required error when description value is shorter than 5 letters', async () => {
      const descriptionInputElement = context.getByLabelText(/Describe/i);

      await userEvent.type(descriptionInputElement, '1234');
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const descriptionErrorElement = await context.findByText(
        /description must be longer/i
      );
      expect(descriptionErrorElement).not.toBeNull();
    });
    it('should display required error when description value is longer than 50 letters', async () => {
      const descriptionInputElement = context.getByLabelText(/Describe/i);

      await userEvent.type(
        descriptionInputElement,
        'convallis convenire conveniunt conversa conversam i'
      );
      fireEvent.submit(context.getByRole('button', { name: 'Add' }));

      const descriptionErrorElement = await context.findByText(
        /description must be shorter/i
      );
      expect(descriptionErrorElement).not.toBeNull();
    });
  });
});
