import { DragOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Card, Col, Divider, Form, Input, Row, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Board, Issue, RootState } from '@/interface/interface';
import { DROP, DROP_EMPTY, START } from '@/store/actionTypes';
import { getIssuesCreator } from '@/store/getIssuesCreator';
const { Title } = Typography;

export const GithubIssue = () => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const state = useSelector((state: RootState) => ({
    apiGitHubIssues: state.apiGitHub.issues,
    dragDropIssues: state.dragDrop,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value.trim());
  };

  const handleSubmit = async () => {
    if (url) {
      setIsLoading(true);
      try {
        await dispatch(getIssuesCreator(url));
        setError('');
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError('Failed to fetch issues. Please check your repository URL.');
      }
    }
  };

  const dragOverHandler = (e: React.DragEvent<EventTarget>) => {
    e.preventDefault();
  };

  const dragStartHandler = (e: React.DragEvent<EventTarget>, board: Board, item: Issue) => {
    dispatch({
      type: START,
      payload: {
        currentBoardStart: board,
        currentItemStart: item,
      },
    });
  };

  const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, board: Board, index: number, issue: Issue) => {
    e.preventDefault();
    dispatch({
      type: DROP,
      payload: {
        targetBoard: board,
        targetIndex: index,
        issue: issue,
      },
    });
  };

  const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, board: Board) => {
    dispatch({
      type: DROP_EMPTY,
      payload: {
        targetBoard: board,
        targetIndex: board.items.length,
      },
    });
  };

  return (
    <>
      {error && <Alert message={error} type="error" banner />}
      <Row justify="center" gutter={[32, 32]} style={{ padding: '20px', boxSizing: 'border-box' }}>
        <Col span={24}>
          <Form onFinish={handleSubmit}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={18}>
                <Form.Item
                  name="url"
                  rules={[
                    {
                      required: true,
                      message: 'Enter your GitHub username and repository name (facebook/react)',
                    },
                    {
                      pattern: /^[\w-]+\/[\w-]+$/,
                      message: 'Please enter a valid GitHub repository URL in the format username/repo',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    addonBefore="https://github.com/"
                    value={url}
                    onChange={handleChange}
                    placeholder="Enter a GitHub repository URL"
                  />
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
        <Row justify="space-between">
          {state &&
            state.apiGitHubIssues &&
            state.apiGitHubIssues.map((board: Board) => (
              <Col
                span={7}
                style={{ background: '#eee', borderRadius: '10px', cursor: 'grab' }}
                key={board.id}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => {
                  dropCardHandler(e, board);
                }}
              >
                <Title level={2} style={{ textAlign: 'center' }}>
                  {board.title}
                </Title>
                <Divider />
                {board.items &&
                  board.items.length > 0 &&
                  board.items.map((item, indexIssue: number) => (
                    <Card
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDrop={(e) => dragDropHandler(e, board, indexIssue, item)}
                      key={item.id}
                      draggable
                      size="small"
                      bordered={true}
                      style={{
                        paddingBottom: '0px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Title level={5} style={{ paddingBottom: '0px' }}>
                          {item.title}
                        </Title>
                        <DragOutlined style={{ fontSize: '18px' }} />
                      </div>
                      <div style={{ paddingBottom: '0px' }}>
                        <p style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.5)', paddingBottom: '0px' }}>
                          {item.body && item.body.slice(0, 100)}...
                        </p>
                      </div>
                      <p style={{ fontSize: '15px', paddingBottom: '0px' }}>
                        Date: {new Date(item.created_at).toLocaleString()}
                      </p>
                      <p style={{ fontSize: '15px', paddingBottom: '0px' }}>
                        <a
                          href={item.html_url}
                          draggable={false}
                          style={{ maxWidth: '100%', display: 'inline-block', overflow: 'hidden' }}
                        >
                          {item.html_url}
                        </a>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0px' }}>
                        <Avatar src={item.user.avatar_url} alt="User Avatar" style={{ paddingRight: '5px' }} />
                        <p style={{ fontSize: '15px', paddingBottom: '0px' }}>User: {item.user.login}</p>
                      </div>
                    </Card>
                  ))}
              </Col>
            ))}
        </Row>
      </Row>
      {isLoading && <Spin size="large" />}
    </>
  );
};
