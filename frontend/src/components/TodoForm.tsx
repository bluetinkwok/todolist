import React, { useState } from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import { Todo } from '../types/Todo';
import { PlusOutlined } from '@ant-design/icons';
import '../styles/TodoForm.css';
import { formatDate } from '../utils/dateUtils';

interface TodoFormProps {
    onAddTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        if (text.trim()) {
            const today = new Date();
            const formattedDate = formatDate(today);

            onAddTodo({ userId: 1, title: text, description: '', status: 1, due_date: formattedDate});
            setText('');
        }
    };

    return (
        <Form onFinish={handleSubmit} className="todo-form">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={18}>
                    <Form.Item>
                        <Input type="text" value={text} onChange={handleChange} placeholder="What needs to be done?" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                        Add todo
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default TodoForm;
