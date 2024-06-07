
export enum TaskStatus {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}

export interface Task {
    id: number;
    user_id: number;
    title: string;
    status: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface PartialTask {
    id: number;
    title: string;
    status: number;
    created_at?: Date;
    updated_at?: Date;
}