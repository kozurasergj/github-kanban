import { useState } from 'react';
import { Row, Col, Form, Input, Button, Card, Divider } from 'antd';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Board, GetIssuesAction, Issue } from '@/interface/interface';
import { getIssuesCreator } from '@/store/reducer';
const { Title } = Typography;
import { Dispatch } from 'redux';

export const GithubIssue = () => {
  const [url, setUrl] = useState<string>('');

  const dispatch = useDispatch<Dispatch<any>>();
  const issues = useSelector(state => state.issues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value.trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (url) {
      dispatch(getIssuesCreator(url));
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
        {issues && issues.map((board: Board) =>
          <Col span={7}
            style={{ background: '#eee', borderRadius: '10px', cursor: 'grab' }}
          >
            <Title
              level={2}
              style={{ textAlign: 'center' }} >
              {board.title}
            </Title>
            <Divider />
            {board.items && board.items.length > 0 && board.items.map(item =>
              <Card
                key={item.id}
                draggable
                title={item.title}
                size="small"
                bordered={true}>
                <Title
                  level={5}
                  style={{ textAlign: 'center' }}>
                  Decs: {`${item.body && item.body.slice(0, 100)}...`}
                </Title>
                <p>Date: {new Date(item.created_at).toLocaleString()}</p>
                <p>
                  <a href={item.html_url}>{item.html_url}</a>
                </p>
                <p style={{ width: '100px' }}>
                  <img
                    src={item.user.avatar_url}
                    style={{ width: '100%', height: '100%' }}
                    alt="User Avatar" />
                </p>
                <p>User: {item.user.login}</p>
              </Card>
            )}
          </Col>
        )}
      </Row>
    </Row>
  );
};
