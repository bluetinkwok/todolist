import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import TodoItem from './TodoItem';
import { Todo, Status } from '../types/Todo';

const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    status: Status.Pending,
};

const mockOnUpdateTodo = jest.fn();
const mockOnUpdateTodoStatus = jest.fn().mockResolvedValue(true);
const mockOnDeleteTodo = jest.fn();
const mockOnUpdateTodoList = jest.fn();

const renderComponent = () => render(
    <TodoItem
        todo={mockTodo}
        onUpdateTodo={mockOnUpdateTodo}
        onUpdateTodoStatus={mockOnUpdateTodoStatus}
        onDeleteTodo={mockOnDeleteTodo}
        onUpdateTodoList={mockOnUpdateTodoList}
    />
);

describe('TodoItem Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockOnUpdateTodoStatus.mockResolvedValue(true);
    });

    test('renders the TodoItem component', () => {
        renderComponent();
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    test('allows editing the title of the TodoItem', async () => {
        renderComponent();

        await act(async () => {
            userEvent.click(screen.getByRole('button', { name: /edit/i }));
        });

        expect(screen.getByRole('textbox')).toBeInTheDocument();

        await act(async () => {
            userEvent.clear(screen.getByRole('textbox'));
            userEvent.type(screen.getByRole('textbox'), 'Updated Test Todo');
        });

        await act(async () => {
            userEvent.click(screen.getByRole('button', { name: /save/i }));
        });

        expect(mockOnUpdateTodo).toHaveBeenCalledWith({ ...mockTodo, title: 'Updated Test Todo' });
    });

    test('changes the status of the TodoItem', async () => {
        renderComponent();
        const todoSwitch = screen.getByRole('switch');

        await act(async () => {
            userEvent.click(todoSwitch);
        });

        expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodo, Status.Done);

        await waitFor(() => {
            expect(mockOnUpdateTodoList).toHaveBeenCalled();
        }, { timeout: 2000 });
    });

    test('deletes the TodoItem', async () => {
        renderComponent();

        // Mock window.confirm to return true
        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        await act(async () => {
            userEvent.click(screen.getByRole('button', { name: /delete/i }));
        });

        expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodo);
    });
});
