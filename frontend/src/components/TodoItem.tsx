import React, { useState } from 'react';
import { List, Input, Button, Switch, Row, Col, message } from 'antd';
import { Todo, Status } from '../types/Todo';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import '../styles/TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdateTodo: (todo: Todo) => void;
    onUpdateTodoStatus: (todo: Todo, status: Status) => Promise<boolean>;
    onDeleteTodo: (todo: Todo) => void;
    onUpdateTodoList: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo, onUpdateTodoStatus, onDeleteTodo, onUpdateTodoList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.title);
    const [checked, setChecked] = useState(Number(todo.status) === Status.Done);
    const [isFading, setIsFading] = useState(false);

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewText(e.target.value);
    };

    const handleSave = () => {
        if (newText.trim()) {
            onUpdateTodo({ ...todo, title: newText });
            setIsEditing(false);
        }
    };

    const handleStatusChange = async(checked: boolean) => {
        setChecked(checked); // Update switch immediately

        const status = checked ? Status.Done : Status.Pending;
        const success = await onUpdateTodoStatus(todo, status);
        
        if (success) {
            message.success('Todo status updated successfully', 2);
            setIsFading(true);
            
            setTimeout(() => {
                // Remove from the list
                onUpdateTodoList({...todo});
            }, 1000);
        }else {
            setChecked(!checked);
            message.error('An error occurred while updating the todo status. Please try again.', 3);
        }
    }

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this task?')) {
            onDeleteTodo({ ...todo });
        }
    }

    return (
        <List.Item className={isFading ? 'fade-out' : ''}>
            <Row style={{ width: '100%' }} align="middle">
            <Col xs={24} sm={16}>
                {isEditing ? (
                    <Input role="textbox" value={newText} onChange={handleChange} />
                ) : (
                    <span>{todo.title}</span>
                )}
            </Col>
            <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
                <Switch checked={checked} checkedChildren="Done" unCheckedChildren="Pending" onChange={handleStatusChange} />
                {isEditing ? (
                    <Button type="link" icon={<SaveOutlined />} onClick={handleSave} />
                ) : (
                    <Button type="link" icon={<EditOutlined />} onClick={handleEdit} />
                )}
                <Button type="link" icon={<DeleteOutlined />} onClick={handleDelete} danger />
            </Col>
            </Row>
        </List.Item>
    );
};

export default TodoItem;
