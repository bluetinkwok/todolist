import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';
import { Todo, Status } from '../types/Todo';

// Mock props
const mockTodos: Todo[] = [
    { id: 1, title: 'Test Todo 1', status: Status.Pending },
    { id: 2, title: 'Test Todo 2', status: Status.Done },
];

const mockOnUpdateTodo = jest.fn();
const mockOnUpdateTodoStatus = jest.fn().mockResolvedValue(true);
const mockOnDeleteTodo = jest.fn();
const mockLastTodoElementRef = jest.fn();
const mockToggleStatus = jest.fn();
const mockOnUpdateTodoList = jest.fn();

const renderComponent = () => render(
    <TodoList
        todos={mockTodos}
        onUpdateTodo={mockOnUpdateTodo}
        onUpdateTodoStatus={mockOnUpdateTodoStatus}
        onDeleteTodo={mockOnDeleteTodo}
        lastTodoElementRef={mockLastTodoElementRef}
        toggleStatus={mockToggleStatus}
        onUpdateTodoList={mockOnUpdateTodoList}
    />
);

describe('TodoList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockOnUpdateTodoStatus.mockResolvedValue(true);
    });

    test('renders the TodoList component', () => {
        renderComponent();
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
        expect(screen.getByRole('switch', { name: /Show Completed Task/i })).toBeInTheDocument();
    });

    test('toggles the status switch', async () => {
        renderComponent();

        await act(async () => {
            userEvent.click(screen.getByRole('switch', { name: /Show Completed Task/i }));
        });

        expect(mockToggleStatus).toHaveBeenCalled();
    });

    test('calls onUpdateTodoStatus when a todo status is changed', async () => {
        renderComponent();

        await act(async () => {
            userEvent.click(screen.getAllByRole('switch', { name: /Pending/i })[1]);
        });

        await waitFor(() => expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodos[0], Status.Done));
    });

    test('calls onDeleteTodo when a todo is deleted', async () => {
        renderComponent();

        // Mock window.confirm to return true
        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        const todoItems = screen.getAllByRole('listitem');
        const firstDeleteButton = within(todoItems[0]).getByRole('button', { name: /delete/i });
        //fireEvent.click(firstDeleteButton); // Click delete for the first todo
        await act(async () => {
            userEvent.click(firstDeleteButton);
        });

        await waitFor(() => expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodos[0]));
    });
});
