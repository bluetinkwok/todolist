import React, {useRef, useCallback} from 'react';
import { Layout, Typography, Row, Col, Spin } from 'antd';
import './styles/App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const { todos, loading, loadMoreTodos, toggleStatus, handleAddTodo, handleUpdateTodo, handleUpdateTodoStatus, handleDeleteTodo, handleUpdateTodoList } = useTodos();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastTodoElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
          loadMoreTodos();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, loadMoreTodos]);

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={18} lg={12}>
            <div>
              <Title level={3} style={{ margin: 0 }}>Todo APP</Title>
              <Text>To add a task, just fill the form below and click in add todo.</Text>
            </div>
            <div className="site-layout-content">
              <Title level={4}>Create a new task</Title>
              <TodoForm onAddTodo={handleAddTodo} />
            </div>

            <div className="site-layout-content">
              <Title level={4}>Todo List</Title>
              <TodoList
                todos={todos} 
                onUpdateTodo={handleUpdateTodo} 
                onUpdateTodoStatus={handleUpdateTodoStatus} 
                onDeleteTodo={handleDeleteTodo} 
                lastTodoElementRef={lastTodoElementRef}
                toggleStatus={toggleStatus}
                onUpdateTodoList={handleUpdateTodoList}
              />
              {loading && <div style={{ textAlign: 'center' }}><Spin /></div>}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;