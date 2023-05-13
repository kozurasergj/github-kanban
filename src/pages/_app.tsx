import '@/styles/globals.css';

// import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="website" property="og:type" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta content="/canban-board-photo.jpg" property="og:image" />
        <meta content="Canban Board - logo" property="og:image:alt" />
        <meta property="og:title" content="Canban Board - онлайн-доска для управления проектами" />
        <meta property="og:description" content="Canban Board - онлайн-доска для управления проектами на GitHub" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta content="Canban Board" property="og:site_name"></meta>
        <meta content="Canban Board - онлайн-доска для управления проектами на GitHub" name="description" />
        <meta content="#0079b8" name="msapplication-TileColor" />
        <meta content="#0079b8" name="theme-color" />
        <title>Canban Board</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
