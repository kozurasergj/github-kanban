import { useState } from 'react';
import { Row, Col, Form, Input, Button, Card, Divider } from 'antd';
import axios from 'axios';
import { Typography } from 'antd';
const { Title } = Typography;

interface Issue {
  id: number;
  title: string;
  number: number;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  html_url: string;
  body: string;
}

interface Board {
  id: number;
  title: string;
  items: Issue[];
}

export const GithubIssue = () => {

  const [url, setUrl] = useState<string>('');

  const [boards, setBoards] = useState<Board[]>([]);

  const [currentBoard, setCurrentBoard] = useState<Board>([]);
  const [currentItem, setCurrentItem] = useState<Issue>([]);


  const dragOverHandler = (e: React.DragEvent<EventTarget>) => {
    e.preventDefault();
  }

  const dragStartHandler = (e: React.DragEvent<EventTarget>, board: Board, item: Issue) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  const dragDropHandler = (e: React.DragEvent<EventTarget>, board: Board, item: Issue[]) => {
    e.preventDefault();
    const currentIndex = (currentBoard && currentBoard.items.indexOf(currentItem));
    currentBoard && currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards && boards.map(b => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    }))
  }

  const dropCardHendler = (e: React.DragEvent<EventTarget>, board: Board) => {
    board.items.push(currentItem);
    const currentIndex = (currentBoard && currentBoard.items.indexOf(currentItem));
    currentBoard && currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (url) {
      try {
        const response = await axios.get<Issue[]>(`https://api.github.com/repos/${url}/issues`);
        setBoards([
          { id: 1, title: 'ToDo', items: response.data },
          { id: 2, title: 'In Progress', items: [] },
          { id: 3, title: 'Done', items: [] }
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Row justify="center" gutter={[32, 32]} style={{ margin: '0px', gap: '5px' }}>
      <Col span={24}>
        <Form onFinish={handleSubmit}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={18}>
              <Form.Item>
                <Input type="text" value={url} onChange={handleChange} placeholder="Enter a GitHub repository URL" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Get Issues
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Row justify="space-between"  >
        {boards && boards.map((board) =>
          <Col span={7}
            style={{ background: '#eee', borderRadius: '10px', cursor: 'grab' }}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => { dropCardHendler(e, board) }}
          >
            <Title level={2} style={{ textAlign: 'center' }} >{board.title}</Title>
            <Divider />
            {board.items && board.items.map(item =>
              <Card
                key={item.id}
                onDragOver={(e) => dragOverHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDrop={(e) => dragDropHandler(e, board, item)}
                draggable
                title={item.title} size="small" bordered={true}>
                <Title level={5} style={{ textAlign: 'center' }} >
                  Decs: {`${item.body && item.body.slice(0, 100)}...`}</Title>
                <p>Date: {new Date(item.created_at).toLocaleString()}</p>
                <p><a href={item.html_url}>{item.html_url}</a></p>
                <p style={{ width: '100px' }}>
                  <img src={item.user.avatar_url}
                    style={{ width: '100%', height: '100%' }}
                    alt="User Avatar" /></p>
                <p>User: {item.user.login}</p>
              </Card>
            )}
          </Col>
        )}
      </Row>
    </Row>
  );
};
