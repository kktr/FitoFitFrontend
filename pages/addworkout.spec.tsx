import React from 'react';
import {
  act,
  render,
  screen,
  RenderResult,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import AddWorkout from './addworkout';
import { debug } from 'console';

describe(AddWorkout.name, () => {
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
});

// minimum allowed date is 2022-01-01
