export interface Todo {
    id?:number;
    userId?: number;
    title: string;
    description?: string;
    status?: number;
    due_date?: string;
}

export interface GetTodosParams {
    status: number;
    page: number;
    limit: number;
}

export interface GetTodosResponse {
    limit: number;
    page: number;
    tasks: Todo[];
    total: number;
}

export enum Status {
    Pending = 0,
    Done = 2
}