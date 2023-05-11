import { Layout } from 'antd';

import { GithubIssue } from '@/components/GithubIssue/GithubIssue';
const { Content } = Layout;

export const Page = () => (
  <Layout style={{ padding: '20px', minHeight: '100vh' }}>
    <Content>
      <GithubIssue />
    </Content>
  </Layout>
);
