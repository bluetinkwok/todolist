import React from 'react';
import { List, Switch } from 'antd';
import TodoItem from './TodoItem';
import { Todo, Status } from '../types/Todo';
import '../styles/TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => void;
  onUpdateTodoStatus: (todo: Todo, status: Status) => Promise<boolean>;
  onDeleteTodo: (todo: Todo) => void;
  lastTodoElementRef: (node: HTMLDivElement | null) => void;
  toggleStatus: (checked: boolean) => void;
  onUpdateTodoList: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodo, onUpdateTodoStatus, onDeleteTodo, lastTodoElementRef, toggleStatus, onUpdateTodoList }) => {

    return (
        <>
        <div style={{display:'block', width:'100%', height:'35px'}}>
            <Switch checkedChildren="Show Completed Task" unCheckedChildren="Show Pending Task" onChange={toggleStatus} style={{float:'right'}}/> <br/>
        </div>
        <List
        className="todo-list"
        bordered
        dataSource={todos}
        renderItem={(todo, index) => {
            if (todos.length === index + 1) {
                return (
                    <div ref={lastTodoElementRef} key={todo.id}>
                        <TodoItem 
                            todo={todo} 
                            onUpdateTodo={onUpdateTodo} 
                            onUpdateTodoStatus={onUpdateTodoStatus} 
                            onDeleteTodo={onDeleteTodo} 
                            onUpdateTodoList={onUpdateTodoList}
                        />
                    </div>
                );
            } else {
                return (
                    <div key={todo.id}>
                        <TodoItem 
                            todo={todo} 
                            onUpdateTodo={onUpdateTodo} 
                            onUpdateTodoStatus={onUpdateTodoStatus} 
                            onDeleteTodo={onDeleteTodo} 
                            onUpdateTodoList={onUpdateTodoList}
                        />
                    </div>
                );
            }
        }}
        />
        </>
    );
};

export default TodoList;
