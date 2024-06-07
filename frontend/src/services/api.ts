import axios from 'axios';
import { Todo, GetTodosParams, GetTodosResponse, Status } from '../types/Todo';

const API_URL = 'http://localhost:8080/api/';
const TASK_API_URL = API_URL+'tasks';

export const getTodos = async (params: GetTodosParams): Promise<GetTodosResponse> => {
    const query = `?status=${params.status}&page=${params.page}&limit=${params.limit}`;
    const response = await axios.get(`${TASK_API_URL}${query}`);
    return response.data;
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await axios.post(API_URL+'tasks/', todo);
    return response.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${API_URL}tasks/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (todo: Todo): Promise<void> => {
    const response = await axios.delete(`${API_URL}tasks/${todo.id}`);
    return response.data;
};

export const updateTodoStatus = async (todo: Todo, status: Status): Promise<Todo> => {
    const response = await axios.post(`${API_URL}tasks/status`, {'id': todo.id, 'status':status});
    return response.data;
};
