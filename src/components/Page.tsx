import { GithubIssue } from '@/components/GithubIssue/GithubIssue';

import { Divider, Layout } from 'antd';
const { Header, Content, Footer } = Layout;


export const Page = () => {
  return (
    <Layout style={{ padding: '20px', minHeight: '100vh' }}>
      <Content >
        <GithubIssue />
      </Content  >
    </Layout >
  );
}
