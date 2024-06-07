import { useState, useEffect, useCallback, useRef } from 'react';
import { Todo, Status } from '../types/Todo';
import { getTodos, addTodo, updateTodo, updateTodoStatus, deleteTodo } from '../services/api';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [page, setPage] = useState(1);
    const [currentStatus, setCurrentStatus] = useState<Status>(Status.Pending);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const effectRan = useRef(false);

    const fetchTodos = useCallback(async (status: number, page: number, append: boolean = false) => {
        setLoading(true);
        //const fetchedTodos = await getTodos({ status: 0, page, limit: 10 });
        const { tasks, total } = await getTodos({ status: status, page: page, limit: 10 });

        setTodos(prevTodos => append ? [...prevTodos, ...tasks] : tasks);
        window.console.log(todos);

        setLoading(false);
        setHasMore(tasks.length > 0 && (page * 10) < total);
    }, []);

    useEffect(() => {
        if (!effectRan.current) {
            fetchTodos(currentStatus, page);

            return () => {
                effectRan.current = true;
            };
        }else {
            fetchTodos(currentStatus, page, false);
        }
    }, [fetchTodos, currentStatus]);

    const toggleStatus = (checked: boolean) => {
        const status = checked ? Status.Done : Status.Pending;
        setCurrentStatus(prevStatus => status);
        window.console.log(currentStatus);
        setPage(1);
    };

    const loadMoreTodos = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
            fetchTodos(currentStatus, page + 1, true);
        }
    };

    const handleAddTodo = async (todo: Omit<Todo, 'id'>) => {
        const newTodo = await addTodo(todo);
        setTodos([...todos, newTodo]);
    };

    const handleUpdateTodo = async (todo: Todo) => {
        const updatedTodo = await updateTodo(todo);
        setTodos(todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
    };

    const handleUpdateTodoStatus = async (todo: Todo, status: Status): Promise<boolean> => {
        try {
            await updateTodoStatus(todo, status);

            return true;
        } catch (error) {
            return false;
        }
    };

    const handleUpdateTodoList = (todo: Todo) => {
        setTodos(todos.filter(t => t.id !== todo.id));
    }

    const handleDeleteTodo = async (todo: Todo) => {
        await deleteTodo(todo);
        setTodos(todos.filter(t => t.id !== todo.id));
    };

    return {
        todos,
        loading,
        loadMoreTodos,
        toggleStatus,
        handleAddTodo,
        handleUpdateTodo,
        handleUpdateTodoStatus,
        handleDeleteTodo,
        handleUpdateTodoList
    };
};
