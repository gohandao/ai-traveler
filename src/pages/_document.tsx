import Document, { Head, Html, Main, NextScript } from "next/document";

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
